import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  email;
  password;
  clicked = false;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  navigate(){
    this.router.navigateByUrl("menu/signup")
  }

  signin(){
   
    this.auth.signIn(this.email, this.password)
    
    
  }

}
