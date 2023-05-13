import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // import the interaction plugin
import dayGridPlugin from '@fullcalendar/daygrid';
import { format } from 'date-fns';
import { ReservationService } from 'src/app/services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor(private titleService: Title,private reservationService : ReservationService ,private router: Router , private activatedRoute : ActivatedRoute ) { }
  //selectedHoraire : any ;
 
  selectedHoraires: any[] = [];
  id_terrain : any ; 
  dateClicked : any
  horairesNonDispo: string[][] = [];
  oneEvent = {
    title : '' ,
    start : '' ,
    color : '' ,
  }
  Myobj = {
    selectedHoraires:[
      { horaire: '-', autrePropriete: '-' }
    ], 
    id_terrain: '',
    dateClicked:''
  };
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
    this.reservationService.getReservationsByDate(this.oneEvent.start ,this.id_terrain ).subscribe(
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

    this.titleService.setTitle('GST-Réserver un terrain');
    console.log(this.horaires) ; 
    this.id_terrain = this.activatedRoute.snapshot.paramMap.get("id"); 
    console.log("id terrain est : " , this.id_terrain) ; 
   
  }
  onCheckboxSelectionne(event: any, horaire: any) {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.selectedHoraires.push(horaire);
    } else {
      const index = this.selectedHoraires.findIndex((h: any) => h.hdebut === horaire.hdebut && h.hfin === horaire.hfin);
      if (index !== -1) {
        this.selectedHoraires.splice(index, 1);
      }
    }
    console.log(this.selectedHoraires);
  }

  



  isHoraireDisponible(horaire: any): boolean {
    // Vérifier si l'horaire est dans la liste des horaires non disponibles
    const horaireNonDispo = this.horairesNonDispo.find(h => h[0] == horaire.hdebut && h[1] == horaire.hfin);
    return !horaireNonDispo;
 }
 passer() {
  this.Myobj.id_terrain = this.id_terrain ; 
  this.Myobj.selectedHoraires = this.selectedHoraires ; 
  this.Myobj.dateClicked = this.oneEvent.start ; 
  let objStr = JSON.stringify(this.Myobj);
  sessionStorage.setItem('reservation', objStr);
  this.router.navigate(['/Validation']);
 }
 retour() {
  this.router.navigate(['selection']) ; 
 }
 
}

