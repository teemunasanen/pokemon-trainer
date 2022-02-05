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
        else 
        {
            this._catalogue = JSON.parse(storedCatalogue);
        }
    }

    getCatalogue() {
        this._catalogue = this.catalogueService.Catalogue();
    }

    public handlePokemonClicked(pokemon: PokemonShort): void {
        let currentPokemon = this.trainerService.getPokemon();
        currentPokemon.push({name: pokemon.name, sprite: pokemon.sprite, type: pokemon.type, deleted: false});
        this.trainerService.setPokemon(currentPokemon);
    }
}