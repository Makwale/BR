import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import  firebase from 'firebase/app';

import { AngularFirestore, 
  AngularFirestoreCollection,
   AngularFirestoreDocument } from '@angular/fire/firestore';
import { AccountService } from './account.service';
import { Student } from '../modells/student.model';
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';
import { Driver } from '../modells/driver.model';
import { Slot } from '../modells/slot.model';
import { Booking } from '../modells/booking.model';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  slots: Slot[] = []
  bookingsDriver: Booking[] = [];
  clicked = false;
  trackingSlotId;
  constructor(private afa: AngularFireAuth, private afs: AngularFirestore,
     private acs: AccountService, private router: Router, private dbs: DatabaseService,
     public alertController: AlertController) { }

  signIn(email, password) {    
    this.clicked = true;
    this.afa.signInWithEmailAndPassword(email, password)
    .then(res => {  
      this.afs.collection("Student").doc(res.user.uid).valueChanges().subscribe(data => {
        this.acs.user = new Student(res.user.uid, data["firstname"], data["lastname"], data["studentNumber"],
        data["email"], data["imgURL"]);
        this.dbs.getBookings();
        this.acs.loginStatus = true;
        this.clicked = false;
        this.router.navigateByUrl("menu")
      })
    }).catch(error =>{
      this.clicked = false;
      alert(error.message)
    })
    
  }

  signInDriver(email, password){
    this.afa.signInWithEmailAndPassword("makwale.em@gmail.com", "Manuelmame35@")
    .then(res => {  
      
      this.afs.collection("Driver").doc("XHZyrLkGPua33C6x48jiTqx1Re03").valueChanges().subscribe(data => {
        
        if(data != undefined){
          this.acs.user = new Driver(res.user.uid, data["firstname"], data["lastname"], data["phone"],
          data["email"], data["imgURL"]);
        
          this.getSlotsDriver(res.user.uid);

          this.acs.loginStatus = true;
          this.router.navigateByUrl("menudriver/home")
        }else{
          alert("Unauthorised user")
        }
       
      })
    }).catch(error =>{
      alert(error.message)
    })
  }
 

  signup(name: string, surname: string, studn: number, email: string, password: string) {
   
    this.afa.createUserWithEmailAndPassword( email, password).then( userCredentials => {
      let id = userCredentials.user.uid;
      this.afs.collection("Student").doc(id).set({
        firstname: name,
        lastname: surname,
        studentNumber: studn,
        email: email,
        imgURL: ""
      }).then( res => {
        
        this.router.navigateByUrl("menu/signin")
      }).catch( error => {
        alert( error.message)

      })

    }).catch( error => {
      alert(error.message)
    })
  }

  getSlotsDriver(id){
    this.afs.collection("Bus", ref => ref.where("driverid", "==", id)).snapshotChanges().
    subscribe(data => {
     
      this.afs.collection("Slot", ref => ref.where("busid", "==", data[0].payload.doc.id)).snapshotChanges().
      subscribe(data => {
        for(let slotdata of data){
          let slot = new Slot(slotdata.payload.doc.id, slotdata.payload.doc.data()["date"],
          slotdata.payload.doc.data()["busid"],
         slotdata.payload.doc.data()["geo"], slotdata.payload.doc.data()["avail"],
          slotdata.payload.doc.data()["booked"], slotdata.payload.doc.data()["from"],
           slotdata.payload.doc.data()["to"])
           
           if(!this.searchSlot(slot)){
            this.slots.push(slot)
            this.getBookingsSlot(slot)
           }
          
        }
      })
    })
  }

  
  searchSlot(tempSlot: Slot){
    for(let slot of this.slots){
      if(slot.id == tempSlot.id) return true
    }

    return false
  }

  getBookingsSlot(slot: Slot){
    this.afs.collection("Booking", ref => ref.where("slotid", "==", slot.id)).snapshotChanges().
    subscribe(data => {
      for(let bdata of data){
        this.bookingsDriver.push(new Booking(bdata.payload.doc.id,slot, bdata.payload.doc.data()["studentid"]))
      }
    })
  }

  checkStudentIn(slotId,studentNumber){
    this.afs.collection("Student", ref => ref.where("studentNumber", "==", studentNumber)).snapshotChanges().
    subscribe( data => {
      if(data.length > 0){
        if(this.searchStudentBooking(slotId, data[0].payload.doc.id)){
          alert("Checked in " + String(studentNumber))
        }else{
          alert("Student not found for this slot " + String(studentNumber))
        }
      }else{
        alert("Student does not exists " + String(studentNumber))
      }
      
    })
    
  }

  searchStudentBooking(slotId,studentNumber){
   
    for(let booking of this.bookingsDriver){
      if(booking.studentId == studentNumber && booking.slot.id == slotId){
        this.afs.collection("Booking").doc(booking.id).update({
          checkedin: true
        })
        return true;
      }
    }
    return false;
  }

  updateGeoSlot(id){
    this.trackingSlotId = id;
    this.afs.collection("Slot").doc(id).update({
      gps: true
    }).then(() =>{
      alert("Bus GPS enabled")
    })

    navigator.geolocation.watchPosition(pos => {
      this.afs.collection("Slot").doc(this.trackingSlotId).update({
        geo: [pos.coords.longitude, pos.coords.latitude]
      })
    })
   
  }

  updateInfor(name, surname, phone){

    this.afs.collection("Driver").doc(this.acs.user.id).update({
      firstname: name,
      lastname: surname,
      phone: phone
    }).then(() => {
      this.acs.user.lastname = name;
      this.acs.user.lastname = surname;
      (<Driver>this.acs.user).phone = phone;
      alert("Profile updated")
    }).catch(err => {
      alert(err.message)
    })
  }

}
