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
  itemsPerPage: number = 2;
  totalPages: number = 1;
  currentPage: number = 1;
  pages: number[] = [];
  displayedReservations: any;
  constructor(private titleService: Title,private token: TokenStorageService,  private router : Router ,private reservationService : ReservationService) { }

  ngOnInit(): void {
    this.titleService.setTitle('GST-Liste des réservations');
    this.currentUser = this.token.getUser();
    this.reservationService.getReservtionsByAdherent(this.currentUser.id).subscribe(data=>{

      this.reservations=data;
      this.Pagination();
    })

  }
  Pagination () : void {
    this.totalPages = Math.ceil(this.reservations.length / this.itemsPerPage);
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    this.displayedReservations = this.getReservationsForPage(this.currentPage);
   }
   getReservationsForPage(page: number): any[] {
    // Calcul des utilisateurs à afficher pour la page donnée.
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.reservations.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    // Changement de la page actuelle.
    this.currentPage = page;
    this.displayedReservations = this.getReservationsForPage(page);
  }

  nextPage(): void {
    // Passage à la page suivante.
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.displayedReservations = this.getReservationsForPage(this.currentPage);
    }
  }

  prevPage(): void {
    // Passage à la page précédente.
    if (this.currentPage > 1) {
      this.currentPage--;
      this.displayedReservations = this.getReservationsForPage(this.currentPage);
    }
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
