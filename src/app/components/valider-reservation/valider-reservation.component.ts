import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-valider-reservation',
  templateUrl: './valider-reservation.component.html',
  styleUrls: ['./valider-reservation.component.css']
})
export class ValiderReservationComponent implements OnInit {
  confirm = false ; 
  afficheButton = true ; 
  showConfirmationDialog = false ; 
  user : any ; 
  reservation = {
    date :'' , 
    hdebut : '' , 
    hfin : '' , 
    status : '' , 
  } ; 
  obj : any = {} ; 
  constructor(private titleService: Title,private router : Router , private reservationService : ReservationService  , private token : TokenStorageService) { }
  
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.afficheButton = true ; 
    window.scrollTo(0, 0);
    this.titleService.setTitle('GST-Réserver un terrain');
    let objStr = sessionStorage.getItem('reservation');
    if (objStr !== null) {
     this.obj  = JSON.parse(objStr);
      console.log("voilaaa: " , this.obj ) ; 
    }
    this.user = this.token.getUser() ; 
   
  }
  annuler(){
    this.router.navigate(["/selection"]); 
  }
  retourReservation(){
    this.router.navigate([`/reservation/${this.obj.id_terrain}`]); 
  }
  addReservation() {
    for (let i = 0; i < this.obj.selectedHoraires.length; i++) {
      let objet = this.obj.selectedHoraires[i];
      console.log ("ligne du tab : " , objet ) ; 
      this.reservation.hdebut = objet.hdebut  ; 
      this.reservation.hfin = objet.hfin ; 
      this.reservation.status = "en attente" ; 
      this.reservation.date = this.obj.dateClicked ; 
      this.reservationService.addReservation(this.reservation , this.user.id , this.obj.id_terrain).subscribe(
        (data) => {
          console.log('Reservation ajouté avec succée!  ', data);
          this.confirm = true ; 
          this.afficheButton = false ; 
          setTimeout(() => {
            this.confirm = false  ; 
           // this.router.navigate(["/selection"]); 
          }, 3000);
        },(err) => {
          console.log("here error from BE", err);
        }
        );
    }
    this.closeConfirmationDialog() ; 
  }
  openConfirmationDialog(){
    this.showConfirmationDialog = true;
  }

  closeConfirmationDialog(){
    this.showConfirmationDialog = false;
  }
}
