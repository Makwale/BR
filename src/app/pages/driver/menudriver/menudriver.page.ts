import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuController, ModalController, PopoverController } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';
import { DatabaseService } from 'src/app/services/database.service';
import { EditpicPage } from '../editpic/editpic.page';

@Component({
  selector: 'app-menudriver',
  templateUrl: './menudriver.page.html',
  styleUrls: ['./menudriver.page.scss'],
})
export class MenudriverPage implements OnInit {

  constructor(public modalController: ModalController,
    private menu: MenuController, private router: Router,
    private dbs: DatabaseService, private acs: AccountService, 
    private afa: AngularFireAuth, public popoverController: PopoverController) { }

  ngOnInit() {
  }

  toggle(){
    
    this.menu.toggle()
    
  }

  navigate(route){
    
    this.menu.toggle()
    this.router.navigateByUrl("menudriver/" + route)
  }

  signout(){
    this.menu.toggle()
    
    this.afa.signOut().then(res => {
      this.acs.loginStatus = false;
      this.router.navigateByUrl("menudriver")
      
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


}
