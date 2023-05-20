import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
   eventsTab :any = [];
  constructor(private titleService: Title , public eventService : EventService  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('GST-Evénements');
    this.getData() ;
  }
  getData() {
    this.eventService.getAll().subscribe(
      response =>{this.eventService.listData = response;}
     );

  }

}
