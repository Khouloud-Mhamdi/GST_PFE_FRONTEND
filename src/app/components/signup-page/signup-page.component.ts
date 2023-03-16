import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  signupForm !: FormGroup ; 
  constructor(private titleService: Title , private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.titleService.setTitle('Créer compte');
    this.signupForm = this.formBuilder.group({
      nom : ["", [Validators.required, Validators.minLength(3)]], 
      prenom : ["", [Validators.required , Validators.minLength(3)]], 
      email : ["", [Validators.email,Validators.required]],
      password : ["", [Validators.required , Validators.minLength(5) , Validators.maxLength(10)]], 
      confirm : ["" , Validators.required]
     });
  }
  signup(){
    console.log("test : ", this.signupForm.value.prenom)
   this.signupForm.reset();
   alert("compte crée avec succée ! ");
  }
}
