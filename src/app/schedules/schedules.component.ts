import { Component, OnInit } from '@angular/core';
import { ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';

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
  constructor() {
      this.CurrentDate = new Date(2014, 4, 5);
      this.AppointmentSettings = {
          dataSource: [{
              Id: 101,
              Subject: "Talk with Nature",
              StartTime: new Date(2014, 4, 5, 10),
              EndTime: new Date(2014, 4, 5, 12),
              StartTimeZone: "UTC +00:00",
              EndTimeZone: "UTC +00:00"
          }],
          id: "Id",
          startTime: "StartTime",
          endTime: "EndTime",
          subject: "Subject",
          startTimeZone: "StartTimeZone",
          endTimeZone: "EndTimeZone"
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
    console.log('data ',args.data);
    }

}
