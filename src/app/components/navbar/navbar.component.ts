import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  get username(): string {
    return this.trainerService.trainer.username;
  }

  constructor(
    private trainerService: TrainerService, private router: Router) { }

  onLogout(): void {
    this.trainerService.logOut();
  }

  ngOnInit(): void {
  }

}
