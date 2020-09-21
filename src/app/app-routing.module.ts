import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleComponent } from './components/single/single.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { AppComponent } from './app.component';
import { PetComponent } from './components/pet/pet.component';
import { BoardingComponent } from './components/boarding/boarding.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { SchedulesComponent } from './schedules/schedules.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: ':service/:id',
    component: SingleComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'signup',
    component: RegisterComponent,
    canActivate:[BeforeLoginService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate :[BeforeLoginService]
  },
  {
    path: 'calender',
    component: CalendarComponent
  },
  {
    path: 'schedule',
    component: SchedulesComponent
  },
  {
    path: 'reservation/:service/:id',
    component: ReservationComponent,
    canActivate:[AfterLoginService]
  },
  {
    path: 'reservations/:id',
    component: BoardingComponent,
    canActivate:[AfterLoginService]
  },
  {
    path:'pet',
    component:PetComponent,
    canActivate:[AfterLoginService]
  },
  {
    path:'boarding',
    component:BoardingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
