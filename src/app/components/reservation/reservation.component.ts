import { Component, OnInit } from '@angular/core';

import { FullCalendarComponent } from '@fullcalendar/angular';




@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  calendarOptions: any;

  constructor() { }


  ngOnInit(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [
        {
          id: '1',
          title: 'Terrain 1 - Réservation 1',
          start: '2023-04-25T10:00:00',
          end: '2023-04-25T12:00:00'
        },
        {
          id: '2',
          title: 'Terrain 2 - Réservation 1',
          start: '2023-04-27T14:00:00',
          end: '2023-04-27T16:00:00'
        }
      ],
      eventClick: this.handleEventClick.bind(this)
    };
  }
  handleEventClick() {
    // Handle event click
  }

}
