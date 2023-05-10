import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-valider-reservation',
  templateUrl: './valider-reservation.component.html',
  styleUrls: ['./valider-reservation.component.css']
})
export class ValiderReservationComponent implements OnInit {

  constructor(private router : Router ) { }

  ngOnInit(): void {
  }
  retourReservation(){
    this.router.navigate(['reservation']);
  }
}
