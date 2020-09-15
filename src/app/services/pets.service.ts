import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  // TODO: Move to global config file , config.json or route.json
  private PETOPIA_BACKEND = "http://localhost:8000";

  constructor(private httpClient: HttpClient) {

   }

   // TODO: to be removed
   test() {
    return this.httpClient.get(this.PETOPIA_BACKEND + '/test');
   }

   // Add new pet
    registerPet(pet) {
      return this.httpClient.post(this.PETOPIA_BACKEND + '/api/pet/add', pet);  
   }

   getPets(){
     return this.httpClient.get(this.PETOPIA_BACKEND + '/api/pets');
   }
}
