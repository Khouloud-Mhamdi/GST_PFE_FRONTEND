import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup ; 
  constructor(private titleService: Title ,private formBuilder : FormBuilder ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Se connecter');
    this.loginForm = this.formBuilder.group({
      email : ["", [Validators.email]],
      password : ["", [Validators.required ]], 
     });
  }
  login () 
  {

  }

}
