import { Component, OnInit } from "@angular/core";
import { PokemonShort } from "../models/pokemon-list.model";
import { TrainerPokemon } from "../models/trainer-pokemon-model";
import { CatalogueService } from "../services/catalogue.service";
import { TrainerService } from "../services/trainer.service";

@Component({
    selector: 'app-trainer-list',
    templateUrl: './trainer-list.component.html',
    styleUrls: ['./trainer-list.component.css']
})
export class TrainerListComponent implements OnInit {
    constructor(private readonly trainerService: TrainerService,
        private readonly catalogueService: CatalogueService) { }

    _caughtPokemons: TrainerPokemon[] = []

    ngOnInit() {
        const trainer = JSON.parse(localStorage.getItem("trainer") || "{}");
        this._caughtPokemons = trainer.pokemon;
    }

    public handlePokemonClicked(pokemon: TrainerPokemon): void {
        // update trainer pokemon metadata
        this._caughtPokemons.forEach(item => {
            if (item.name === pokemon.name)
                item.deleted = true;
        })

        // update catalogue pokemon metadata
        const catalogue: PokemonShort[] = JSON.parse(sessionStorage.getItem("catalogue") || "{}");
        catalogue.forEach(item => {
            if (item.name === pokemon.name)
                item.caught = false;
        })
        this.catalogueService.setCatalogue(catalogue);

        let updatedTrainer = {
            id: this.trainerService.trainer.id,
            name: this.trainerService.trainer.username,
            pokemon: this._caughtPokemons
        }

        // update trainer to storage and api
        localStorage.setItem("trainer", JSON.stringify(updatedTrainer));
        this.trainerService.setPokemon(this._caughtPokemons);
        this.trainerService.updatePokemon(this._caughtPokemons);
    }
}