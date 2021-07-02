import { Component, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Slot } from 'src/app/modells/slot.model';
import { AuthService } from 'src/app/services/auth.service';
import { ScannerPage } from '../scanner/scanner.page';

import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';
import { AccountService } from 'src/app/services/account.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Driver } from 'src/app/modells/driver.model';


declare var mapboxgl: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, DoCheck, AfterViewInit {
  slots;
  
  constructor(public modalController: ModalController,
     private auth: AuthService, public alertController: AlertController,
     private acs: AccountService,private oneSignal: OneSignal, private afs: AngularFirestore) { 
       
     }

  ngOnInit() {

    this.auth.getSlotsDriver()
    

    this.auth.signInDriver("", "")
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFudWVsbWFrd2FsZSIsImEiOiJja2hsc3lmYWUyZzRnMnRsNnY2NWIyeGR6In0.1MGnfpXj_dV2QBO3SchfqA';
    this.oneSignal.startInit(this.auth.app_id, this.auth.project_id)
    this.oneSignal.endInit() 
  
    this.oneSignal.getIds().then(res => {

      this.afs.collection("Driver").doc(this.acs.user.id).update({
        playerid: res.userId
      })
   
  })
    
  }

  ngDoCheck(){
    
    this.slots = this.auth.slots.filter( slot => slot.bus == (<Driver>this.acs.user).bus.id && !slot.delivered);
    this.auth.clicked = false;
  }

  ngAfterViewInit(){
    
  }

  

  async scanner(slot: ScrollOptions){
    
    const modal = await this.modalController.create({
      component: ScannerPage,
      cssClass: 'my-custom-class',
      componentProps: { "slot": slot}
    });
    return await modal.present();
  }

  async confirmDelivery(id){

    const alert = await this.alertController.create({
      cssClass: "booking-cancel",
      
      header: 'Delivery Confirmation',
      message: 'Are you sure?',
      buttons:  [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            
          }
        }, {
          text: 'Yes',
          handler: () => {
           
            this.auth.confirmDelivery(id);
          }
        }
      ]
    });

    await alert.present();
   
  }

  async enableGPS(slot: Slot){
    
    const alert = await this.alertController.create({
      cssClass: "booking-cancel",
      
      header: 'Enable GPS',
      message: 'Are you sure?',
      buttons:  [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
            
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.auth.updateGeoSlot(slot);
          }
        }
      ]
    });

    await alert.present();
    
  }
}


