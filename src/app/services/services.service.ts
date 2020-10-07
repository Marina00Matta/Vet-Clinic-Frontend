import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private PETOPIA_BACKEND = environment.apiUrl;

  constructor(private httpClient: HttpClient) {

   }
  
  getServices(){
    return this.httpClient.get(this.PETOPIA_BACKEND + '/services');
  }
  
  }