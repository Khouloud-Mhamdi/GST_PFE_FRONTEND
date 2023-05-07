import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AproposPageComponent } from './components/apropos-page/apropos-page.component';
import { BasketPageComponent } from './components/basket-page/basket-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { EventPageComponent } from './components/event-page/event-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HandballPageComponent } from './components/handball-page/handball-page.component';
import { HomeComponent } from './components/home/home.component';
import { InscriptionDisciplineComponent } from './components/inscription-discipline/inscription-discipline.component';
import { KaratePageComponent } from './components/karate-page/karate-page.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { SingleEventComponent } from './components/single-event/single-event.component';
import { TennisPageComponent } from './components/tennis-page/tennis-page.component';
import { ValiderReservationComponent } from './components/valider-reservation/valider-reservation.component';
import { VolleyballPageComponent } from './components/volleyball-page/volleyball-page.component';

const routes: Routes = [

  {path : "" , component:HomeComponent},
  {path : "Contact" , component:ContactPageComponent},
  {path : "Basketball" , component:BasketPageComponent},
  {path : "Tennis" , component:TennisPageComponent},
  {path : "Volleyball" , component:VolleyballPageComponent},
  {path : "Karaté" , component:KaratePageComponent},
  {path : "InscriptionDiscipline" , component:InscriptionDisciplineComponent},
  {path : "Login" , component:LoginComponent},
  {path : "Handball" , component:HandballPageComponent},
  {path : "apropos" , component: AproposPageComponent},
  {path : "signup" , component: SignupPageComponent},
  {path : "events" , component:EventPageComponent},
  {path:"eventInfo/:id",component:SingleEventComponent},
  {path : "profil" , component:ProfileComponent},
  {path : "MotDePasseOublie" , component:ForgotPasswordComponent},
  {path : "resetPassword" , component:ResetPasswordComponent},
  {path : "reservation" , component:ReservationComponent},
  {path : "Validation" , component:ValiderReservationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
