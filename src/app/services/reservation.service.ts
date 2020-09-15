import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private Reservation_url = "http://localhost:8000/api";

  constructor(private httpClient: HttpClient) {

   }

   // Add new pet
    setReservation(id) {
      return this.httpClient.post(this.Reservation_url + '/reservations', id);  
   }
}
