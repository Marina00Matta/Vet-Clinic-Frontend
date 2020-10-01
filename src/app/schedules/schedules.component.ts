import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { getMinutes } from 'date-fns';
import { ScheduleService } from 'src/app/services/schedule.service';
import { TokenService } from 'src/app/services/token.service';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { PetsService } from 'src/app/services/pets.service';
import { WorkHoursModel } from '@syncfusion/ej2-angular-schedule';
import { NgForm } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { CheckBoxSelectionService, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import {EventSettingsModel, View, EventRenderedArgs, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { Router,ActivatedRoute } from '@angular/router';
// import { start } from 'repl';




@Component({
  selector: 'app-schedules',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, CheckBoxSelectionService,
    ResizeService, DragAndDropService],
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss'],
  encapsulation: ViewEncapsulation.None,

})


export class SchedulesComponent implements OnInit {

  public CurrentDate;
  public AppointmentSettings: any;
  public scheduleObj: ScheduleComponent;
  public  pet;
  public service: { [key: string]: Object }[];;
  public date;
  public time;
  public obj;
  public visit:any = [];
  public eventSettings:EventSettingsModel ;
  public startHour: string;
  public endHour: string;
  public workHours: WorkHoursModel = { highlight: false };
  public scheduleView: View = 'WorkWeek';
  public workDays: number[] ;
  public showWeekend: boolean = false;
  constructor(private ScheduleService: ScheduleService, private token :TokenService,
     private pets : PetsService, private services : ServicesService, private router: Router,
     private appointment : AppointmentService) {
    
  }

  
  //to get logged user
  user_name = localStorage.getItem('user_name');
  my_token = this.token.get();
  decoded = this.token.getTokenPayload(this.my_token);
  client_id = this.decoded.sub;

  //to get all pets
  ngOnInit(): void {
    this.appointment.getAppointments().subscribe(
      (data: any)=>{
        console.log('appointments',data.data);
        this.startHour = data.data[0].start_time.slice(0, 5);
        this.endHour = data.data[0].end_time.slice(0, 5);
        // this
        // this.startHour = '12:00';
        // this.endHour = '18:00';
        console.log(this.startHour);
        console.log(this.endHour);
        var y= [];
        for (let x in data.data){
          var day = data.data[x].day;
          y.push(day);
        }
        this.workDays = y;  
        console.log(this.workDays);  
      }
    );
   this.services.getServices().subscribe(
    (data: any)=>{
      console.log('service',data.data);
      this.service = data.data;
      // this.vegetableData= this.service;
    });

    this.pets.getPetsByUser(this.client_id).subscribe(
        (data: any)=>{
          console.log('pets',data.data);
          this.pet = data.data;
        });
    this.ScheduleService.showVisits(this.client_id).subscribe(
      (data: any)=>{
        console.log('visits',data.data);
        for (let x in data.data){
          var date = data.data[x].date;
          var time = data.data[x].time;
          var datetime = date+' '+time;
          console.log(datetime);
          var y= {
          Id: data.data[x].id,
          Subject: data.data[x].status,
          StartTime: new Date(datetime),
          EndTime: new Date(datetime),
          // IsBlock: true
          };
        this.visit.push(y);
        console.log(this.visit);
        }      
      });
      this.ScheduleService.getAllVisits(this.client_id).subscribe(
          (data: any)=>{
            console.log('all visits',data.data);
            for (let x in data.data){
              var date = data.data[x].date;
              var time = data.data[x].time;
              var datetime = date+' '+time;
              console.log(datetime);        
              var y= {
                    Id: data.data[x].id,
                    Subject: 'Not Available',
                    StartTime: new Date(datetime),
                    EndTime: new Date(datetime),
                    IsBlock: true 
                 };         
              this.visit.push(y);              
            }  
            console.log('all visits',this.visit);
            this.eventSettings = {dataSource:this.visit};  
            console.log('eventdata',this.eventSettings); 
      });                           
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  }

  public fields: Object = {  text: 'service_name', value: 'id' };
  public height: string = '200px';
  public placeholder: string = 'Select service';

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
            status : 'Pending',
            services : form.value.services
        }
        this.ScheduleService.setVisit(this.obj).subscribe((res)=>this.handleResponse(res))
        
      // console.log(res);
      

        console.log(this.obj);
        };
        
    handleResponse(res){
          this.token.handle(this.my_token)
          // localStorage.setItem('reservation_id', data.reservation_id)
          //   if(this.service_name == 'Boarding')
          //   {
          //     this.router.navigateByUrl('/boarding');
          //   }
          //   else
          //   {
              alert('Reservation made successfully');
              this.router.navigateByUrl('/home');
            // }
        }
        
        // localStorage.setItem('pet_id', form.value.pet_id);
        // localStorage.setItem('reservation_date', this.form.date);
    }

    
 



// args.data[0].EndTime.getDate()
// args.data[0].StartTime.getUTCDate()
// getMonth()
// getFullYear()
// getDate()
// (args.data[0].EndTime.getDate(),args.data[0].EndTime.getMonth(),args.data[0].EndTime.getFullYear())

