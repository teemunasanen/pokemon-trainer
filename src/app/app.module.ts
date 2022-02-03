import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CataloguePage } from './catalogue/catalogue.page';
import { LandingPage } from './landing/landing.page';
import { TrainerListComponent } from './trainer-list/trainer-list.component';
import { TrainerPage } from './trainer/trainer.page';
import { CatalogueItemComponent } from './catalogue-item/catalogue-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TrainerListComponent,
    TrainerPage,
    LandingPage,
    CataloguePage,
    CatalogueComponent,
    CatalogueItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
