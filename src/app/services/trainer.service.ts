import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TrainerPokemon } from '../models/trainer-pokemon-model';
import { Trainer } from '../models/trainer.model';

const TRAINER_KEY = 'trainer-name';
const URL = environment.trainerAPI;

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private trainers: Trainer[] = [];
  private error: string = ''

  private _username: string = "";
  private _trainer?: Trainer;

  private _pokemon: TrainerPokemon[] = [];

  get username(): string {
    return this._username;
  }

  get trainer(): Trainer | undefined {
    return this._trainer
  }


  set username(username: string) {
    sessionStorage.setItem(TRAINER_KEY, username)
    this._username = username;
  }

  public getPokemon(): TrainerPokemon[] {
    return this._pokemon;
  }

  public setPokemon(pokemon: TrainerPokemon[]) {
    sessionStorage.setItem("pokemon", JSON.stringify(pokemon));
    this._pokemon = pokemon;
  }

  constructor(private http: HttpClient) {
    const storedUser: string = sessionStorage.getItem(TRAINER_KEY) ?? "";
    if(storedUser) {
      const json = JSON.parse(storedUser) as Trainer;
      this._trainer = json;

    }
  }

  public fetchTrainers(): void {
    this.http.get<Trainer[]>(URL)
    .subscribe((trainers: Trainer[] )=> {
      this.trainers = trainers
    }, (error: HttpErrorResponse) => {
        this.error = error.message
    })
  }


}
