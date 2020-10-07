import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private Visit_url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  setVisit(body) {
    return this.httpClient.post(this.Visit_url + '/visits', body);  
 }

 cancelVisit(body) {
  return this.httpClient.put(this.Visit_url + '/visits/cancel', body);  
}
showVisits(userId) {
  return this.httpClient.get(this.Visit_url + '/visits/' + userId);  
}
getAllVisits(Id) {
  return this.httpClient.get(this.Visit_url + '/visits/all/' + Id);  
}
}
