import { Component, OnInit } from '@angular/core';
import { PetsService } from 'src/app/services/pets.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/User';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  // body = {
  //   "email": atob(window.localStorage.getItem('email')),
  //   "password": atob(window.localStorage.getItem('password')),
  //   }; 
  user: User;
  LoggedInUserId: string;
  message:string;
  savePetError:boolean= false;
  savePetSuccess:boolean= false;


  constructor(private petService: PetsService,private http:HttpClient,private tokenService:TokenService) { 
  }

  ngOnInit(): void {

    


  }
//get data from html
  submit(f: NgForm) {
    console.log(f.value);

    
  
    var token = this.tokenService.get();
  
              let decoded = this.tokenService.getTokenPayload(token);
              console.log({decoded})
              this.LoggedInUserId = decoded.sub;
    const pet = {
      name:f.value.petName,
      user_id:this.LoggedInUserId,
      // user_id:data.current_user.id,
      species:f.value.species,
      breed:f.value.breed,
      weight:f.value.weight,
      color:f.value.color,
      neutred:f.value.neutred,
      age:f.value.age,
      gender:f.value.gender,
      drug_allergies:f.value.allergies,
      current_diet:f.value.diet,
      current_medication:f.value.meds,
      previous_problems:f.value.problems,

    }
    console.log(JSON.stringify(pet,null,2));
    this.addPet(pet);
  }

 

  

  addPet(pet) {
    this.petService.registerPet(pet)
    .subscribe((data: any[])=>{
      console.log(data);
      this.savePetSuccess=true;
    }, error => {
      this.savePetError = true;
      console.log(error)
    },) 
  }

  ngAfterViewInit() {
    let top = document.getElementById('top');
    if(top !=null) {
      top.scrollIntoView();
      top=null
    }
  }
}
