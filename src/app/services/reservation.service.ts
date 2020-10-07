import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private Reservation_url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {

   }

   // Add new pet
    setReservation(id) {
      return this.httpClient.post(this.Reservation_url + '/reservations', id);  
   }
}
