import { Injectable } from '@angular/core';
import { decode } from 'punycode';
import * as jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss={
    login:environment.apiUrl+'/login',

    signup:environment.apiUrl+'/signup'
  }
  constructor() { }


  handle(token){
    this.set(token)
  }

  set(token){
    localStorage.setItem('token',token)
  }

  get(){
    return localStorage.getItem('token')
  }

  remove(){
    localStorage.clear();
  }

  isValild(){

    const token=this.get()
    if(token){
      const payload=this.payload(token)

      if(payload){
       return Object.values(this.iss).indexOf(payload.iss) >-1 ? true:false
      }
    }
    return false
  }

  payload(token){
    const payload= token.split('.')[1]
    return this.decode(payload)
  }


  
  getTokenPayload(token) 
  {
    if(!token)
    {
      return false;
    }else{
      return jwt_decode(token);
    }
  }

  decode(token)
  {
    if(!token)
    {
      return false;
    }else{
      return jwt_decode(token, {header:true});
    }
  }
  
  

  loggedIn()
  {
    return this.isValild()
  }
}