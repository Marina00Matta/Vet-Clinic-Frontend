import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScheduleComponent, DayService,TimelineViews, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { getMinutes } from 'date-fns';
import { ScheduleService } from 'src/app/services/schedule.service';
import { TokenService } from 'src/app/services/token.service';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
// import { eventData } from './datasource.ts';
import { PetsService } from 'src/app/services/pets.service';
import { WorkHoursModel } from '@syncfusion/ej2-angular-schedule';
import { NgForm } from '@angular/forms';

import { Schedule, Day, Week, WorkWeek, Month, Agenda, PopupOpenEventArgs } from '@syncfusion/ej2-schedule';

@Component({
  selector: 'app-schedules',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
  public workWeekDays = [1, 3, 5];
  public scheduleHours: WorkHoursModel  = { highlight: true, start: '11:00', end: '20:00' };
 
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
   this.workWeekDays = [1, 3, 5];

//     Schedule.Inject(Week, WorkWeek, Month, TimelineViews);
// let scheduleObj: Schedule = new Schedule({
//     width: '100%',
//     height: '550px',
//     selectedDate: new Date(),
//     currentView: 'WorkWeek',
//     views: ['Week', 'WorkWeek', 'Month', 'TimelineWeek', 'TimelineWorkWeek'],
//     workDays: [1 , 2 , 3, 5],
//     // eventSettings: { dataSource: scheduleData }
// });
// scheduleObj.appendTo('#Schedule');

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
    console.log('data ',args);
    console.log(args.data[0].EndTime.getMonth())
    console.log(typeof(args.data[0].EndTime));

    if (args.requestType == "eventRemoved"){
      console.log('deleted');
      this.obj = {
        date : this.date,
        time : this.time ,
        user_id : this.client_id,
        pet_id : 1,
        status : 'canceled'
    }
    this.ScheduleService.cancelVisit(this.obj).subscribe((res :any) =>{
      console.log(res)
        console.log(this.obj);
        });

    }
  
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
        localStorage.setItem('pet_id', form.value.pet_id);
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

