import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { ReservationService } from 'src/app/services/reservation.service';
=======
>>>>>>> aab9f3c86a130e994808813cc7acaf6267897270

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


  goToNextPage(id : any ) {
    this.router.navigate([`/reservation/${id}`]);
   }

}
