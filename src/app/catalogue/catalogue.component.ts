import { Component, OnInit } from '@angular/core'
import { PokemonShort } from '../models/pokemon-list.model';
import { CatalogueService } from '../services/catalogue.service';
import { TrainerService } from '../services/trainer.service';

@Component({
    selector: 'app-catalogue-comp',
    templateUrl: './catalogue.component.html',
    styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
    constructor(private readonly catalogueService: CatalogueService,
        private readonly trainerService: TrainerService) {
    }

    _catalogue: PokemonShort[] = [];

    ngOnInit(): void {
        const storedCatalogue: string | null = sessionStorage.getItem("catalogue");
        if (storedCatalogue === null) {
            this.catalogueService.fetchCatalogue(151);
            this._catalogue = this.catalogueService.Catalogue();
        }
        else {
            this._catalogue = JSON.parse(storedCatalogue);
        }
    }

    public handlePokemonClicked(pokemon: PokemonShort): void {
        // update catalogue pokemon metadata
        if (!pokemon.caught) {
            let currentPokemons = this.trainerService.pokemons;
            this._catalogue.forEach(item => {
                if (item.name === pokemon.name)
                    item.caught = true;
            })

            // update catalogue to session storage and api
            sessionStorage.setItem("catalogue", JSON.stringify(this._catalogue));
            currentPokemons.push({ name: pokemon.name, sprite: pokemon.sprite, type: pokemon.type, deleted: false });
            this.trainerService.setPokemon(currentPokemons);
        }
    }
}