import { TicketBooking } from "../ticket-booking/ticket-booking";
import { FareCap } from "./fare-cap";

class FareRepository {
    private fareCapList: FareCap[] = [];

    add(fareCap: FareCap) {
        return this.fareCapList.push(fareCap);
    }

    getFareCapByStationLine(booking: TicketBooking): FareCap | undefined {
        return this.fareCapList.find(
            (fareCap) => fareCap.fromLine === booking.fromLine && fareCap.toLine === booking.toLine
        );
    }
}

export { FareRepository }