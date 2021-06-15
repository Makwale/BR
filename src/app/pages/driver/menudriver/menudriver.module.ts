import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenudriverPageRoutingModule } from './menudriver-routing.module';

import { MenudriverPage } from './menudriver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenudriverPageRoutingModule
  ],
  declarations: [MenudriverPage]
})
export class MenudriverPageModule {}
