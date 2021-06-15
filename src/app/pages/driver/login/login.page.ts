import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email;
  password;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  navigate(){
    this.router.navigateByUrl("")
  }

  signin(){
    this.auth.signInDriver(this.email, this.password)
    
  }
}
