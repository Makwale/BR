import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Slot } from 'src/app/modells/slot.model';
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
  constructor(public modalController: ModalController, private dbs: DatabaseService) { }

  ngOnInit() {
    this.slots = this.dbs.slots;
  }


  dismiss(){
    this.modalController.dismiss()
  }


  searchBus(){
    let datetime = new Date(this.date);


    if(this.source != undefined && this.destination != undefined && this.date != undefined && this.time != undefined){
      
      
      this.slots = this.dbs.slots.
      filter( slot => slot.from == this.source && slot.to == this.destination 
        && slot.date.toLocaleDateString() == datetime.toLocaleDateString() && 
        ((slot.date.getHours().toString() + ":" + slot.date.getMinutes().toString()) == this.time)
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
      
      console.log(datetime)
      console.log(this.time)

      this.slots = this.dbs.slots.
      filter( slot => slot.to == this.destination && slot.date.toLocaleDateString() == datetime.toLocaleDateString()
         && ((slot.date.getHours().toString() + ":" + slot.date.getMinutes().toString()) == this.time)
        )

    }else if(this.source == undefined && this.destination == undefined && this.date != undefined && this.time != undefined){
      

      this.slots = this.dbs.slots.
      filter( slot => slot.date.toLocaleDateString() == datetime.toLocaleDateString() && 
      ((slot.date.getHours().toString() + ":" + slot.date.getMinutes().toString()) == this.time)
      )

    }else if(this.source == undefined && this.destination == undefined && this.date == undefined && this.time != undefined){
      
      
      this.slots = this.dbs.slots.
      filter( slot => ((slot.date.getHours().toString() + ":" + slot.date.getMinutes().toString()) == this.time))

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
        ((slot.date.getHours().toString() + ":" + slot.date.getMinutes().toString()) == this.time)
        )

    }else if(this.source != undefined && this.destination == undefined && this.date != undefined && this.time == undefined){

      this.slots = this.dbs.slots.
      filter( slot => slot.from == this.source && 
        slot.date.toLocaleDateString() == datetime.toLocaleDateString() )

    }else if(this.source != undefined && this.destination == undefined && this.date != undefined && this.time != undefined){
    

      this.slots = this.dbs.slots.
      filter( slot => slot.from == this.source && 
        slot.date.toLocaleDateString() == datetime.toLocaleDateString() && 
        ((slot.date.getHours().toString() + ":" + slot.date.getMinutes().toString()) == this.time)
        )

    }if(this.source == undefined && this.destination != undefined && this.date == undefined && this.time != undefined){
    
      this.slots = this.dbs.slots.
      filter( slot => slot.to == this.destination && 
        ((slot.date.getHours().toString() + ":" + slot.date.getMinutes().toString()) == this.time)
        )

    }
  
  }

}
