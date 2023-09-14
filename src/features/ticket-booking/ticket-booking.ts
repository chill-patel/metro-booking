class TicketBooking {
    constructor(
        public fromLine: string,
        public toLine: string,
        public bookingTimeStamp: number,
        public totalAmount?: number,
        public paidAmount?: number,

    ) { }

    equal(ticketBooking: TicketBooking) {
        return this.fromLine == ticketBooking.fromLine && this.toLine == ticketBooking.toLine
    }
}

export { TicketBooking }