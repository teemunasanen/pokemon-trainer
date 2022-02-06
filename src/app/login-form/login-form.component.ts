import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { TrainerService } from "../services/trainer.service";

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    constructor(
        private router: Router,
        private trainerService: TrainerService) { }


    ngOnInit(): void {
        this.trainerService.fetchTrainers();
    }

    public onLoginSubmit(form: NgForm): void {
        const { trainer } = form.value;
        this.trainerService.username = trainer;
        this.router.navigateByUrl("/catalogue");
    }



}