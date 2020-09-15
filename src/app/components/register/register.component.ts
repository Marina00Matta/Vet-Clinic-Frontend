import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AthenticationService } from 'src/app/services/athentication.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  implements OnInit{
  
  constructor(private athentication:AthenticationService,private token :TokenService,private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
  }
  
  
  form={
    name:null,
    email:null,
    password:null,
    password_confirmation:null,
    phone_number:null,
    recommendation:null,
    address:null
  }
  public error=[]
  onSubmit(){
    
    this.athentication.signUp(this.form).subscribe(
      (data)=>this.handleResponse(data),
      error=>this.handleError(error)
    )

  }


  handleError(error){
    this.error=error.error.errors
  }

  handleResponse(data){
    this.token.handle(data.access_token)
    this.auth.changeAuthStatus(true)
    this.router.navigateByUrl('/home')

  }

  ngAfterViewInit() {
    let top = document.getElementById('top');
    if(top !=null) {
      top.scrollIntoView();
      top=null
    }
  }
}
