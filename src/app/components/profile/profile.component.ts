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
  valid=false;
  constructor(private token: TokenStorageService , private authService : AuthService , private router : Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser.id);

    this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {this.user = data;});
    this.user.id = this.currentUser.id ;


  }
  EditCurrentUser() {
    if ((!this.controleSaisieNom()) || (!this.controleSaisiePrénom()) || (!this.controleSaisieEmail())) {
      // Handle input errors
      this.valid = true;
      this.showConfirmationDialog = false;
      setTimeout(() => {
        this.valid = false;
      }, 3000);
    } else {
      // Check if email exists
      if (this.user.email !== this.currentUser.email) {
        this.authService.ExistEmail(this.user.email).subscribe((exist: boolean) => {
          if (exist === true) {
            // Handle email already exists error
            console.log("valeur ", exist)
            this.showConfirmationDialog = false;
            this.erreur = true;
            setTimeout(() => {
              this.erreur = false;
            }, 4000);
          } else {
            // Update user
            this.showConfirmationDialog = false;
            this.authService.updateUser(this.user).subscribe(
              (data) => {
                console.log('here updated user: ', data);
                this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {
                  this.user = data;
                });
                this.update = true;
                setTimeout(() => {
                  this.update = false;
                }, 3000); // 3000 ms = 3 secondes
              },
              (err) => {
                console.log('probleme !!! ', err);
                this.erreur = true;
                setTimeout(() => {
                  this.erreur = false;
                }, 3000); // 3000 ms = 3 secondes
              }
            );

            // Update currentUser information and save to token
            this.currentUser.firstName = this.user.nom;
            this.currentUser.lastName = this.user.prenom;
            this.currentUser.email = this.user.email;
            this.token.saveUser(this.currentUser);
            this.closeConfirmationDialog();
          }
        });
      } else {
        // Update user
        this.showConfirmationDialog = false;
        this.authService.updateUser(this.user).subscribe(
          (data) => {
            console.log('here updated user: ', data);
            this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {
              this.user = data;
            });
            this.update = true;
            setTimeout(() => {
              this.update = false;
            }, 3000); // 3000 ms = 3 secondes
          },
          (err) => {
            console.log('probleme !!! ', err);
            this.erreur = true;
            setTimeout(() => {
              this.erreur = false;
            }, 3000); // 3000 ms = 3 secondes
          }
        );

        // Update currentUser information and save to token
        this.currentUser.firstName = this.user.nom;
        this.currentUser.lastName = this.user.prenom;
        this.token.saveUser(this.currentUser);
        this.closeConfirmationDialog();
      }
    }
  }

   controleSaisieNom(): boolean {

    const nomInput = document.getElementById("nom") as HTMLInputElement;
    console.log(nomInput);
    const regex =/^[a-zA-Z]{3,}$/ ;
    if (!regex.test(this.user.nom)) {
      nomInput.classList.add("invalid");

      return false;
    } else {
      nomInput.classList.remove("invalid");
      return true;
    }
  }
  controleSaisiePrénom(): boolean {

    const nomInput = document.getElementById("prenom") as HTMLInputElement;

    const regex =/^[a-zA-Z]{3,}$/ ;
    if (!regex.test(this.user.prenom)) {
      nomInput.classList.add("invalid");

      return false;
    } else {
      nomInput.classList.remove("invalid");
      return true;
    }
  }
  controleSaisieEmail(): boolean {

    const nomInput = document.getElementById("email") as HTMLInputElement;
    console.log(nomInput);
    const regex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ ;
    if (!regex.test(this.user.email)) {
      nomInput.classList.add("invalid");

      return false;
    } else {
      nomInput.classList.remove("invalid");
      return true;
    }}
   closeConfirmationDialog(){
    this.showConfirmationDialog = false;
    this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {this.user = data;});
   }
   openConfirmationDialog(){
    this.showConfirmationDialog = true;
   }
}
