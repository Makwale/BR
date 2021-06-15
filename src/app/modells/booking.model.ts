import { Slot } from "./slot.model";

export class Booking{
    id;
    slot: Slot;
    studentId
    cancelled;

    constructor(id, slot, studentId, cancelled?){
        this.id = id;

        this.slot = slot;

        this.studentId = studentId;
        
        this.cancelled = cancelled ? cancelled : false;
    }
}