import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PokemonShort, PokemonList, PokemonListObject, PokemonRaw } from "../models/pokemon-list.model";

@Injectable({
    providedIn: 'root'
})
export class CatalogueService {
    private _catalogue: PokemonShort[] = []
    private _error: string = '';

    constructor(private readonly http: HttpClient) {
    }

    public fetchCatalogue(numOfPokemons: number): void {
        this.http.get<PokemonListObject>('https://pokeapi.co/api/v2/pokemon?limit=' + numOfPokemons)
            .subscribe({
                next: (catalogueObject) => {
                    for (let i = 0; i < catalogueObject.results.length; i++) {
                        this.fetchPokemon(catalogueObject.results[i].url);
                    }
                },
                error: (error) => {
                    this._error = error.message;
                }
            })
    }

    public fetchPokemon(url: string): void {
        this.http.get<PokemonRaw>(url)
            .subscribe({
                next: (pokemon) => {
                    const newPokemon: PokemonShort = {
                        name: pokemon.name,
                        sprite: pokemon.sprites.front_default,
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

    public error(): string {
        return this._error;
    }
}