import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-liste-reservations',
  templateUrl: './liste-reservations.component.html',
  styleUrls: ['./liste-reservations.component.css']
})
export class ListeReservationsComponent implements OnInit {
  currentUser: any;
  reservations:any;
  constructor(private token: TokenStorageService,  private router : Router ,private reservationService : ReservationService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.reservationService.getReservtionsByAdherent(this.currentUser.id).subscribe(data=>{
    
      this.reservations=data;
    })

  }
  annuler(id : any)
  { this.reservationService.annulerReservatiion(id).subscribe((data)=> {
    this.reservationService.getReservtionsByAdherent(this.currentUser.id).subscribe(data=>{
    
      this.reservations=data;
    })
  }) }

}
