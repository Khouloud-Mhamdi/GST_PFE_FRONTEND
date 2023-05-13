import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  idUser :any;
  showConfirmationDialog = false ;
  constructor(private titleService: Title,private token: TokenStorageService,  private router : Router ,private reservationService : ReservationService) { }

  ngOnInit(): void {
    this.titleService.setTitle('GST-Liste des réservations');
    this.currentUser = this.token.getUser();
    this.reservationService.getReservtionsByAdherent(this.currentUser.id).subscribe(data=>{

      this.reservations=data;
    })

  }
  annuler()
  { this.reservationService.annulerReservatiion(this.idUser).subscribe((data)=> {
    this.reservationService.getReservtionsByAdherent(this.currentUser.id).subscribe(data=>{

      this.reservations=data;
    })
  });this.showConfirmationDialog = false; }
  openConfirmationDialog(id : any ){
    this.idUser=id;
    this.showConfirmationDialog = true;
  }

  closeConfirmationDialog(){
    this.showConfirmationDialog = false;
  }

}
