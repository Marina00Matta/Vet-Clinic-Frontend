import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Service } from '../../Service';
import {Router,ActivatedRoute} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})

export class SingleComponent implements OnInit {
  public loggedIn :boolean
  service: Service;

  constructor(private auth :AuthService ,private http: HttpClient, private route: ActivatedRoute,private router: Router){}

  ngOnInit(): void 
  {   
    var idString = this.route.snapshot.url[1].path;
    var idInteger  = +idString ;
    var service_name = window.location.pathname.split("/")[1].replace(/%20/g,' ');
    localStorage.setItem('service_name', service_name);

    this.auth.authStatus.subscribe(value=>this.loggedIn=value)
 
    this.http.get('http://localhost:8000/api/services/'+idInteger).subscribe((data: any) => {
      this.service = data.data;
    });  
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
