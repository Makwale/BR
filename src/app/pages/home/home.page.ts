import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchbusPage } from '../searchbus/searchbus.page';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Slot } from 'src/app/modells/slot.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AccountService } from 'src/app/services/account.service';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slots: Slot[] = [];
  dis = true
  constructor(public modalController: ModalController, private dbs: DatabaseService,
    private router: Router, private auth: AuthService, private acs: AccountService,
    private oneSignal: OneSignal, private afs: AngularFirestore,
    public toastController: ToastController) {}

  ngOnInit() {

 
  }

 

  async book(slot: Slot){
    
    if(this.acs.loginStatus){

      this.dbs.book(slot.id);
    }else{
      const toast = await this.toastController.create({
        message: 'Signin and start booking',
        duration: 3000,
        color: "warning"
      });
      toast.present();
    }
    
  }

  navigate(){
    this.router.navigateByUrl("")
  }

}
