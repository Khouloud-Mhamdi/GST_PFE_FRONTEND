import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-one-event',
  templateUrl: './one-event.component.html',
  styleUrls: ['./one-event.component.css']
})
export class OneEventComponent implements OnInit {
  @Input() eventInput : any ; 
  public  event : any ;
  constructor(public eventService : EventService , private router:Router  ) { }
  dataEvent = {
    id : 0 , 
    titre : '' , 
    description : '' , 
    lieu : '' , 
    date : '' ,
    nb_consultation: 0
  }
  ngOnInit(): void {
  }
  goToDisplay(id: any) {
    this.router.navigate([`eventInfo/${id}`]); 
    this.eventService.getData(id).subscribe((data) => {
      this.event = data;
      console.log(data);
      
      this.dataEvent.id = id;
      this.dataEvent.titre = this.event.titre;
      this.dataEvent.lieu = this.event.lieu;
      this.dataEvent.description = this.event.description;
      this.dataEvent.date = this.event.date;
      this.dataEvent.nb_consultation = this.event.nb_consultation + 1;
  
      this.eventService.updatEvent(this.dataEvent).subscribe((data) => {
        console.log("Mise à jour réussie !");
        console.log(data);
      },
      (error) => {
        console.log("Impossible de mettre à jour l'événement !");
        console.log(error);
      });
    });
  }
  
}
