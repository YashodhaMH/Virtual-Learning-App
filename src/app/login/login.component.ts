import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {  AbstractControl,FormBuilder ,} from '@angular/forms'
import  ConfirmedValidator  from './confirmedValidator';
import { HttpClient, HttpHeaders } from '@angular/common/http';




// import Validation from './utils/validation';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  logOrReg: any = 'welcome';
  registerContinue: any = 'register';
  toPersonalDetails: any = 'continue';
  forgotpassword: any
  swapVariableData: any = 'login'
  submitted:boolean=false;
 code:any;

 httpHeaders:any
 phoneNumber:any=""
 postResponse:any
 verificationCodeNumber:any=[]
 token:any
 jwtToken:any


 
  contactForm: FormGroup = new FormGroup({
    mobileNumber: new FormControl(''),
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
   
  });
  constructor(public formBuilder: FormBuilder,private http:HttpClient) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      mobileNumber:[''],
      fullname: ['', [Validators.required, Validators.minLength(10)]],
      username: ['', [Validators.required, Validators.maxLength(15), Validators.pattern("^[a-zA-Z]+$")]],
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,}$/)]],
      confirmPassword:['', Validators.required]
    }
    ,
     {
           validators: [ConfirmedValidator.match('password', 'confirmPassword')]
        }
        );
        
  }
  


  get f(): { [key: string]: AbstractControl } {
  
    return this.contactForm.controls;
  }
  LoginOrReg(text: any) {
    this.logOrReg = text;

  }
  
  personalDetail(text: any) {
    this.toPersonalDetails = text;
  }
  get email() {
    return this.contactForm.get('email');
  }

  onSubmit() {
    this.submitted=true;
  
    console.log(this.contactForm.value);

  }
  //changing the forgot password!

  toChangePassword(text: any) {
    this.swapVariableData = text;
  }
  RegContinue(text: any):any {
  
    this.registerContinue = text;
    this.swapVariableData = text;
    // let url="https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/register/sendOtp"
    // console.log(this.http.post<any>(url,{phoneNumber:this.phoneNumber},{observe: 'response'}).subscribe(res=>{
    //   console.log(res)
    // },(error)=>{
    //   console.log(error)
    // })) 




    let url="https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/register/sendOtp"
    this.http.post<any>(url,{phoneNumber:this.phoneNumber},{observe: 'response'}).subscribe({
      next:(res)=>{
      console.log(res.body.meta.token)
      this.token=res.body.meta.token
      console.log("jwt "+this.token)
      this.jwtToken="jwt "+this.token
    // this.httpHeaders=new HttpHeaders({
    //   'content-type':'application/json'
      
      
    // })
    // this.httpHeaders=this.httpHeaders.set('Authorization',this.jwtToken)
    // console.log(this.httpHeaders,"haha")
    },error:(error)=>{
      console.log(error)
    }
    })
   



    // .subscribe((response:any)=>{
    //    this.postResponse=response
    //    console.log(this.postResponse)
    //   console.log(response.body)
      
    // })
    
    
  
  }
  move(e: any, p: any, c: any, n: any) {
    const nodeList = document.querySelectorAll<HTMLElement>(".input-field");
    let len = c.value.length;
    let maxlength = c.getAttribute('maxlength')
    if (len == maxlength) {
      if (n != '') {
        n.focus();
     
      }
      else {
       
       
        for (let i = 0; i < nodeList.length; i++) {
          nodeList[i].style.borderBottom = '1px solid  #00E217 ';
        
        }
      }
      // 
    }
    if (e.key == 'Backspace') {
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.borderBottom = '1px solid rgba(255, 255, 255, 0.4)';
      }
      if (p !== '') {
        p.focus();
      }
     
    }
   this.verificationCodeNumber.push(c.value)
   console.log(parseInt(this.verificationCodeNumber.join("")))
   if(this.verificationCodeNumber.length===4){

    let urll="https://virtuallearn2.herokuapp.com/api/v1/virtualLearn/register/verfiyOtp"
    
    let headers=new HttpHeaders({'Authorization':this.jwtToken})
    this.http.post(urll,{otp:parseInt(this.verificationCodeNumber.join(""))},{headers:headers}).subscribe({
         next:(res)=>{
      console.log(res)
     
    },error:(error)=>{
      console.log(error)
    }
    })

   }
   
    
  }
}





