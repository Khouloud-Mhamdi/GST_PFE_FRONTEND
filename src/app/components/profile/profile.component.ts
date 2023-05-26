import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { mustMatch } from 'src/app/validators/mustMatch';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  PasswordForm !:  FormGroup <any>;
  user : any = {};
  showConfirmationDialog = false ;
  showModalPassword = false ;
  update = false ;
  erreur = false ;
  valid=false;
  faute = false ;
  afficheDiscipline = false ;
  changerPassword=false;
  updatedPassword=false;
  disciplines : any ;
  long:any;
  Password ={
    email: String,
    password: String
  }
  constructor(private titleService: Title,private token: TokenStorageService , private authService : AuthService , private router : Router,private formBuilder :FormBuilder) { }

  ngOnInit(): void {
    this.titleService.setTitle('GST-Profil');
    this.currentUser = this.token.getUser();
    this.PasswordForm= this.formBuilder.group({

      OldPassword : ["", [Validators.required]],
      NewPassword :["", [Validators.required ,Validators.minLength(5)]],
      ConfirmPassword : ["", [Validators.required]]
     },
     {
      validator: mustMatch("NewPassword", "ConfirmPassword"),
     }
     );

    this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {this.user = data;});
    this.user.id = this.currentUser.id ;

   this.afficherDisciplines() ;
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
            }, 7000);
          },
          (err) => {
            console.log('probleme !!! ', err);
            this.erreur = true;
            setTimeout(() => {
              this.erreur = false;
            }, 7000);
          }
        );

        // Update currentUser information and save to token
        this.currentUser.firstName = this.user.nom;
        this.currentUser.lastName = this.user.prenom;
        this.token.saveUser(this.currentUser);
        this.closeConfirmationDialog();
        window.scrollTo(0, 0);
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
   afficherDisciplines () {
       this.authService.getDisciplineByUserId(this.currentUser.id).subscribe(
        (data) => {
          console.log ("liste de disciplines : " , data ) ;
          this.disciplines = data ;
          if (this.disciplines.length === 0) {
            console.log("La liste de disciplines est vide.");
            this.afficheDiscipline = false ;
          } else {
            console.log("La liste de disciplines n'est pas vide.");
            this.afficheDiscipline = true ;
          }
        }
       );
   }
   UpdatePasswordUser()
{
    
    this.Password.email=this.user.email;
    this.Password.password=this.PasswordForm.value.OldPassword;
    this.long=this.PasswordForm.value.NewPassword.length;
    console.log(this.long)
   if(!this.PasswordForm.value.NewPassword || !this.PasswordForm.value.OldPassword ||!(this.PasswordForm.value.NewPassword===this.PasswordForm.value.ConfirmPassword)||!(this.long>4))
 {this.faute = true;
            setTimeout(() => {
              this.faute= false;
            }, 5000);
 }
  else
  {
    this.authService.ModifierPassword(this.Password).subscribe(
      (authenticated: boolean) => {
        if (authenticated) {
          console.log('Utilisateur authentifié');

          this.authService.changerMotDePasse(this.user.id,this.PasswordForm.value.NewPassword).subscribe(
            (exist: boolean) => {
              if (exist)
              {
                this.updatedPassword=true;
                setTimeout(() => {
                  this.updatedPassword = false;
                }, 5000);

                } else {

                  this.changerPassword=true;
                  console.log(this.changerPassword);
                    setTimeout(() => {
                      this.changerPassword = false;
                    }, 5000);
                }
       },
          )
        }
      },
      (error) => {
        console.error('Erreur lors de l\'authentification', error);
        this.changerPassword=true;

                    setTimeout(() => {
                      this.changerPassword = false;
                    }, 5000);
      }
    );
  }
}
closeModal(){
  this.PasswordForm.reset();
  this.showModalPassword = false;
  
 }
 openModal(){
  this.showModalPassword = true;
 }
}
