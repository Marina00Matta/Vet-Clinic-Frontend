import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private Visit_url = "http://localhost:8000/api";

  constructor(private httpClient: HttpClient) { }

  getAppointments() {
    return this.httpClient.get(this.Visit_url + '/appointments');  
 }
}
