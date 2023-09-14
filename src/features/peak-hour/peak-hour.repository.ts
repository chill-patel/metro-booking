import { PeakHour } from "./peak-hour";

class PeakHourRepository {
    private peakHourList: PeakHour[] = [];

    add(peakHour: PeakHour) {
        return this.peakHourList.push(peakHour);
    }

    isPeakTime(day: string, time: number): boolean {
        const peakHour = this.peakHourList.find(
            (ph) => ph.day === day && ph.startTime <= time && ph.endTime >= time
        );
        return !!peakHour;
    }
}

export { PeakHourRepository }