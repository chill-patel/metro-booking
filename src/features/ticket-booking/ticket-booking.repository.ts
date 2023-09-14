import { TicketBooking } from "./ticket-booking";
import moment from 'moment';
class TicketBookingRepository {
    private bookingList: TicketBooking[] = [];

    bookTicket(booking: TicketBooking) {
        return this.bookingList.push(booking);
    }

    getWeeklyExpense(ticketTryingToBook: TicketBooking): number {
        const startOfWeek = moment().startOf('week');
        const endOfWeek = moment().endOf('week');
        return this.bookingList.filter((booking) => {
            return moment(booking.bookingTimeStamp).isBetween(startOfWeek, endOfWeek) && booking.equal(ticketTryingToBook)
        })
            .reduce((pre, next) => {
                return pre + next.totalAmount!
            }, 0)

    }

    getDailyExpense(ticketTryingToBook: TicketBooking): number {
        return this.bookingList.filter((booking) => {
            return moment(booking.bookingTimeStamp).isSame(moment(), 'day') && booking.equal(ticketTryingToBook)
        })
            .reduce((pre, next) => {
                return pre + next.totalAmount!
            }, 0)
    }

    getBookTicketHistory() {
        return this.bookingList
    }
}

export { TicketBookingRepository }