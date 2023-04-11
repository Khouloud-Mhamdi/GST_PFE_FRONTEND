import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title , public eventService : EventService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Acceuil');
    this.getData() ; 
  }
  getData() {
    this.eventService.getAll().subscribe(
      response =>{this.eventService.listData = response;}
     );
   
  }
}
