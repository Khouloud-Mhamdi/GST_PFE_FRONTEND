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
  

  public  event : any ;
  dataEvent = {
    id : 0 ,
    titre : '' ,
    description : '' ,
    lieu : '' ,
    date : '' ,
    heure : '' , 
    nb_consultation: 0
  }

  constructor(private titleService: Title,public eventService : EventService , private router:Router  ) { }


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
      this.dataEvent.heure = this.event.heure ; 
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
