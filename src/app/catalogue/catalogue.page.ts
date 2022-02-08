import { Component, OnInit } from "@angular/core";
import { TrainerService } from "../services/trainer.service";

@Component({
    selector: 'app-catalogue',
    templateUrl: './catalogue.page.html'
})
export class CataloguePage implements OnInit {

    get username(): string {
        return this.trainerService.username;
    }

    constructor(
        private trainerService: TrainerService
    ) { }

    ngOnInit(): void {

    }
}