import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PokemonShort, PokemonListObject, PokemonRaw } from "../models/pokemon-list.model";

@Injectable({
    providedIn: 'root'
})
export class CatalogueService {
    private _catalogue: PokemonShort[] = []

    constructor(private readonly http: HttpClient) {
    }

    public fetchCatalogue(numOfPokemons: number): void {
        this.http.get<PokemonListObject>('https://pokeapi.co/api/v2/pokemon?limit=' + numOfPokemons)
            .subscribe({
                next: (catalogueObject) => {
                    for (let i = 0; i < catalogueObject.results.length; i++) {
                        this.fetchPokemon(catalogueObject.results[i].url);
                    }
                }
            })
    }

    public fetchPokemon(url: string): void {
        this.http.get<PokemonRaw>(url)
            .subscribe({
                next: (pokemon) => {
                    const newPokemon: PokemonShort = {
                        name: pokemon.name,
                        sprite: pokemon.sprites.versions["generation-vii"]["ultra-sun-ultra-moon"].front_default,
                        type: pokemon.types[0].type.name,
                        caught: false
                    };
                    this._catalogue.push(newPokemon);
                }
            })
    }

    public Catalogue(): PokemonShort[] {
        return this._catalogue;
    }
}