import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchbusPage } from '../searchbus/searchbus.page';
import { MenuController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { Slot } from 'src/app/modells/slot.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slots: Slot[] = [];
  constructor(public modalController: ModalController, private dbs: DatabaseService,
    private router: Router) {}

  ngOnInit() {
    
  }

 

  book(slot: Slot){
    this.dbs.book(slot.id);
    
  }

  navigate(){
    this.router.navigateByUrl("")
  }


}
