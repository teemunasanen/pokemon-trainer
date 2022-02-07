import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { mergeMap } from "rxjs";
import { PokemonShort, PokemonListObject, PokemonRaw } from "../models/pokemon-list.model";
import { TrainerService } from "./trainer.service";

@Injectable({
    providedIn: 'root'
})
export class CatalogueService {
    private _catalogue: PokemonShort[] = [];

    constructor(private readonly http: HttpClient, private readonly trainerService: TrainerService) {
    }

    public fetchCatalogue(numOfPokemons: number): void {
        this.http.get<PokemonListObject>('https://pokeapi.co/api/v2/pokemon?limit=' + numOfPokemons)
            .pipe(mergeMap(response => response.results.map(results => this.http.get<PokemonRaw>(results.url))))
            .subscribe({
                next: (object) => {
                    object.subscribe({
                        next: (result) => {
                            const isCaught = this.trainerService.pokemons.some(pokemon => result.name === pokemon.name);
                            const newPokemon: PokemonShort = {
                                name: result.name,
                                sprite: result.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default,
                                type: result.types[0].type.name,
                                caught: isCaught
                            };
                            this._catalogue.push(newPokemon);
                            sessionStorage.setItem("catalogue", JSON.stringify(this._catalogue));
                        }
                    })
                }
            })
    }

    public Catalogue(): PokemonShort[] {
        return this._catalogue;
    }
}