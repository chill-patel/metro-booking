import { expect } from 'chai';
import { TicketBookingService } from '../ticket-booking.service';
import { FareCap } from '../../fare-cap/fare-cap';
import { FareRepository } from '../../fare-cap/fare-cap.repository';
import { PeakHour } from '../../peak-hour/peak-hour';
import { PeakHourRepository } from '../../peak-hour/peak-hour.repository';
import { StationLine } from '../../station-line/station-line';
import { station } from '../../station-line/station';
import { StationLineRepository } from '../../station-line/station-line.repository';
import { TicketBookingRepository } from '../ticket-booking.repository';
import { TicketBooking } from '../ticket-booking';



function setupMasters() {
    const fareCapList: FareCap[] = [
        new FareCap(station.Green, station.Green, 8, 55),
        new FareCap(station.Red, station.Red, 12, 70),
        new FareCap(station.Green, station.Red, 15, 90),
        new FareCap(station.Red, station.Green, 15, 90)
    ]
    const fareCapRepo = new FareRepository()
    fareCapList.forEach((fare) => fareCapRepo.add(fare))

    const peakHourList: PeakHour[] = PeakHour.peakHourList();
    const peakHourRepo = new PeakHourRepository()
    peakHourList.forEach((peak) => peakHourRepo.add(peak))

    const stationList: StationLine[] = [
        new StationLine(station.Green, station.Green, 2, 1),
        new StationLine(station.Red, station.Red, 3, 2),
        new StationLine(station.Green, station.Red, 4, 3),
        new StationLine(station.Red, station.Green, 3, 2)
    ];

    const stationLineRepo = new StationLineRepository(peakHourRepo)
    stationList.forEach((station) => stationLineRepo.add(station))

    const ticketBookingRepo = new TicketBookingRepository()
    return {
        fareCapRepo,
        peakHourRepo,
        stationLineRepo,
        ticketBookingRepo
    }

}

describe('TicketBookingService', () => {
    let ticketBookingService: TicketBookingService;
    let stationLineRepoStub: StationLineRepository;
    let peakHourRepo: PeakHourRepository;
    let fareCapRepo: FareRepository;
    let ticketBookingRepo: TicketBookingRepository

    beforeEach(() => {

        const master = setupMasters()
        stationLineRepoStub = master.stationLineRepo
        peakHourRepo = master.peakHourRepo
        fareCapRepo = master.fareCapRepo
        ticketBookingRepo = master.ticketBookingRepo

        ticketBookingService = new TicketBookingService(fareCapRepo, stationLineRepoStub, master.ticketBookingRepo);
    });

    describe('bookTicket', () => {
        it('should book a ticket with calculated fare when conditions met', async () => {
            // Arrange
            const bookingTimestamp = new Date().getTime();

            const booking1 = new TicketBooking(station.Green, station.Red, bookingTimestamp)
            const booking2 = new TicketBooking(station.Green, station.Red, bookingTimestamp)
            const booking3 = new TicketBooking(station.Green, station.Red, bookingTimestamp)
            const booking4 = new TicketBooking(station.Green, station.Red, bookingTimestamp)

            const bookingList = [booking1, booking2, booking3, booking4
            ]
            for (const booking of bookingList) {
                ticketBookingService.bookTicket(booking)
            }
        });

        it('should not book a ticket when metro is not available', async () => {
            // Arrange
            const fromLine = 'NonexistentLine';
            const toLine = 'NonexistentLine';
            const bookingTimestamp = new Date().getTime();
            const booking = new TicketBooking(fromLine, toLine, bookingTimestamp)
            const result = ticketBookingService.bookTicket(booking);
            expect(ticketBookingRepo.getBookTicketHistory().length).to.be.equal(0)
        });

        it('should book a ticket with zero fare when max cap conditions are not met', async () => {
            const fromLine = station.Green;
            const toLine = station.Green;
            const bookingTimestamp = new Date().getTime();
            const booking = new TicketBooking(fromLine, toLine, bookingTimestamp)
            ticketBookingService.bookTicket(booking);
            const bookedTicket = ticketBookingRepo.getBookTicketHistory()
            expect(bookedTicket[0].paidAmount).to.be.equal(0)
            expect(bookedTicket[0].totalAmount).to.be.equal(1)
        });
    });
});
