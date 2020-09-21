import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
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

}
