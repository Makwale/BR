import { Component, Input, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/modells/booking.model';
import { DatabaseService } from 'src/app/services/database.service';
import { TrackingService } from 'src/app/services/tracking.service';
import { AlertController } from '@ionic/angular';
import { Slot } from 'src/app/modells/slot.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, DoCheck, OnDestroy {
 
  constructor(private router: Router, private dbs: DatabaseService, private ts: TrackingService,
     public alertController: AlertController, private acs: AccountService) { }

  ngOnInit() {
   
    this.dbs.bookings = this.dbs.bookings.filter( booking => booking.studentId == this.acs.user.id)
    this.dbs.counter = 3;
  }


  ngDoCheck(){
    this.dbs.bookings = this.dbs.bookings.filter( booking => booking.studentId == this.acs.user.id)

  }

  ngOnDestroy(){
    this.dbs.counter = 0;
  }

  navigate(booking: Booking){
    this.ts.slot = booking.slot;
    this.router.navigateByUrl('menu/map')
  }

  async cancel(booking: Booking){

    
      const alert = await this.alertController.create({
        cssClass: "booking-cancel",
        header: 'Booking Cancelation',
        message: 'Are you sure?',
        buttons:  [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              
            }
          }, {
            text: 'Yes',
            handler: () => {
              
              this.dbs.cancel(booking);           

            }
          }
        ]
      });
  
      await alert.present();
  
  }

}
