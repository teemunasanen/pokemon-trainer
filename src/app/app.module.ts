import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CataloguePage } from './catalogue/catalogue.page';
import { LandingPage } from './landing/landing.page';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { TrainerPage } from './trainer/trainer.page';

@NgModule({
  declarations: [
    AppComponent,
    TrainerListComponent,
    TrainerPage,
    LandingPage,
    CataloguePage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
