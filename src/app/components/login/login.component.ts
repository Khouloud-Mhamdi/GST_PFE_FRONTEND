import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup ;
  title: string = "Login";
  user: any = {};

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  role !: string ;
  
  connect = false ;
  erreur = false ;
  constructor(private titleService: Title ,private formBuilder : FormBuilder ,   private authService: AuthService,
  private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
    }
    this.titleService.setTitle('GST-Se connecter');
    this.loginForm = this.formBuilder.group({
      email : ["", [Validators.email]],
      password : ["", [Validators.required ]],
     });
  }
  login ()
  {
    
    console.log("This is my user : ", this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        console.log("here data after login", data);
        console.log("here data after login", data);

        this.tokenStorage.saveToken(data.accessToken);
       // console.log("Here decoded token", this.getDecodedAccessToken(data.accessToken));

        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().role;
        this.router.navigate([""]);
      },
      (err) => {
        console.log("here error after login", err);
        this.erreur= true ;
        setTimeout(() => {
         this.erreur = false;
       }, 3000); // 3000 ms = 3 secondes
        // this.errorMessage = err.error.message;
        // this.isLoginFailed = true;
      }
    );
  }

}
