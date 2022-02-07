import { Component, OnInit } from "@angular/core";
import { TrainerService } from "../services/trainer.service";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.page.html'
})
export class LandingPage implements OnInit {

    get username(): string{
        return this.trainerService.username;
    }

    constructor(
        private trainerService: TrainerService
    ) { }

    ngOnInit(): void {
        
    }


}