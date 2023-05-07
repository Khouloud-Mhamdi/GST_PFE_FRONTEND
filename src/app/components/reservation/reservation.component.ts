import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // import the interaction plugin
import dayGridPlugin from '@fullcalendar/daygrid';
import { format } from 'date-fns';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor() { }
  oneEvent = {
    title : '' ,
    start : '' ,
    color : '' ,
  }
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

    }
  ngOnInit(): void {


  }

}

