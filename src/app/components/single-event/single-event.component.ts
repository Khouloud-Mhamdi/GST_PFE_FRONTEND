import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.css']
})
export class SingleEventComponent implements OnInit {
  id : any ; 
 public  event : any ;
 
 
  constructor(private titleService: Title , private activatedRoute : ActivatedRoute , public eventService : EventService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Page evenement');
    this.id = this.activatedRoute.snapshot.paramMap.get("id"); 
    this.eventService.getData(this.id).subscribe((data)=> {this.event = data;console.log(data); }) 
    ; 
   
    
  } 
  
  
  /*this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {this.user = data;});*/ 

}
