import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TrainerPokemon } from '../models/trainer-pokemon-model';
import { Trainer } from '../models/trainer.model';
import { Router } from '@angular/router';

const TRAINER_KEY = 'trainer';
const URL = environment.trainerAPI;
const API_KEY = environment.trainerAPI_KEY;

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  // private trainers: Trainer[] = [];
  // private error: string = ''
  // private _username: string = "";
  // private _pokemon: TrainerPokemon[] = [];

  private _trainer: Trainer = JSON.parse(localStorage.getItem(TRAINER_KEY) || "{}");

  get username(): string {
    return this._trainer.username;
  }

  get trainer(): Trainer {
    return this._trainer
  }

  // set username(username: string) {
  //   sessionStorage.setItem(TRAINER_KEY, username)
  //   this._username = username;
  // }

  public getPokemon(): TrainerPokemon[] {
    return this._trainer.pokemon;
  }

  public setPokemon(pokemon: TrainerPokemon[]) {
    this._trainer = { id: this._trainer.id, username: this._trainer.username, pokemon: pokemon };
    localStorage.setItem(TRAINER_KEY, JSON.stringify(this._trainer));
  }

  constructor(private http: HttpClient, private router: Router) {

    const storedUser: string = localStorage.getItem(TRAINER_KEY) ?? "";
    if (storedUser) {
      const json = JSON.parse(storedUser) as Trainer;
      this._trainer = json;

    }
  }

  public logOut(): void {
    localStorage.clear;
    sessionStorage.clear;
    this.router.navigateByUrl("/");
  }

  public fetchTrainers(username: string): void {
    this.http.get<Trainer[]>(URL)
      .subscribe({
        next: (trainers) => {
          for (const trainer of trainers) {
            if (trainer.username === username.toLowerCase()) {
              localStorage.setItem(TRAINER_KEY, JSON.stringify(trainer));
              this._trainer = trainer;
              this.router.navigateByUrl("/catalogue");
              return
            }
          }
          this.createNewTrainer(username.toLowerCase());
        }
      })
  }

  public createNewTrainer(username: string): void {
    const headers = { "content-type": "application/json", "X-API-Key": API_KEY }
    const body = { "username": username, "pokemon": [] }

    this.http.post<Trainer>(URL, body, { headers }).subscribe({
      next: (trainer) => {
        localStorage.setItem(TRAINER_KEY, JSON.stringify(trainer));
        this._trainer = trainer;
        this.router.navigateByUrl("/catalogue");
      }
    })
  }
}