import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  signupForm !: FormGroup ;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";
  register = false ;
  erreur = false ;
  constructor(private titleService: Title , private formBuilder : FormBuilder ,  private authService: AuthService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Créer compte');
    this.signupForm = this.formBuilder.group({

      password : ["", [Validators.required , Validators.minLength(5) , Validators.maxLength(20)]],
      confirm : ["" , Validators.required]
     });
  }
  signup(){
    /*console.log("test : ", this.signupForm.value.prenom)
   this.signupForm.reset();
   alert("compte crée avec succée ! ");*/
   console.log(this.signupForm.value);
   this.signupForm.value.role = "user";
   this.authService.register(this.signupForm.value).subscribe(
     (data) => {
       console.log(data);
       this.isSuccessful = true;
       this.isSignUpFailed = false;
       this.register= true ;
       setTimeout(() => {
        this.register = false;
      }, 3000); // 3000 ms = 3 secondes

     },
     (err) => {
       this.isSignUpFailed = true;
       console.log("here error from BE", err);
       this.errorMessage = err.error.message;
       console.log("this.errorMessage ", this.errorMessage );
       this.erreur= true ;
       setTimeout(() => {
        this.erreur = false;
      }, 3000); // 3000 ms = 3 secondes

     }

   );
   this.signupForm.reset();
  }


}
