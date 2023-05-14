import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { mustMatch } from 'src/app/validators/mustMatch';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  signupForm !: FormGroup ;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";
  register = false ;
  erreur = false ;
  valid = false ;
  showConfirmationDialog = false;
  constructor(private titleService: Title , private formBuilder : FormBuilder , private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.titleService.setTitle('GST-Créer compte');
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName : ["", [Validators.required , Validators.minLength(3)]],
      email : ["", [Validators.email,Validators.required]],
      password : ["", [Validators.required , Validators.minLength(5) , Validators.maxLength(20)]],
      confirm : ["" , Validators.required]
     },
     {
      validator: mustMatch("password", "confirm"),
     }
     );
  }
  signup(){
    /*console.log("test : ", this.signupForm.value.prenom)
   this.signupForm.reset();
   alert("compte crée avec succée ! ");*/
   if((!this.controleSaisieNom())||(!this.controleSaisiePrénom())||(!this.controleSaisieEmail()))
    {this.valid=true;
      console.log("controle saisie",this.valid);
      setTimeout(() => {
        this.valid = false;
      }, 3000);

  }
    else{
      this.authService.ExistEmail(this.signupForm.value.email).subscribe(
        (exist:boolean) => {
          if (exist === true )
          {this.erreur=true; console.log("mail exise",exist);

            setTimeout(() => {
              this.erreur = false;
            }, 4000);}
          }

      )

   console.log(this.signupForm.value);
   this.signupForm.value.role = "user";
   this.authService.register(this.signupForm.value).subscribe(
     (data) => {
       console.log(data);
       this.isSuccessful = true;
       this.isSignUpFailed = false;

       this.openConfirmationDialog();
       this.signupForm.reset();


     },
     (err) => {
       this.isSignUpFailed = true;
       console.log("here error from BE", err);
       this.errorMessage = err.error.message;
       console.log("this.errorMessage ", this.errorMessage );
       this.valid= true ;
       setTimeout(() => {
        this.valid = false;
      }, 3000); // 3000 ms = 3 secondes

     }

   );
    }
  }
  controleSaisieNom(): boolean {

    const nomInput = document.getElementById("firstName") as HTMLInputElement;
    console.log(nomInput);
    const regex = /^[a-zA-Z\s]{3,}$/;
    if (!regex.test(this.signupForm.value.firstName)) {
      nomInput.classList.add("invalid");

      return false;
    } else {
      nomInput.classList.remove("invalid");
      return true;
    }
  }
  controleSaisiePrénom(): boolean {

    const nomInput = document.getElementById("lastName") as HTMLInputElement;
    console.log(nomInput);
    const regex = /^[a-zA-Z\s]{3,}$/;
    if (!regex.test(this.signupForm.value.lastName)) {
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
    if (!regex.test(this.signupForm.value.email)) {
      nomInput.classList.add("invalid");

      return false;
    } else {
      nomInput.classList.remove("invalid");
      return true;
    }
  }

  openConfirmationDialog() {

    this.showConfirmationDialog = true;
  }
  closeConfirmationDialog() {
    this.showConfirmationDialog = false;
    this.router.navigate(['/Login']);
  }

}
