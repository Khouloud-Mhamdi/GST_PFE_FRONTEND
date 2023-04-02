
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { DisciplineService } from 'src/app/services/discipline.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-inscription-discipline',
  templateUrl: './inscription-discipline.component.html',
  styleUrls: ['./inscription-discipline.component.css']
})
export class InscriptionDisciplineComponent implements OnInit {
  
  ValeurMatricule: any ;
  ValeurProfession: any ;
  ValeurNom: any ;
  ValeurPrenom: any ;
  ValeurEmail: any ;
  addFamilleForm !: FormGroup <any> ;
  public disciplines : any ;
  selectedRelation: string = '';
  currentUser: any;
  user:any = {};
  userUpdate:any={};
  userUpdateFamilly:any={};
  userInscrit=false;
  
  placeholderNom1 = "Entrez votre nom";
  placeholderPrenom1 = "Entrez votre prénom";
  placeholderEmail1 = "Entrez votre email";
  placeholderProfession="Entrez votre profession";
  placeholderMatricule="Entrez votre matricule";
  showConfirmationDialog = false ;
  valid=false;
  erreur=false;
  ajout=false;
  update=false;
  stegiste="";

  constructor( private disciplineService : DisciplineService , private token: TokenStorageService ,private authService : AuthService , private router : Router , private formBuilder :FormBuilder  ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {this.user = data; console.log(data); } );
       this.getAllclubs();
       this.addFamilleForm= this.formBuilder.group({
        nom: ["", [Validators.required, Validators.minLength(3)]],
        prenom : ["", [Validators.required , Validators.minLength(3)]],
        email : ["", [Validators.email,Validators.required]],
        relation : ["", [Validators.required]],
        adresse : ["", [Validators.required]],
        date_naissance: ["", [Validators.required]],
        lieu_naissance : [""],
        telephone : ["", [Validators.required]],
        matricule : [""],
        profession : [""],
        stegiste : ["", [Validators.required]],


       }
       );
       console.log(this.currentUser.id) ;
       

       if(this.selectedRelation==='enfant')
       {
      this.addFamilleForm.controls['email'].disable({ emitEvent: false });}
      else if(this.selectedRelation==='adherent')

      { this.addFamilleForm.controls['email'].disable({ emitEvent: false });
      this.addFamilleForm.controls['nom'].disable({ emitEvent: false });
      this.addFamilleForm.controls['prenom'].disable({ emitEvent: false });}
  }
  getAllclubs()
  {
    this.disciplineService.ListerDisciplines().subscribe((data)=>{
    this.disciplines = data ;
    console.log(data);
    })
  }

  onRelationChange(event: any) {
    this.selectedRelation = event.target.value;
    if ((this.selectedRelation ==='adherent')||(this.user.stegiste===null))
    { this.ValeurPrenom = this.user.prenom;
      this.ValeurNom = this.user.nom;
      this.ValeurEmail = this.user.email;
      this.userInscrit=true;
        this.ValeurMatricule=this.user.matricule;
        this.ValeurProfession=this.user.profession;
        this.stegiste=this.user.stegiste;
    }
      if ((this.selectedRelation ==='enfant')||(this.user.stegiste===null))
    {
      this.ValeurPrenom = this.placeholderPrenom1;
      this.ValeurNom = this.placeholderNom1;

      this.ValeurEmail= this.user.email;
      this.userInscrit=true;
      this.ValeurMatricule=this.user.matricule;
      this.ValeurProfession=this.user.profession;
      this.stegiste=this.user.stegiste;
    }
    if ((this.selectedRelation ==='conjoint')||(this.user.stegiste===null))
    {
      this.ValeurPrenom = this.placeholderPrenom1;
      this.ValeurNom = this.placeholderNom1;

      this.ValeurEmail = this.placeholderEmail1;
      this.userInscrit=true;
      this.ValeurMatricule=this.user.matricule;
      this.ValeurProfession=this.user.profession;
      this.stegiste=this.user.stegiste;
    }
  }

  controleSaisieTelephone(): boolean {
    const telephoneInput = document.getElementById("telephone") as HTMLInputElement;

    if (!/^\d{8}$/.test(this.addFamilleForm.value.telephone)) {
      telephoneInput.classList.add("invalid");
      return false;
    } else {
      telephoneInput.classList.remove("invalid");
      return true;
    }
  }

  controleSaisieNom( ): boolean {
    let verif =true;
    if((this.selectedRelation==='conjoint')||(this.selectedRelation==='enfant')){
    const nomInput = document.getElementById("nom") as HTMLInputElement;
    console.log(nomInput);
    const regex =/^[a-zA-Z]{3,}$/ ;
    if (!regex.test(this.addFamilleForm.value.nom)) {
      nomInput.classList.add("invalid");

      verif=false;
    } else {
      nomInput.classList.remove("invalid");
      verif=true;
    }}return verif;}
    controleSaisiePrenom( ): boolean {
      let verif =true;
      if((this.selectedRelation==='conjoint')||(this.selectedRelation==='enfant')){
      const nomInput = document.getElementById("prenom") as HTMLInputElement;
      console.log(nomInput);
      const regex =/^[a-zA-Z]{3,}$/ ;
      if (!regex.test(this.addFamilleForm.value.prenom)) {
        nomInput.classList.add("invalid");

        verif=false;
      } else {
        nomInput.classList.remove("invalid");
        verif=true;
      }}return verif;}

    controleSaisieEmail(): boolean {

      let verif =true;
       if(this.selectedRelation==='conjoint'){
      const nomInput = document.getElementById("email") as HTMLInputElement;
      console.log(nomInput);
      const regex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ ;
      if (!regex.test(this.addFamilleForm.value.email)) {
        nomInput.classList.add("invalid");

        verif=false;
      } else {
        nomInput.classList.remove("invalid");
        verif=true;
      }} return verif;
    }


  addFamille()
  {
    if((!this.controleSaisieNom())||(!this.controleSaisiePrenom())||(!this.controleSaisieEmail())||(!this.controleSaisieTelephone()))
    {this.valid=true;
      console.log(this.valid);
      console.log("erreur grave");
      setTimeout(() => {
        this.valid = false;
      }, 3000);

  }

    else{

   if( this.selectedRelation==='adherent')
   {this.userUpdate = {
    id: this.user.id,
    nom:  this.user.nom,
    prenom: this.user.prenom,
    email:  this.currentUser.email,
   
    adresse: this.addFamilleForm.value.adresse,
    date_naissance: this.addFamilleForm.value.date_naissance,
    lieu_naissance: this.addFamilleForm.value.lieu_naissance,
    telephone: this.addFamilleForm.value.telephone,
    matricule: this.addFamilleForm.value.matricule,
    profession: this.addFamilleForm.value.profession,
    stegiste: this.addFamilleForm.value.stegiste
  };
    this.authService.updateUser(this.userUpdate).subscribe(
      (data) => {
        console.log('here updated user: ', data);
        console.log("update réalisé");
       
        this.valid = true;
        setTimeout(() => {
          this.valid = false;
        }, 3000); // 3000 ms = 3 secondes
      },(err) => {
        console.log("here error from BE", err);

        console.log("update grave");
        this.valid=true;
        setTimeout(() => {
          this.valid = false;
        }, 3000); // 3000 ms = 3 secondes
      }
      );
   }




  else{  this.authService.addMembreFamille(this.addFamilleForm.value,this.currentUser.id).subscribe(
      (data) => {

        console.log(data);
        this.ajout=true;
        console.log(this.ajout);
        setTimeout(() => {
          this.ajout = false;
        }, 3000); // 3000 ms = 3 secondes
      },
      (err) => {
        console.log("here error from BE", err);

        console.log("ici c'est l'erreur");
        this.valid=true;
        setTimeout(() => {
          this.valid = false;
        }, 3000); // 3000 ms = 3 secondes
      }

    ); if (this.user.stegiste===null )
    {this.userUpdateFamilly = {
      id: this.user.id,
      nom:  this.user.nom,
      prenom: this.user.prenom,
      email:  this.currentUser.email,
     
      matricule: this.addFamilleForm.value.matricule,
      profession: this.addFamilleForm.value.profession,
      stegiste: this.addFamilleForm.value.stegiste
    };
    this.authService.updateUser(this.userUpdateFamilly).subscribe(
      (data) => {
        console.log('here updated user: ', data);
        console.log("update réalisé");
       
        this.valid = true;
        setTimeout(() => {
          this.valid = false;
        }, 3000); // 3000 ms = 3 secondes
      },(err) => {
        console.log("here error from BE", err);

        console.log("update grave");
        this.valid=true;
        setTimeout(() => {
          this.valid = false;
        }, 3000); // 3000 ms = 3 secondes
      }
      );}
      
   
  }}

  }
  openConfirmationDialog(){
    this.showConfirmationDialog = true;
  }

  closeConfirmationDialog(){
    this.showConfirmationDialog = false;
  }

}
