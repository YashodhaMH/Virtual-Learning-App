import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


logOrReg:any='welcome';
registerContinue:any='register';
toPersonalDetails:any='continue';

  constructor() { }

  ngOnInit(): void {
  }
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  // login and registration button information
  LoginOrReg(text:any){
    this.logOrReg=text;
    
  }
  RegContinue(text:any){
 this.registerContinue=text;
  }
  personalDetail(text:any){
    this.toPersonalDetails=text;
  }
}
