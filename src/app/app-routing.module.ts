import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguePage } from './catalogue/catalogue.page';
import { LandingPage } from './landing/landing.page';
import { TrainerPage } from './trainer/trainer.page';

// Landing page
// Pokémon Catalogue page
// Trainer page

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing'
  },
  {
      path: 'trainer',
      component: TrainerPage
  },
  {
    path: 'catalogue',
    component: CataloguePage
  },
  {
    path: 'landing',
    component: LandingPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
