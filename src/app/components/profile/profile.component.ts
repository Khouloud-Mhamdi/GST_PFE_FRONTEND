import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  user : any = {}; 
  showConfirmationDialog = false ; 
  update = false ; 
  erreur = false ; 
  constructor(private token: TokenStorageService , private authService : AuthService , private router : Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser.id);
    this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {this.user = data; console.log(data); } ); 
    
    this.user.id = this.currentUser.id ; 
    
  }
   EditCurrentUser(){
    this.showConfirmationDialog = true;
      this.authService.updateUser(this.user).subscribe(
        (data) => {console.log('here updated user : ' , data);
        this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {this.user = data;}); 
        this.update=true; 
        setTimeout(() => {
          this.update = false;
        }, 3000); // 3000 ms = 3 secondes
       },
        (err) => {console.log('probleme !!! ' , err ) ;
              this.erreur = true ; 
              setTimeout(() => {
                this.erreur = false;
              }, 3000); // 3000 ms = 3 secondes
        
      }
      )
     
      this.currentUser.firstName = this.user.nom ; 
      this.currentUser.lastName = this.user.prenom ; 
      this.currentUser.email = this.user.email ; 
      this.token.saveUser(this.currentUser); 
      this.closeConfirmationDialog(); 
   }
   closeConfirmationDialog(){
    this.showConfirmationDialog = false;
    this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {this.user = data;}); 
   }
   openConfirmationDialog(){
    this.showConfirmationDialog = true;
   }
}
