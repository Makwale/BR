import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  isReset: boolean;
  
  constructor(private router: Router, private auth: AuthService,
    private oneSignal: OneSignal, private afa: AngularFireAuth, private toastController: ToastController) { }

  ngOnInit() {
    
  }

  navigate(){
    this.router.navigateByUrl("")
  }

  signin(){
    this.auth.signInDriver(this.email, this.password)
    this.email = ""
    this.password = ""
    
  }

  
  reset(){
    this.isReset = true;
  }

  cancel(){
    this.email = ""
    this.isReset = false;
  }

  resetPassword(){
    this.afa.sendPasswordResetEmail(this.email).then( async () => {
      this.isReset = false;
      const toast = await this.toastController.create({
        message: "Link to reset password has been sent to your email",
        duration: 4000,
        color: "success"
      });
      toast.present();
    }).catch(async error => {
      const toast = await this.toastController.create({
        message: error.message,
        duration: 3000,
        color: "danger"
      });
      toast.present();
    })
  
  }

  
}
