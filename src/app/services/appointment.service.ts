import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private Visit_url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAppointments() {
    return this.httpClient.get(this.Visit_url + '/appointments');  
 }
}
