import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-one-event',
  templateUrl: './one-event.component.html',
  styleUrls: ['./one-event.component.css']
})
export class OneEventComponent implements OnInit {
  @Input() eventInput : any ; 
  constructor(private titleService: Title,public eventService : EventService , private router:Router  ) { }

  ngOnInit(): void {
   
  }
   goToDisplay(id : any ) {
    this.router.navigate([`eventInfo/${id}`]); 
   }
}
