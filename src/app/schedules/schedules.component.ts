import { Component, OnInit } from '@angular/core';
import { ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { getMinutes } from 'date-fns';
import { ScheduleService } from 'src/app/services/schedule.service';
import { TokenService } from 'src/app/services/token.service';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
// import { eventData } from './datasource.ts';
import { PetsService } from 'src/app/services/pets.service';

import { NgForm } from '@angular/forms';


import { Schedule, Day, Week, WorkWeek, Month, Agenda, PopupOpenEventArgs } from '@syncfusion/ej2-schedule';

@Component({
  selector: 'app-schedules',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss'],
//   template: `<ejs-schedule id="Schedule" [currentDate]="CurrentDate"
//   contextMenuSettings.enable=true 
//   [contextMenuSettings.menuItems]=scheduleMenuItems
//    [appointmentSettings]="AppointmentSettings"
//    (actionComplete)="onActionComplete($event)"> </ejs-schedule>`
})


export class SchedulesComponent implements OnInit {

  public CurrentDate;
  public AppointmentSettings: any;
  public scheduleObj: ScheduleComponent;
  public  pet;
  public date;
  public time;
  public obj;
  constructor(private ScheduleService: ScheduleService, private token :TokenService,
     private pets : PetsService) {
      this.CurrentDate = new Date();
      this.AppointmentSettings = {
      };
  }
  //to get logged user
  user_name = localStorage.getItem('user_name');
  my_token = this.token.get();
  decoded = this.token.getTokenPayload(this.my_token);
  client_id = this.decoded.sub;

  //to get all pets
  ngOnInit(): void {
    this.pets.getPetsByUser(this.client_id).subscribe(
        (data: any)=>{
          console.log('pets',data.data);
          this.pet = data.data;
        });
  }

  onActionComplete(args) {
    var x = args.data[0].StartTime.getMonth();
    var y = x + 1;
    console.log(y);
     this.time = (args.data[0].StartTime.getHours())+':'+(args.data[0].StartTime.getMinutes())+':'+(args.data[0].StartTime.getSeconds());
    this.date = args.data[0].StartTime.getFullYear()+'-'+(y)+'-'+(args.data[0].StartTime.getDate());
    // var date = args.data[0].EndTime.toLocaleDateString();  
     this.obj = {
        date : this.date,
        time : this.time ,
        user_id : this.client_id,
        pet_id : null,
        status : 'Pending'
    }
    console.log(args.data[0].EndTime.toLocaleDateString());
    console.log((args.data[0].EndTime.getFullYear())+'-'+(y)+'-'+(args.data[0].EndTime.getDate()));
    console.log('data ',args.data);
    console.log(args.data[0].EndTime.getMonth())
    console.log(typeof(args.data[0].EndTime));
  
    }
    onSubmit(form: NgForm){
        console.log(form.value);
        this.obj = {
            date : this.date,
            time : this.time ,
            user_id : this.client_id,
            pet_id : form.value.pet_id,
            status : 'Pending'
        }
        this.ScheduleService.setVisit(this.obj).subscribe((res :any) =>{
      console.log(res)
        console.log(this.obj);
        });
        // this.athentication.reservation(this.form).subscribe(
        //   (data)=>this.handleResponse(data),
        //   error=>this.handleError(error)
        // )
        // localStorage.setItem('pet_name', this.form.pet_name);
        // localStorage.setItem('reservation_date', this.form.date);
    }
 
//   onCellClick(args) {
//       /* Do further actions here */
//       console.log(this.CurrentDate)
//       console.log(this.AppointmentSettings)
//       console.log(args,'args')
//   }



 

  

  

}

// args.data[0].EndTime.getDate()
// args.data[0].StartTime.getUTCDate()
// getMonth()
// getFullYear()
// getDate()
// (args.data[0].EndTime.getDate(),args.data[0].EndTime.getMonth(),args.data[0].EndTime.getFullYear())

