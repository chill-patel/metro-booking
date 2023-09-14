class TimeIntervalConverter {
    static timeToMilliseconds(timeString: string) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
    }

    static convertIntervalsToMilliseconds(interval: string) {
        return interval.split(' to ').map(this.timeToMilliseconds);;
    }
}

export { TimeIntervalConverter }