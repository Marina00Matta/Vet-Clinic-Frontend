import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/Service';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  service: Service;

  constructor(private http: HttpClient) { }

  ngOnInit(): void 
  {
    this.http.get('http://localhost:8000/api/services').subscribe((data: any) => {
      this.service = data.data;
    });
  }

}
