import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private router: Router, private token : TokenStorageService , public authService :  AuthService) { }

  ngOnInit(): void {
  }
    public isLoggedIn (){
      return this.token.isLoggedIn();
    }
    public LogOut () {
      this.token.signOut();
      this.router.navigate(['']);
    }
    reserver(){
      if(this.isLoggedIn())
      {
        this.router.navigate(['selection']);
      }
      else {
        this.router.navigate(['Login']);
         
      }
    }
    Inscription(){
      if(this.isLoggedIn())
      {
        this.router.navigate(['InscriptionDiscipline']);
      }
      else {
        this.router.navigate(['Login']);
      }
    }
}
