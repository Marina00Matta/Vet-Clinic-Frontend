import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private PETOPIA_BACKEND = "http://localhost:8000";

  constructor(private httpClient: HttpClient) {

   }
  
  getServices(){
    return this.httpClient.get(this.PETOPIA_BACKEND + '/api/services');
  }
  
  }