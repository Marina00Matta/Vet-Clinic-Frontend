import { Component, OnInit } from '@angular/core';
import { ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { getMinutes } from 'date-fns';
import { ScheduleService } from 'src/app/services/schedule.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-schedules',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  // templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss'],
  template: `<ejs-schedule id="Schedule" [currentDate]="CurrentDate"
   [appointmentSettings]="AppointmentSettings"
   (actionComplete)="onActionComplete($event)"> </ejs-schedule>`
})
export class SchedulesComponent implements OnInit {

  public CurrentDate;
  public AppointmentSettings: any;
  public scheduleObj: ScheduleComponent;
  constructor(private ScheduleService: ScheduleService, private token :TokenService) {
      this.CurrentDate = new Date();
      this.AppointmentSettings = {
      };
  }

  onCellClick(args) {
      /* Do further actions here */
      console.log(this.CurrentDate)
      console.log(this.AppointmentSettings)
      console.log(args,'args')
  }
  ngOnInit(): void {
  }

















  user_name = localStorage.getItem('user_name');
  my_token = this.token.get();
  decoded = this.token.getTokenPayload(this.my_token);
  client_id = this.decoded.sub;



  
  onActionComplete(args) {
    // console.log('args',args);
    var x = args.data[0].StartTime.getMonth();
    var y = x + 1;
    console.log(y);
    var time = (args.data[0].StartTime.getHours())+':'+(args.data[0].StartTime.getMinutes())+':'+(args.data[0].StartTime.getSeconds());
    var date = args.data[0].StartTime.getFullYear()+'-'+(y)+'-'+(args.data[0].StartTime.getDate());
    // var date = args.data[0].EndTime.toLocaleDateString();
    
    
    
    let obj = {
        date : date,
        time : time ,
        user_id : this.client_id,
        pet_id : 1,
        status : 'Pending'
    }
    console.log(args.data[0].EndTime.toLocaleDateString());
    console.log((args.data[0].EndTime.getFullYear())+'-'+(y)+'-'+(args.data[0].EndTime.getDate()));
    console.log('data ',args.data);
    console.log(args.data[0].EndTime.getMonth())
    console.log(typeof(args.data[0].EndTime));
    this.ScheduleService.setVisit(obj).subscribe((res :any) =>{
      console.log(res);
      
      
    });
    }

  

}

// args.data[0].EndTime.getDate()
// args.data[0].StartTime.getUTCDate()
// getMonth()
// getFullYear()
// getDate()
// (args.data[0].EndTime.getDate(),args.data[0].EndTime.getMonth(),args.data[0].EndTime.getFullYear())