import { Component, OnInit } from '@angular/core';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../Service';
import { Router,ActivatedRoute } from '@angular/router';
import { AthenticationService } from 'src/app/services/athentication.service';
import { TokenService } from 'src/app/services/token.service';
import { reservationService } from 'src/app/reservationService';
import { NgForm } from '@angular/forms';
import { ReservationService } from 'src/app/services/reservation.service';
import { PetsService } from 'src/app/services/pets.service';
import { Pet } from 'src/app/Pet';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})

export class ReservationComponent implements OnInit{
    
  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router,
     private athentication:AthenticationService, private token :TokenService,private pets : PetsService)
  {}
  
    service: Service;
    pet: Pet;

    ngOnInit(): void 
    {
      var id = window.location.pathname.split("/").pop();
      
      this.pets.getPets().subscribe(
        (data: any)=>{
          console.log(data);
          this.pet = data.data;
        });
        
        this.http.get('http://localhost:8000/api/services/'+id).subscribe(
          (data: any) => {
            console.log(data);
            this.service = data.data;
          }); 
        }
           
      service_name =  localStorage.getItem('service_name');
      user_name = localStorage.getItem('user_name');
      my_token = this.token.get();
      decoded = this.token.getTokenPayload(this.my_token);
      client_id = this.decoded.sub;
      public error= null ;
            
      public form={
        service_name: this.service_name,
        client_id: this.client_id,
        date:null,
        pet_name:null,
      }

      // currentDateCheck(date)
      // {
      //   var reservationDate = new Date(date);
      //   var now = new Date();
      //   if(reservationDate < now)
      //   {
      //     return false;
      //   }
      //   else
      //   {
      //     return true;
      //   }
      // }

      onSubmit(){
          console.log(this.form);
          this.athentication.reservation(this.form).subscribe(
            (data)=>this.handleResponse(data),
            error=>this.handleError(error)
          )
          localStorage.setItem('pet_name', this.form.pet_name);
          localStorage.setItem('reservation_date', this.form.date);
      }

      handleError(error){
          this.error=error.error.errors
      }

      handleResponse(data){
        this.token.handle(this.my_token)
        localStorage.setItem('reservation_id', data.reservation_id)
          if(this.service_name == 'Boarding')
          {
            this.router.navigateByUrl('/boarding');
          }
          else
          {
            alert('Reservation made successfully');
            this.router.navigateByUrl('/home');
          }
      }

      ngAfterViewInit() {
        let top = document.getElementById('top');
        if(top !=null) {
          top.scrollIntoView();
          top=null
        }
      }
}