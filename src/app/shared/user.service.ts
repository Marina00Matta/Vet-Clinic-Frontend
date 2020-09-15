import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
 readonly rootUrl = 'http://localhost:8000'



  constructor(private http : HttpClient) { }

  




  register(user : User){
    const body :User={
      name: user.name,
      email:user.email,
      password:user.password,
      phone_number:user.phone_number,
      recommendation:user.recommendation,
      address:user.address
    }
    return this.http.post<User>('http://localhost:8000/api/register',body)
  }
}
