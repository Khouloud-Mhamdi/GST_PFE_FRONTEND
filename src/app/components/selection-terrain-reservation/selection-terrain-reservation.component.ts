import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-selection-terrain-reservation',
  templateUrl: './selection-terrain-reservation.component.html',
  styleUrls: ['./selection-terrain-reservation.component.css']
})
export class SelectionTerrainReservationComponent implements OnInit {

  constructor(private reservationService : ReservationService ,private router: Router) { }

  ngOnInit(): void {
  }
  passer() {
    this.router.navigate(['/ListeRéservations']);
   }

}
