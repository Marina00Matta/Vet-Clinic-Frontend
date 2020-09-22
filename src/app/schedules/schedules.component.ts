import { Component, OnInit } from '@angular/core';
import { ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { getMinutes } from 'date-fns';
import { ScheduleService } from 'src/app/services/schedule.service';

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
  constructor(private ScheduleService: ScheduleService) {
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





















  
  onActionComplete(args) {
    // console.log('args',args);
    var date = (args.data[0].EndTime.getHours())+':'+(args.data[0].EndTime.getMinutes());
    var time = args.data[0].EndTime.toLocaleDateString();

    let obj = {
        date : '2020-09-08',
        time : '10:00:10' ,
        user_id : 1,
        pet_id : 1,
        status : 'completed'
    }

    console.log('data ',args.data);
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