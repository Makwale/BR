import { User } from "./user.model";

export class Driver extends User{
    phone;
    constructor(id, firstname, lastname, phone, email, imgURL){
        
        super(id, firstname, lastname, email, imgURL)

        this.phone = phone;
       
    }
}