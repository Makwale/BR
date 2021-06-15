export class Bus{
    id;
    driverId?;
    geo = [];
    availableSeats;
    bookedSeats;

    constructor(id, geo, availableSeats, bookedSeats){
        this.id = id;
        
        this.geo = geo;

        this.availableSeats = availableSeats;

        this.bookedSeats = bookedSeats;
    }
}