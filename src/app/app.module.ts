import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { IntroSectionComponent } from './components/intro-section/intro-section.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoSectionComponent } from './components/info-section/info-section.component';
import { DisciplinesSectionComponent } from './components/disciplines-section/disciplines-section.component';
import { EventsSectionComponent } from './components/events-section/events-section.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { BasketPageComponent } from './components/basket-page/basket-page.component';
import { AproposSectionComponent } from './components/apropos-section/apropos-section.component';

import { TennisPageComponent } from './components/tennis-page/tennis-page.component';
import { HandballPageComponent } from './components/handball-page/handball-page.component';
import { VolleyballPageComponent } from './components/volleyball-page/volleyball-page.component';
import { KaratePageComponent } from './components/karate-page/karate-page.component';

@NgModule({
  declarations: [

    AppComponent,
    FooterComponent,
    IntroSectionComponent ,
    HeaderComponent,
    HomeComponent,
    InfoSectionComponent,
    DisciplinesSectionComponent,
    EventsSectionComponent,
    ContactPageComponent,
    BasketPageComponent,
    AproposSectionComponent,

    TennisPageComponent,
    HandballPageComponent,
    VolleyballPageComponent,
    KaratePageComponent ,
],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
