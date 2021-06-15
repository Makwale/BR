import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Booking } from '../modells/booking.model';
import { Bus } from '../modells/bus.model';
import { Slot } from '../modells/slot.model';
import { AccountService } from './account.service';
import { TrackingService } from './tracking.service';
import { finalize } from 'rxjs/operators';
import firebase from 'firebase/app';
import { PopoverController } from '@ionic/angular';
import { Student } from '../modells/student.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  slots: Slot[]= []
  slotsDriver: Slot[] = [];
  bookings: Booking[] = [];
  tempbooking: Booking[] = [];
  isSlotUpdated = false;
  isBookingUpdated = false;
  couterGetBooking = 0;

  constructor(private afs: AngularFirestore,public popoverController: PopoverController, 
    private acs: AccountService, private storage: AngularFireStorage, private router: Router) { }

  getSlots(){
   
    this.afs.collection("Slot").snapshotChanges().subscribe(data => {
      this.slots = [];
      for(let slotd of data){

        let slotid = slotd.payload.doc.id;
        let slotdata = slotd.payload.doc.data()
       
        let slot = new Slot(slotid, slotdata["date"], slotdata["busid"],
        slotdata["geo"], slotdata["avail"], slotdata["booked"], slotdata["from"], slotdata["to"])

        if(!this.searchSlot(slot))
          this.slots.push(slot);
        
      }
    })
  }

  searchSlot(tempSlot: Slot){
    for(let slot of this.slots){
      if(slot.id == tempSlot.id) return true
    }

    return false
  }

  book(slotId){

    console.log(this.bookings)

    if(!this.preventDuplicates(slotId)){
      if(!this.isStudentBookedBefore(slotId, this.acs.user.id)){
      
        this.afs.collection("Booking").add({
          slotid: slotId,
          studentid: this.acs.user.id
        }).then(res => {
          alert("Booked")
          this.updateSlotBooking(slotId);
        }).catch(error => {
          alert("Something wrong happened")
        })
      }else{
        this.updateSlotBooking(slotId)
      }
     
    }else{
      alert("You already booked")
    }
    
  }

  getBookings(){
    console.log(this.couterGetBooking)
   
      this.afs.collection("Booking", ref => ref.where("studentid", "==", this.acs.user.id)).snapshotChanges().subscribe(data => {
   
        for(let booking of data){
          let bookingId = booking.payload.doc.id;
          let bookingData = booking.payload.doc.data();
  
          
        
            this.afs.collection("Slot").doc(bookingData["slotid"]).snapshotChanges().subscribe(data => {
              let slotid = data.payload.id;
              let slotdata = data.payload.data()
    
              let slot = new Slot(slotid, slotdata["date"], slotdata["busid"],
              slotdata["geo"], slotdata["avail"], slotdata["booked"], slotdata["from"], slotdata["to"])
    
              
                let booking = new Booking(bookingId, slot, this.acs.user.id, bookingData["cancelled"]);

                  if(!this.searchBooking(booking)){
                    if(!booking.cancelled){ 
                      if(this.couterGetBooking == 0){
                        this.bookings.push(booking)
                        this.tempbooking.push(booking)
                      }
                    }
                  }
                
            })
          
         
        }

        
      })
    
    
   
  }

  isStudentBookedBefore(slotid, studid){
    
      for(let booking of this.tempbooking){

        if(booking.slot.id == slotid && booking.studentId == studid ){
          this.afs.collection("Booking").doc(booking.id).update({
            cancelled: false
          })
          alert("Booked")
          return true
        }
      }
  
    return false;
  }

  preventDuplicates(id){
   for(let booking of this.bookings){
     if(booking.slot.id == id){

       return true
     }
   }
   
   return false
  }

  updateSlotBooking(id){
   
    for(let slot of this.slots){
      if(slot.id == id){
        let avails = slot.availableSeats - 1;
        let bookeds = slot.bookedSeats + 1;
        this.afs.collection("Slot").doc(id).update({
          avail: avails,
          booked: bookeds
        }).then(res => {
          alert("Updated")
        }).catch( error => {
          alert("Something went wrong")
        })
      }
    }
  }

  updateSlotCancelation(booking: Booking){

    
    for(let slot of this.slots){
      if(slot.id == booking.slot.id){
        let avails = slot.availableSeats + 1;
        let bookeds = slot.bookedSeats - 1;
        
        this.afs.collection("Slot").doc(slot.id).update({
          avail: avails,
          booked: bookeds
        }).then(res => {
          
         alert("Booking Cancelled")

         for(let i = 0; i < this.bookings.length; i++){
           console.log(this.bookings[i])
          if(this.bookings[i].id == booking.id){
            this.bookings[i].cancelled = true;
            this.bookings.splice(i,1);
            console.log(this.bookings[i])
          }
         
         }

          console.log(this.bookings)
        }).catch( error => {
          alert("Something went wrong")
        })
      }
    }

   
  }

  searchBooking(tempBooking: Booking){
    for(let booking of this.bookings){
      
      if(booking.id == tempBooking.id) return true;
    }

    return false
  }

  getSlotGeo(id){
    return this.afs.collection("Slot").doc(id);
  }

  cancel(booking: Booking){


    this.afs.collection("Booking").doc(booking.id).update({
      cancelled: true
    }).then(() => {
      this.updateSlotCancelation(booking)
    }).catch( error => {
      alert("Something wrong happened")
    })

    
  }

  updateInfor(name, surname, sn){

    this.afs.collection("Student").doc(this.acs.user.id).update({
      firstname: name,
      lastname: surname,
      studentNumber: sn
    }).then(() => {
      this.acs.user.lastname = name;
      this.acs.user.lastname = surname;
      (<Student>this.acs.user).studentNumber = sn;
      alert("Profile updated")
    })
  }

  

  updatePic(file) {

    
    const filePath = this.acs.user.id;
    const ref = this.storage.ref("StudentProfile/" + filePath);
    const task = ref.put(file);
    task.snapshotChanges().pipe( finalize( () => {
  		ref.getDownloadURL().subscribe(url =>{
        this.afs.collection("Student").doc(this.acs.user.id).update({
          imgURL: url,
        }).then(() => {
          this.popoverController.dismiss();
          alert("Profile picture updated")
        }).catch(async error => {
          alert(error.message)
        });

      })
  	})).subscribe()	
    
  }




}
