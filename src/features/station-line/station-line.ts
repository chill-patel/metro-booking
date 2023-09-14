class StationLine {
    constructor(
        public fromLine: string,
        public toLine: string,
        public peakPrice: number,
        public price: number
    ) { }
}

export { StationLine }
