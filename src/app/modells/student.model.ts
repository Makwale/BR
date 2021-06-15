import { User } from "./user.model";

export class Student extends User{
    studentNumber;
    constructor(id, firstname, lastname, studentNumber , email, imgURL){
        
        super(id, firstname, lastname, email, imgURL)

        this.studentNumber = studentNumber;
       
    }
}