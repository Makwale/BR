import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  test(){
    alert("Hello world")
  }

  user(user: string){
    if(user == "student"){
      this.router.navigateByUrl("menu")
    }else{
      this.router.navigateByUrl("menudriver")
    }
  }

}
