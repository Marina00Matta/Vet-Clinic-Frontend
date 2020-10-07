import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AthenticationService {
 
 private baseUrl= environment.apiUrl;
  constructor(private http:HttpClient, private token :TokenService) { }


  signUp(data){
    return this.http.post(`${this.baseUrl}/signup`,data)
  }


  signin(data){
    
    return this.http.post(`${this.baseUrl}/login`,data)
  }

  

 

  reservation(data){   
    return this.http.post(`${this.baseUrl}/reservations`,data)
  }

  deleteReservation(id: number){
    return this.http.delete(`${this.baseUrl}/reservations/${id}`)
  }

  boarding(data){
    return this.http.post(`${this.baseUrl}/boardings`, data)
  }
}
