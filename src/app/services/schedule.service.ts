import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private Visit_url = "http://localhost:8000/api";

  constructor(private httpClient: HttpClient) { }

  setVisit(body) {
    return this.httpClient.post(this.Visit_url + '/visits', body);  
 }
}
