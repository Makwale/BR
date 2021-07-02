import { Component, OnInit, DoCheck } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Slot } from 'src/app/modells/slot.model';
import { AccountService } from 'src/app/services/account.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-searchbus',
  templateUrl: './searchbus.page.html',
  styleUrls: ['./searchbus.page.scss'],
})
export class SearchbusPage implements OnInit {
  source: String;
  destination: String;
  date: string;
  time: string;
  slots: Slot[];
  isRefreshing = false;
  searching = false;
  constructor(public modalController: ModalController, private dbs: DatabaseService,
    private acs: AccountService, private toastController: ToastController) { }

  ngOnInit() {
    this.slots = this.dbs.slots;
  }


  dismiss(){
    this.modalController.dismiss()
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


  doRefresh(event){
    this.isRefreshing = true;
    this.slots = this.dbs.slots;
    this.searching = false;
    console.log(this.slots)
    if(this.isRefreshing){

      this.source = undefined;
  
      this.destination = undefined
  
      this. date = undefined;
  
      this.time = undefined;
    }
    event.target.complete()
    
    setTimeout(() => {
      this.isRefreshing = false;
    }, 2000)
  }

  searchBus(){

    
    if(!this.isRefreshing)
    {
      let datetime = new Date(this.date);
      this.searching = true;
  
    if(this.source != undefined && this.destination != undefined && this.date != undefined && this.time != undefined){
      
      
      this.slots = this.dbs.slots.
      filter( slot => slot.from == this.source && slot.to == this.destination 
        && slot.date.toLocaleDateString() == datetime.toLocaleDateString() && 
        (((slot.date.getHours() < 10 ? 0 + "" + slot.date.getHours() : slot.date.getHours().toString()) + ":" + 
        (slot.date.getMinutes() < 10 ? 0 + "" + slot.date.getMinutes() : slot.date.getMinutes().toString())) 
        == this.time)
        )


      
    }else if(this.source != undefined && this.destination != undefined && this.date != undefined && this.time == undefined){

      this.slots = this.dbs.slots.
      filter( slot => slot.from == this.source && slot.to == this.destination 
        && slot.date.toLocaleDateString() == datetime.toLocaleDateString())

    }else if(this.source == undefined && this.destination != undefined && this.date == undefined && this.time == undefined){
      
      this.slots = this.dbs.slots.
      filter( slot => slot.to == this.destination)

    }else if(this.source != undefined && this.destination == undefined && this.date == undefined && this.time == undefined){
      
      this.slots = this.dbs.slots.
      filter( slot => slot.from == this.source)

    }else if(this.source == undefined && this.destination != undefined && this.date != undefined && this.time != undefined){
 

      this.slots = this.dbs.slots.
      filter( slot => slot.to == this.destination && slot.date.toLocaleDateString() == datetime.toLocaleDateString()
         && (((slot.date.getHours() < 10 ? 0 + "" + slot.date.getHours() : slot.date.getHours().toString()) + ":" + 
         (slot.date.getMinutes() < 10 ? 0 + "" + slot.date.getMinutes() : slot.date.getMinutes().toString()))
          == this.time)
        )

    }else if(this.source == undefined && this.destination == undefined && this.date != undefined && this.time != undefined){
      

      this.slots = this.dbs.slots.
      filter( slot => slot.date.toLocaleDateString() == datetime.toLocaleDateString() && 
      (((slot.date.getHours() < 10 ? 0 + "" + slot.date.getHours() : slot.date.getHours().toString()) + ":" + 
      (slot.date.getMinutes() < 10 ? 0 + "" + slot.date.getMinutes() : slot.date.getMinutes().toString())) 
      == this.time)
      )

    }else if(this.source == undefined && this.destination == undefined && this.date == undefined && this.time != undefined){
      
      
      this.slots = this.dbs.slots.
      filter( slot => (((slot.date.getHours() < 10 ? 0 + "" + slot.date.getHours() : slot.date.getHours().toString()) + ":" + 
      (slot.date.getMinutes() < 10 ? 0 + "" + slot.date.getMinutes() : slot.date.getMinutes().toString())) 
      == this.time))

    }else if(this.source == undefined && this.destination != undefined && this.date != undefined && this.time == undefined){
      

      this.slots = this.dbs.slots.
      filter( slot => slot.to == this.destination 
        && slot.date.toLocaleDateString() == datetime.toLocaleDateString())


    }else if(this.source == undefined && this.destination == undefined && this.date != undefined && this.time == undefined){
      
      

      this.slots = this.dbs.slots.
      filter( slot => slot.date.toLocaleDateString() == datetime.toLocaleDateString())

    }else if(this.source != undefined && this.destination != undefined && this.date == undefined && this.time == undefined){
      
      this.slots = this.dbs.slots.
      filter( slot => slot.from == this.source && slot.to == this.destination)

    }else if(this.source != undefined && this.destination == undefined && this.date == undefined && this.time != undefined){

      this.slots = this.dbs.slots.
      filter( slot => slot.from == this.source && 
        (((slot.date.getHours() < 10 ? 0 + "" + slot.date.getHours() : slot.date.getHours().toString()) + ":" + 
        (slot.date.getMinutes() < 10 ? 0 + "" + slot.date.getMinutes() : slot.date.getMinutes().toString()))
         == this.time)
        )

    }else if(this.source != undefined && this.destination == undefined && this.date != undefined && this.time == undefined){

      this.slots = this.dbs.slots.
      filter( slot => slot.from == this.source && 
        slot.date.toLocaleDateString() == datetime.toLocaleDateString() )

    }else if(this.source != undefined && this.destination == undefined && this.date != undefined && this.time != undefined){
    

      this.slots = this.dbs.slots.
      filter( slot => slot.from == this.source && 
        slot.date.toLocaleDateString() == datetime.toLocaleDateString() && 
        (((slot.date.getHours() < 10 ? 0 + "" + slot.date.getHours() : slot.date.getHours().toString()) + ":" + 
        (slot.date.getMinutes() < 10 ? 0 + "" + slot.date.getMinutes() : slot.date.getMinutes().toString()))
         == this.time)
        )

    }if(this.source == undefined && this.destination != undefined && this.date == undefined && this.time != undefined){
    
      this.slots = this.dbs.slots.
      filter( slot => slot.to == this.destination && 
        (((slot.date.getHours() < 10 ? 0 + "" + slot.date.getHours() : slot.date.getHours().toString()) + ":" + 
        (slot.date.getMinutes() < 10 ? 0 + "" + slot.date.getMinutes() : slot.date.getMinutes().toString()))
         == this.time)
        )

    }
  


    }
  }

}
