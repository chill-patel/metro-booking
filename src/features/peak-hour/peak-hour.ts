import { weekDay } from "../core/util/weekdays";
import { TimeIntervalConverter } from "./time-interval-convertor";

class PeakHour {
    constructor(public day: string, public startTime: number, public endTime: number) { }

    static peakHourList() {
        const originalIntervals = [
            { day: weekDay.monday, peakHours: ['08:00 to 10:00', '16:30 to 19:00'] },
            { day: weekDay.tuesday, peakHours: ['08:00 to 10:00', '16:30 to 19:00'] },
            { day: weekDay.wednesday, peakHours: ['08:00 to 10:00', '16:30 to 19:00'] },
            { day: weekDay.thursday, peakHours: ['08:00 to 10:00', '16:30 to 19:00'] },
            { day: weekDay.friday, peakHours: ['08:00 to 10:00', '16:30 to 19:00'] },
            { day: weekDay.saturday, peakHours: ['10:00 to 14:00', '18:00 to 23:00'] },
            { day: weekDay.sunday, peakHours: ['18:00 to 23:00'] },
        ];
        const peakList: PeakHour[] = []
        for (const interval of originalIntervals) {
            for (const hour of interval.peakHours) {
                const [start, end] = TimeIntervalConverter.convertIntervalsToMilliseconds(hour);
                peakList.push(new PeakHour(interval.day, start, end))
            }

        }
        return peakList;
    }
}
export { PeakHour }