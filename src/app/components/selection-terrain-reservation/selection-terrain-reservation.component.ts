import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-selection-terrain-reservation',
  templateUrl: './selection-terrain-reservation.component.html',
  styleUrls: ['./selection-terrain-reservation.component.css']
})
export class SelectionTerrainReservationComponent implements OnInit {


  constructor(private titleService: Title ,private reservationService : ReservationService ,private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('GST-Réserver un terrain');
  }
  passer() {
    this.router.navigate(['/ListeRéservations']);
   }


  goToNextPage(id : any ) {
    this.router.navigate([`/reservation/${id}`]);
   }

}
