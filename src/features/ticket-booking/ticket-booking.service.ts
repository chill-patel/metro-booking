import { FareRepository } from "../fare-cap/fare-cap.repository";
import { StationLineRepository } from "../station-line/station-line.repository";
import { TicketBooking } from "./ticket-booking";
import { TicketBookingRepository } from "./ticket-booking.repository";

class TicketBookingService {
    constructor(public baseFareRepo: FareRepository,
        public stationLinesRepo: StationLineRepository,
        public ticketBookingRepo: TicketBookingRepository
    ) { }

    bookTicket(booking: TicketBooking) {
        const isMetroAvailable = this.stationLinesRepo.isMetroRunningBetweenStation(booking.fromLine, booking.toLine)
        if (!isMetroAvailable) {
            return
        }

        const runningFare = this.stationLinesRepo.getFare(booking.fromLine, booking.toLine, booking.bookingTimeStamp)!
        const weeklyExpense = this.ticketBookingRepo.getWeeklyExpense(booking)
        const dailyExpense = this.ticketBookingRepo.getDailyExpense(booking)
        const fareMaxCapping = this.baseFareRepo.getFareCapByStationLine(booking)
        let calculateFare = runningFare
        if (fareMaxCapping) {
            // Assumption will make full charge on ticket not partial 
            // like if ticket price 2 and user redeem 7 and cap is 8 still will charge 2 
            if (weeklyExpense + runningFare < fareMaxCapping.weeklyCap && dailyExpense + runningFare < fareMaxCapping.dailyCap) {
                calculateFare = 0;
            }
        }
        booking.paidAmount = calculateFare as number
        booking.totalAmount = runningFare
        this.ticketBookingRepo.bookTicket(booking)
        return booking
    }

    getBookingList() {
        return this.ticketBookingRepo.getBookTicketHistory()
    }
}

export { TicketBookingService }