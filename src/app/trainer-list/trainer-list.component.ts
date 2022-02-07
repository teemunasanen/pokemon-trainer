import { Component, OnInit } from "@angular/core";
import { TrainerPokemon } from "../models/trainer-pokemon-model";
import { TrainerService } from "../services/trainer.service";

@Component({
    selector: 'app-trainer-list',
    templateUrl: './trainer-list.component.html',
    styleUrls: ['./trainer-list.component.css']
})
export class TrainerListComponent implements OnInit {
    constructor(private readonly trainerService: TrainerService) { }

    _caughtPokemons: TrainerPokemon[] = []

    ngOnInit() {
        const trainer = JSON.parse(localStorage.getItem("trainer") || "{}");
        this._caughtPokemons = trainer.pokemon;
    }

    public handlePokemonClicked(pokemon: TrainerPokemon): void {
        this._caughtPokemons.forEach(item => {
            if (item.name === pokemon.name)
                item.deleted = true;
        })

        let updatedTrainer = {
            id: this.trainerService.trainer.id,
            name: this.trainerService.trainer.username,
            pokemon: this._caughtPokemons
        }

        console.log(updatedTrainer);

        localStorage.setItem("trainer", JSON.stringify(updatedTrainer));
        this.trainerService.setPokemon(this._caughtPokemons);
        this.trainerService.updatePokemon(this._caughtPokemons);
    }
}