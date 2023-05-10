import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // import the interaction plugin
import dayGridPlugin from '@fullcalendar/daygrid';
import { format } from 'date-fns';
import { ReservationService } from 'src/app/services/reservation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor(private reservationService : ReservationService ,private router: Router  ) { }
  selectedHoraire: any;
  horairesNonDispo: string[][] = [];
  dateClicked : any
  oneEvent = {
    title : '' ,
    start : '' ,
    color : '' ,
  }
  horaires : any =[
    {hdebut:'08:00' , hfin:'09:00'} , 
    {hdebut:'09:00' , hfin:'10:00'} , 
    {hdebut:'10:00' , hfin:'11:00'} , 
    {hdebut:'11:00' , hfin:'12:00'} , 
    {hdebut:'12:00' , hfin:'13:00'} , 
    {hdebut:'13:00' , hfin:'14:00'} , 
    {hdebut:'14:00' , hfin:'15:00'} , 
    {hdebut:'15:00' , hfin:'16:00'} , 
    {hdebut:'16:00' , hfin:'17:00'} , 
    {hdebut:'17:00' , hfin:'18:00'} , 
    {hdebut:'18:00' , hfin:'19:00'} , 
    {hdebut:'19:00' , hfin:'20:00'} , 
  ]
  calendarEvents: any  = [];
  events:any = [
    {title : 'Present' , start :'2023-03-01' , color:'#0000FF' },
    {title : 'Present' , start :'2023-03-03' , color:'#FF0000' },
    {title : 'Absent' , start :'2023-03-10' , color:'#FF0000' },
    {title : 'En attente' , start :'2023-05-04' , color:'#EFBA77' },
  ];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin ],
    initialView: 'dayGridMonth',
    weekends: false , // initial value
    events: this.events ,
    eventClick : this.handleDateClick.bind(this),// your event array
    selectable: true,
    select: this.handleDateSelect.bind(this)

  };

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
  handleDateClick(arg : any ) {
   console.log(arg) ;
   //console.log(arg.event.start) ;
   //console.log(arg.event.start.toISOString().substr(0, 10));
   const dateStr = format(arg.event.start, 'yyyy-MM-dd');
   console.log(dateStr);
  }
  handleDateSelect(selectInfo:any ) {
    console.log(selectInfo.startStr);
    this.oneEvent.title = 'Attente' ;
    this.oneEvent.color = '#EFBA77';
    this.oneEvent.start = selectInfo.startStr;
    this.events.push(this.oneEvent);
    console.log(this.events) ;
    this.reservationService.getReservationsByDate(this.oneEvent.start ,5 ).subscribe(
      data => {
        this.horairesNonDispo = data;
        console.log('Horaires récupérés avec succès:', this.horairesNonDispo);
      },
      error => {
        console.log('Une erreur est survenue lors de la récupération des horaires:', error);
      }
    );

   
    

     
    }
  ngOnInit(): void {

    const date = new Date('2023-05-12');
    console.log(this.horaires) ; 
   
  }
  /*onHoraireSelectionne(horaire: any) {
    this.selectedHoraire = horaire;
    console.log(this.selectedHoraire); // Afficher la valeur sélectionnée dans la console
}*/
onHoraireSelectionne() {
  console.log(this.selectedHoraire); // Afficher l'objet horaire sélectionné dans la console
}
 
  isHoraireDisponible(horaire: any): boolean {
    // Vérifier si l'horaire est dans la liste des horaires non disponibles
    const horaireNonDispo = this.horairesNonDispo.find(h => h[0] == horaire.hdebut && h[1] == horaire.hfin);
    return !horaireNonDispo;
 }
 passer() {
  this.router.navigate(['/Validation']);
 }
}

