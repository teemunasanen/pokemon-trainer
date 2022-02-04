import { Injectable } from '@angular/core';
import { TrainerPokemon } from '../models/trainer-pokemon-model';

const TRAINER_KEY = 'trainer-name'

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private _trainer: string = "";
  private _pokemon: TrainerPokemon[] = [];

  get trainer(): string {
    return this._trainer;
  }

  set trainer(trainer: string) {
    sessionStorage.setItem(TRAINER_KEY, trainer)
    this._trainer = trainer;
  }

  public getPokemon(): TrainerPokemon[] {
    return this._pokemon;
  }

  public setPokemon(pokemon: TrainerPokemon[]) {
    sessionStorage.setItem("pokemon", JSON.stringify(pokemon));
    this._pokemon = pokemon;
  }

  constructor() { }
}
