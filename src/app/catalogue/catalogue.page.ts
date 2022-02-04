import { Component, OnInit } from "@angular/core";
import { TrainerService } from "../services/trainer.service";

@Component({
    selector: 'app-catalogue',
    templateUrl: './catalogue.page.html'
})
export class CataloguePage implements OnInit {

    get trainer(): string{
        return this.trainerService.trainer;
    }

    constructor(
        private trainerService: TrainerService
    ) { }

    ngOnInit(): void {
        
    }


}