import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { Slot } from 'src/app/modells/slot.model';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  @Input() slot: Slot;
  constructor(public modalController: ModalController,
     private barcodeScanner: BarcodeScanner, private as: AuthService, private auth: AuthService) { }

  ngOnInit() {
   
  }

  close(){
    this.modalController.dismiss()
  }

  scan(){
   
    this.barcodeScanner.scan({
      showTorchButton: true,
    }).then(barcodeData => {
      this.as.checkStudentIn(this.slot.id, Number(barcodeData.text.substring(1)))
     }).catch(err => {
       this.auth.ourToast(err, "danger")
        
     });
  }


  

}
