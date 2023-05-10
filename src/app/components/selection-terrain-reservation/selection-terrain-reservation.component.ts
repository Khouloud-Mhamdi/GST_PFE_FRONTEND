import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-terrain-reservation',
  templateUrl: './selection-terrain-reservation.component.html',
  styleUrls: ['./selection-terrain-reservation.component.css']
})
export class SelectionTerrainReservationComponent implements OnInit {

  constructor(private router : Router ) { }

  ngOnInit(): void {
  }
  goToNextPage(id : any ) {
    this.router.navigate([`/reservation/${id}`]); 
   }
}
