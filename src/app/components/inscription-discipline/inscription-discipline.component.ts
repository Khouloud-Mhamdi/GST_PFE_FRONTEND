
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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
  alerteRelation=true;
  alerteStegiste=true;
  alerteDiscipline=true;
  alerteMatricule=false;
  clickInscrire=false;
  ValeurAdresse: any ;
  ValeurDateNaissance: any ;
  ValeurLieuNaissance: any ;
  ValeurTelephone : any;

  ValeurProfession: any ;
  ValeurNom: any ;
  ValeurPrenom: any ;
  ValeurEmail: any ;
  addFamilleForm !: FormGroup <any> ;
  public disciplines : any ;
  selectedRelation: string = '';
  selectedStegiste :any;
  currentUser: any;
  user:any = {};
  membreFamille ={
    id:0,
    nom:"",
    prenom:""
  }
  userUpdate:any={};
  userUpdateFamilly:any={};
  Inscription:any={};
  userInscrit=false;
 idD=1;
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
  showMatricule = false ;
  ControleInputStegiste=false;
  constructor( private titleService: Title ,private disciplineService : DisciplineService , private token: TokenStorageService ,private authService : AuthService , private router : Router , private formBuilder :FormBuilder  ) { }

  ngOnInit(): void { this.titleService.setTitle('GST-Inscription dans une discipline');

    this.currentUser = this.token.getUser();
    this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {this.user = data;  } );
       this.getAllclubs();
       this.addFamilleForm= this.formBuilder.group({
        nom: ["", [Validators.required, Validators.minLength(3)]],
        prenom : ["", [Validators.required , Validators.minLength(3)]],
        email : ["", [Validators.email,Validators.required]],
        relation : ["", [Validators.required]],
        adresse : ["", [Validators.required]],
        date_naissance: ["", [Validators.required]],
        lieu_naissance : [""],
        telephone : ["",[Validators.required]],
        matricule : ["" ,[Validators.required]],
        profession : [""],
        type : ["", [Validators.required]],
        mode_paiement :["",[Validators.required]],
        discipline : ["",[Validators.required]],


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
    this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {this.user = data;  } );
    if(this.user.type!==null)
       {
        this.alerteStegiste=false;
        this.ValeurMatricule=this.user.matricule;
        this.ValeurProfession=this.user.profession;
        this.stegiste=this.user.type;

        this.alerteRelation=false;
       }
    if ((this.selectedRelation ==='adherent'))
    { this.ValeurPrenom = this.user.prenom;
      this.ValeurNom = this.user.nom;
      this.ValeurEmail = this.user.email;
      this.ValeurAdresse=this.user.adresse;
      this.ValeurDateNaissance=this.user.date_naissance ;
      this.ValeurLieuNaissance= this.user.lieu_naissance ;
      this.ValeurTelephone =this.user.telephone ;
      this.ValeurMatricule=this.user.matricule;
      this.alerteRelation=false;
    }
      if ((this.selectedRelation ==='enfant'))
    {
      this.ValeurPrenom = '';
      this.ValeurNom = '';
	  this.ValeurAdresse = '';
	  this.ValeurTelephone = '';
	  this.ValeurLieuNaissance = '';
	  this.ValeurDateNaissance = '';
      this.ValeurEmail= this.user.email;
      this.alerteRelation=false;
    }
    if ((this.selectedRelation ==='conjoint'))
    {
      this.ValeurPrenom = '';
      this.ValeurNom = '';
      this.ValeurEmail = '';
	   this.ValeurAdresse = '';
	  this.ValeurTelephone = '';
	  this.ValeurLieuNaissance = '';
	  this.ValeurDateNaissance = '';
      this.alerteRelation=false;

    }
    if (!this.controleSaisieRelation())
    {
      this.alerteRelation=true;

    }
  }
  onRoleChange(event: any) {

    this.selectedStegiste = event.target.value;

    if (this.selectedStegiste !== undefined && this.selectedStegiste === 'stegiste') {
      this.showMatricule = true;
      this.alerteStegiste=false;
    } else {
      this.showMatricule = false;
      this.alerteStegiste=false;
    }
     if (!this.controleSaisieStegiste() )
    {
      this.alerteStegiste=true;

    }

  }
  DisciplineChange(event: any) {
    if (!this.controleSaisieDiscipline() )
    {
      this.alerteDiscipline=true;

    }
  }


  controleSaisieAdresse(): boolean {
    const telephoneInput = document.getElementById("adresse") as HTMLInputElement;

    if (this.addFamilleForm.value.adresse.trim().length === 0) {
      telephoneInput.classList.add("invalid");
      return false;
    } else {
      telephoneInput.classList.remove("invalid");
      return true;
    }

  }
  controleSaisieDate(): boolean {
    const dateInput = document.getElementById("date") as HTMLInputElement;

    if (!this.addFamilleForm.value.date_naissance) {
      dateInput.classList.add("invalid");
      return false;
    } else {
      dateInput.classList.remove("invalid");
      return true;
    }
  }

  controleSaisieRelation() : boolean{
    if (this.addFamilleForm.value.relation.trim().length === 0 ) {

      return false;

    } else {
      return true;
    }
  }
  controleSaisieStegiste() : boolean{
    if (this.addFamilleForm.value.type.trim().length === 0 ) {
     return false;

    } else {
      return true;
    }
  }
  controleSaisieDiscipline() : boolean{
    if (this.addFamilleForm.value.discipline.trim().length === 0 ) {
     return false;

    } else { this.alerteDiscipline=false;
      return true;
    }
  }
  controleSaisieMatricule( ): boolean {

    let verif =true;
    console.log(this.selectedStegiste)
    this.alerteMatricule=false;
    if((this.selectedStegiste==='stegiste')||(this.stegiste==='stegiste')){
    const nomInput = document.getElementById("matricule") as HTMLInputElement;
    console.log(this.selectedStegiste)

    const regex = /^\d{8}$/;

    if (!regex.test(this.addFamilleForm.value.matricule)) {
      nomInput.classList.add("invalid");
      this.alerteMatricule=true;
      verif=false;
    } else {
      nomInput.classList.remove("invalid");
      verif=true;
      this.alerteMatricule=false;
    }}
    return verif;}

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
    const regex = /^[a-zA-Z\s]{3,}$/;

    if (!regex.test(this.addFamilleForm.value.nom)) {
      nomInput.classList.add("invalid");

      verif=false;
    } else {
      nomInput.classList.remove("invalid");
      verif=true;
    }}
    return verif;}

    controleSaisiePrenom( ): boolean {
      let verif =true;
      if((this.selectedRelation==='conjoint')||(this.selectedRelation==='enfant')){
      const nomInput = document.getElementById("prenom") as HTMLInputElement;
      console.log(nomInput);
      const regex = /^[a-zA-Z\s]{3,}$/;

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
  { this.clickInscrire=true;
    this.showConfirmationDialog = true;
    if((!this.controleSaisieRelation())||(!this.controleSaisieStegiste())||(!this.controleSaisieNom())||(!this.controleSaisiePrenom())||(!this.controleSaisieEmail())||(!this.controleSaisieTelephone())||(!this.controleSaisieAdresse())||(!this.controleSaisieDate())||(!this.controleSaisieMatricule())||(!this.controleSaisieDiscipline()))
    {this.valid=true;
      console.log(this.valid);
      console.log("erreur grave");
      setTimeout(() => {
        this.valid = false;
      }, 8000);
  }

    else{

   if( this.selectedRelation==='adherent')
   {this.userUpdate = {
    id: this.user.id,
    nom:  this.user.nom,
    prenom: this.user.prenom,
    email:  this.user.email,

    adresse: this.addFamilleForm.value.adresse,
    date_naissance: this.addFamilleForm.value.date_naissance,
    lieu_naissance: this.addFamilleForm.value.lieu_naissance,
    telephone: this.addFamilleForm.value.telephone,
    matricule: this.addFamilleForm.value.matricule,
    profession: this.addFamilleForm.value.profession,
    type: this.addFamilleForm.value.type
  };
    this.authService.updateUser(this.userUpdate).subscribe(
      (data) => { this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {this.user = data;  } );
        console.log('here updated user: ', data);

      },(err) => {
        console.log("here error from BE", err);

        this.valid=true;
        setTimeout(() => {
          this.valid = false;
        }, 8000); // 3000 ms = 3 secondes
      }
      );
      this.Inscription ={
        mode_paiement : this.addFamilleForm.value.mode_paiement

      }
      console.log(this)
      this.authService.addInscription(this.Inscription , this.user.id , this.addFamilleForm.value.discipline,'adherent').subscribe(
        (data) => {
          console.log('here inscri user: ', data);
            //this.addFamilleForm.reset();
           this.ajout = true;
          setTimeout(() => {
            this.ajout = false;
          }, 8000); // 3000 ms = 3 secondes
        },(err) => {
          console.log("here error from BE", err);

          this.valid=true;
          setTimeout(() => {
            this.valid = false;
          }, 8000); // 3000 ms = 3 secondes
        }
        );

   }
  else{  this.authService.addMembreFamille(this.addFamilleForm.value,this.currentUser.id).subscribe(
      (data) => {
        this.Inscription ={
          mode_paiement : this.addFamilleForm.value.mode_paiement

        };

        console.log(data);
        this.membreFamille=data;
        console.log(this.membreFamille.id);
        this.ajout=true;
        console.log(this.ajout);
        this.authService.addInscription(this.Inscription , this.membreFamille.id, this.addFamilleForm.value.discipline,'membre').subscribe(
          (data) => {
            console.log('Inscription ajouté: ', data);

             this.ajout = true;
            setTimeout(() => {
              this.ajout = false;
            }, 8000); // 3000 ms = 3 secondes
          },(err) => {

            this.valid=true;
            setTimeout(() => {
              this.valid = false;
            }, 8000); // 3000 ms = 3 secondes
          }
          );
    },
      (err) => {
       this.valid=true;
        setTimeout(() => {
          this.valid = false;
        }, 8000); // 3000 ms = 3 secondes
      }


    );

     if (this.user.type===null )
    {this.userUpdateFamilly = {
      id: this.user.id,
      nom:  this.user.nom,
      prenom: this.user.prenom,
      email:  this.user.email,

      matricule: this.addFamilleForm.value.matricule,
      profession: this.addFamilleForm.value.profession,
      type: this.addFamilleForm.value.type
    };
    this.authService.updateUser(this.userUpdateFamilly).subscribe(
      (data) => { this.authService.getCurrentUserById(this.currentUser.id).subscribe((data) => {this.user = data;  } );
      console.log("update done");
      },(err) => {
      console.log("update grave");
        this.valid=true;
        setTimeout(() => {
          this.valid = false;
        }, 8000); // 3000 ms = 3 secondes
      }
      );}
 }};
  this.closeConfirmationDialog();
  window.scrollTo(0, 0);

  }
  openConfirmationDialog(){
    this.showConfirmationDialog = true;
  }

  closeConfirmationDialog(){
    this.showConfirmationDialog = false;
  }

}
