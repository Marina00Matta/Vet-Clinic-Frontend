import { Component, OnInit } from '@angular/core';
import { AthenticationService } from 'src/app/services/athentication.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-boarding',
  templateUrl: './boarding.component.html',
  styleUrls: ['./boarding.component.scss']
})
export class BoardingComponent implements OnInit {

  reservation_date = localStorage.getItem('reservation_date');
  
  constructor(private athentication:AthenticationService, private router: Router, private token :TokenService) { }
  
  ngOnInit(): void {
    // console.log(this.reservation_date);
  }

  public form={
    pet_name: localStorage.getItem('pet_name'),
    reservation_id: localStorage.getItem('reservation_id'),
    cage_id:null,
    end_date:null,
  }

  public error= null ;

  dateCheck(date1, date2)
  {
    date1 = new Date(date1);
    date2 = new Date(date2);
    var diffTime = Math.abs(date2 - date1);
    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  onSubmit(){
      if(this.form.end_date > this.reservation_date)
      {
          this.athentication.boarding(this.form).subscribe(
            (data)=>console.log(data),
            error=>this.handleError(error)
          )
          alert('Reservation made successfully');
          this.router.navigateByUrl('/home');
      }
      else if((this.dateCheck(this.reservation_date, this.form.end_date)) < 1)
      {
        alert('Pet has to stay with us at least one night');
      }
      else
      {
        alert('End date must be bigger than Reservation date');
      }
  }

  onCancel(){
    var id = +(localStorage.getItem('reservation_id'))
    this.athentication.deleteReservation(id).subscribe(
      (data)=>console.log(data)
    )  
    alert('Reservation canceled');
    this.router.navigateByUrl('/home');
  }

  handleError(error){
    this.error=error.error.errors
  }

  handleResponse(data){
    this.token.handle(data.access_token)
  }

  ngAfterViewInit() {
    let top = document.getElementById('top');
    if(top !=null) {
      top.scrollIntoView();
      top=null
    }
  }
}
