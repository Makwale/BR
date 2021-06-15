import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ScannerPage } from '../scanner/scanner.page';


declare var mapboxgl: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  slots;
  
  constructor(public modalController: ModalController,
     private as: AuthService, public alertController: AlertController) { }

  ngOnInit() {
    this.slots = this.as.slots
    this.as.signInDriver("", "")
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFudWVsbWFrd2FsZSIsImEiOiJja2hsc3lmYWUyZzRnMnRsNnY2NWIyeGR6In0.1MGnfpXj_dV2QBO3SchfqA';

  }

  async scanner(slot: ScrollOptions){
    
    const modal = await this.modalController.create({
      component: ScannerPage,
      cssClass: 'my-custom-class',
      componentProps: { "slot": slot}
    });
    return await modal.present();
  }

  async delete(id){

    
   
  }

  async enableGPS(id){
    
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
            this.as.updateGeoSlot(id);
          }
        }
      ]
    });

    await alert.present();
    
  }
}


