import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { CatalogueItemComponent } from './catalogue-item/catalogue-item.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LandingPage } from './landing/landing.page';
import { CataloguePage } from './catalogue/catalogue.page';
import { TrainerPage } from './trainer/trainer.page';

import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TrainerListItemComponent } from './trainer-list-item/trainer-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainerListComponent,
    TrainerListItemComponent,
    TrainerPage,
    LandingPage,
    CataloguePage,
    CatalogueComponent,
    CatalogueItemComponent,
    LoginFormComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
