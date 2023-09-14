### Masters Setup

#### FareCap
- `fromLine`
- `toLine`
- `dailyCap`
- `weeklyCap`    
- `FareCap(fromLine, toLine, dailyCap, weeklyCap)`    

#### FareRepository
- `List<FareCap> fareCapList = []`
- `add(fareCap: FareCap)`
- `getFareCapByStationLine(fromLine: string, toLine: string): FareCap`

#### PeakHour
- `day`
- `startTime`
- `endTime`
- `PeakHour(day, startTime, endTime)`

#### PeakHourRepository
 - `List<PeakHour> peakHourList = []`
 - `add(peakHour: PeakHour)`
 - `isPeakTime(day: string, time: string)`


#### StationLine
- `fromLine`
- `toLine`
- `price`
- `peakPrice`
- `StationLine(fromLine,toLine,price,peakPrice)`

#### StationLineRepository
- `List<StationLine> stationList = []`
- `add(station: StationLine)`
- `getFare(fromStation: string, toStation:string, time:string): StationLine`
- `isMetroRunningBetweenStation(fromStation: string, toStation:string)`


### User Transaction

#### TicketBooking
- `fromLine`
- `toLine`
- `bookingTimeStamp`
- `fare` ?

#### TicketBookingRepository
- `List<TicketBooking> bookingList`
- `addTicket(booking:TicketBooking)`
- `getWeeklyExpense(booking:TicketBooking)`
- `getDailyExpense(booking:TicketBooking)`

#### TicketBookingService
- `bookTicket(booking:TicketBooking): number`   

#### Usage
  ```javascript

  // Setup masters
  // 1. fare cap
  const fareCap = new FareCap('Green', 'Green', 8, 12)      
  const fareRepo = new FareRepository()
  await fareRepo.add(fareCap)

  //2. peek hour
  const peakHour = new PeakHour('monday','09:00','12:00')
  const peakHourRepo = new PeakHourRepository()
  await peakHourRepo.add(peakHour)

  //3. station line
  const stationLine = new StationLine('Red', 'Green', 1, 3)
  const stationLineRepo = new StationLineRepository()
  await stationLineRepo.add(stationLine)

  // Transaction
  //4. Book ticket
  const bookingService = new TicketBookingService()
  const ticket = new TicketBooking('Green', 'Green', new DateTime().getTime())
  await bookingService.bookTicket(ticket) 


   ## BookTicket implementation
    const ticketRepo = new TicketBookingRepository();
    // 1. Check if metro running in between
   const isMetroAvailable = await stationLineRepo.isMetroRunningBetweenStation(ticket.fromLine, ticket.toLime)
   if(!isMetroAvailable) {
    return
   }

    // 2. Get max cap allowed by metro
   const maxCap = await fareRepo.getFareCapByStationLine(ticket.fromLine, ticket.toLime);
   // 3. Get running fare between station
   const runningFare =  await stationLineRepo.getFare(ticket.fromLine, ticket.toLime, ticket.bookingTimeStamp)
   // 4. calculate weekly and daily expense
   const weeklyExpense = await ticketRepo.getWeeklyExpense(ticket)
   const dailyExpense = await ticketRepo.getDailyExpense(ticket)
   let fare = runningFare
   if(weeklyExpense<maxCap.weeklyCap && dailyExpense<maxCap.dailyCap ) {
    fare=0;
   } 
   ticket.fare = ticket
   // 5. Save ticket
  await ticketRepo.add(ticket)
  ```