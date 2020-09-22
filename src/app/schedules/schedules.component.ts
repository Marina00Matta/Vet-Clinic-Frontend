import { Component, OnInit } from '@angular/core';
import { ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
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
    console.log('data ',args.data);
    console.log(typeof(args.data[0].EndTime));
    this.ScheduleService.setVisit(args.data[0]).subscribe((res :any) =>{
      console.log(res);
    });
    }

}
