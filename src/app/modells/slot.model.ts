import { Time } from "@angular/common";
import { Bus } from "./bus.model";

export class Slot{
    id;
    date: Date;
    bus: Bus;
    from;
    to;
    driverId?;
    geo = [];
    availableSeats;
    bookedSeats;

    constructor(id, date, bus, geo, availableSeats, bookedSeats, from, to){

        this.id = id;

        this.date = date.toDate();

        this.bus = bus;

        this.from = from;

         this.to = to;

         this.geo = geo;

        this.availableSeats = availableSeats;

        this.bookedSeats = bookedSeats;
    }

}