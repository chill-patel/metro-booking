import { PeakHourRepository } from "../peak-hour/peak-hour.repository";
import { StationLine } from "./station-line";

class StationLineRepository {
    constructor(public peakHourRepo: PeakHourRepository) {

    }
    private stationList: StationLine[] = [];

    async add(station: StationLine) {
        this.stationList.push(station);
    }

    getFare(fromStation: string, toStation: string, time: number): number | null {
        const station = this.stationList.find(
            (s) => s.fromLine === fromStation && s.toLine === toStation
        );

        if (!station) {
            return null; // Handle this case in your application logic
        }

        // Check if it's peak time
        const isPeak = this.peakHourRepo.isPeakTime('day', time);

        return isPeak ? station.peakPrice : station.price;
    }

    isMetroRunningBetweenStation(fromStation: string, toStation: string): boolean {
        return this.stationList.some(
            (s) =>
                (s.fromLine === fromStation && s.toLine === toStation) ||
                (s.fromLine === toStation && s.toLine === fromStation)
        );
    }
}

export { StationLineRepository }