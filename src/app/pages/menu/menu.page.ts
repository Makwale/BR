import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';
import { DatabaseService } from 'src/app/services/database.service';
import { PopoverController } from '@ionic/angular';
import { EditpicPage } from '../editpic/editpic.page';
import { SearchbusPage } from '../searchbus/searchbus.page';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
  defaultPic = "../../../assets/profile.png"
  
  constructor(public modalController: ModalController,
    private menu: MenuController, private router: Router,
    private dbs: DatabaseService, private acs: AccountService, 
    private afa: AngularFireAuth, public popoverController: PopoverController) { }

  ngOnInit() {
    this.dbs.getSlots();
    
  }

  
  toggle(){
    
    this.menu.toggle()
    
  }

  navigate(route){
    
    this.menu.toggle()
    if(route == "")
      this.router.navigateByUrl("menu")
    else
      this.router.navigateByUrl("menu/" + route)
  }

  signout(){
    this.afa.signOut().then(res => {
      this.acs.loginStatus = false;
      this.router.navigateByUrl("menu")
      this.dbs.bookings = []
      this.menu.toggle()
    })
  }

   async edit(){
    const popover = await this.popoverController.create({
      component: EditpicPage,
      cssClass: 'my-custom-class',
      translucent: true
    });
    await popover.present();

  }

  async searchbus(){
    
    const modal = await this.modalController.create({
      component: SearchbusPage,
     
    });
    return await modal.present();
}


  //-25.731898523213264, 28.162400726583623

}
