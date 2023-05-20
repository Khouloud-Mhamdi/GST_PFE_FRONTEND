import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  ForgetPasswordForm !: FormGroup ;
  title: string = "Login";
  user: any = {};
  vide=false;


  errorMessage = "";


  verrif = false ;
  erreur = false ;
  constructor(private titleService: Title ,private formBuilder : FormBuilder ,   private authService: AuthService,
  private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {

    this.titleService.setTitle('GST-Mot de passe oublié');
    this.ForgetPasswordForm = this.formBuilder.group({
      email : ["", [Validators.email,Validators.required]]


     });
  }
   forgetPassword()
  {
    if (this.ForgetPasswordForm.invalid) {
      this.ForgetPasswordForm.markAllAsTouched();
      return;
    }

    if(this.ForgetPasswordForm.value.email==="")
    {
      this.vide=true;
      setTimeout(() => {
        this.vide = false;
      }, 3000);
    }
    console.log(this.ForgetPasswordForm.value.email);
    this.authService.forgetPassword(this.ForgetPasswordForm.value.email).subscribe(
      (exist: boolean) => {
        if (exist === true )
        {this.verrif=true;
          setTimeout(() => {
            this.verrif = false;
          }, 4000);}

          else{
            this.erreur=true;
          setTimeout(() => {
            this.erreur = false;
          }, 3000);}

      },

    );
  }


}
