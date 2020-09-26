import { Component, OnInit } from '@angular/core';
import { ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { getMinutes } from 'date-fns';
import { ScheduleService } from 'src/app/services/schedule.service';
import { TokenService } from 'src/app/services/token.service';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
// import { eventData } from './datasource.ts';

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
  public scheduleMenuItems;
  public AppointmentSettings: any;
  public scheduleObj: ScheduleComponent;
  
  constructor(private ScheduleService: ScheduleService, private token :TokenService) {
Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

      this.CurrentDate = new Date();
      this.AppointmentSettings = {
      };
      this.scheduleMenuItems = {
        appointment: [{
            id: "open",
            text: "Open Appointment"
        }, {
            id: "delete",
            text: "Delete Appointment"
        }, {
            id: "option1",
            text: "User Option 1"
        }],
        cells: [{
            id: "celloption1",
            text: "Custom Option 1"
        }]
    };
  }
  

  onCellClick(args) {
      /* Do further actions here */
      console.log(this.CurrentDate)
      console.log(this.AppointmentSettings)
      console.log(args,'args')
  }
  ngOnInit(): void {

    let scheduleObj: Schedule = new Schedule({
      width: '100%',
      height: '550px',
      selectedDate: new Date(2018, 1, 15),
      showQuickInfo: false,
      editorTemplate: '#EventEditorTemplate',
          popupOpen: (args: PopupOpenEventArgs) => {
              if (args.type === 'Editor') {
                  let statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
                  if (!statusElement.classList.contains('e-dropdownlist')) {
                      let dropDownListObject: DropDownList = new DropDownList({
                          placeholder: 'Choose status', value: statusElement.value,
                          dataSource: ['New', 'Requested', 'Confirmed']
                      });
                      dropDownListObject.appendTo(statusElement);
                  }
                  let startElement: HTMLInputElement = args.element.querySelector('#StartTime') as HTMLInputElement;
                  if (!startElement.classList.contains('e-datetimepicker')) {
                      new DateTimePicker({ value: new Date(startElement.value) || new Date() }, startElement);
                  }
                  let endElement: HTMLInputElement = args.element.querySelector('#EndTime') as HTMLInputElement;
                  if (!endElement.classList.contains('e-datetimepicker')) {
                      new DateTimePicker({ value: new Date(endElement.value) || new Date() }, endElement);
                  }
              }
          },
        });
        scheduleObj.appendTo('#Schedule');
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

