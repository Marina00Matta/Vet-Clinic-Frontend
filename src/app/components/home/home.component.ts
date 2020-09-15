import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../../Service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  service: Service;

  constructor(private http: HttpClient,private token:TokenService) {}

  ngOnInit() 
  {
    this.http.get('http://localhost:8000/api/services').subscribe((data:any) => {
      this.service = data.data;
    });

    // if (!localStorage.getItem('foo')) { 
    //   localStorage.setItem('foo', 'no reload') 
    //   location.reload() 
    //   } else {
    //   localStorage.removeItem('foo') 
    //   } 
  }
  
    // hack : scroll to top after rendering component
    ngAfterViewInit() {
      let top = document.getElementById('top');
      if(top !=null) {
        top.scrollIntoView();
        top=null
      }
  }
  
}
