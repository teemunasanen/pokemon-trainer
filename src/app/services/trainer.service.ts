import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TrainerPokemon } from '../models/trainer-pokemon-model';
import { Trainer } from '../models/trainer.model';
import { Router } from '@angular/router';

const TRAINER_KEY = 'trainer';
const URL = environment.trainerAPI;
const API_KEY = environment.trainerAPI_KEY;
const headers = { "content-type": "application/json", "X-API-Key": API_KEY }

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private _trainer: Trainer = JSON.parse(localStorage.getItem(TRAINER_KEY) || "{}");

  get username(): string {
    return this._trainer.username;
  }

  get trainer(): Trainer {
    return this._trainer
  }

  get pokemons(): TrainerPokemon[] {
    return this._trainer.pokemon;
  }
  // Add pokemons to Trainer -> store in localstorage
  public setPokemon(pokemon: TrainerPokemon[]) {
    this.updatePokemon(pokemon);
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
  // Clear storages on logout
  public logOut(): void {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }
  // Login: get trainers and store user logging in
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
          this.createNewTrainer(username.toLowerCase()); // New trainer
        },
        error: (error) => {
          console.log(error.message);
        }
      })
  }
  // If new trainer -> create
  public createNewTrainer(username: string): void {
    const body = { "username": username, "pokemon": [] }

    this.http.post<Trainer>(URL, body, { headers }).subscribe({
      next: (trainer) => {
        localStorage.setItem(TRAINER_KEY, JSON.stringify(trainer));
        this._trainer = trainer;
        this.router.navigateByUrl("/catalogue");
      },
      error: (error) => {
        console.log(error.message);
      }
    })
  }

  public updatePokemon(pokemon: TrainerPokemon[]): void {
    const body = { "pokemon": pokemon }

    this.http.patch<Trainer>(`${URL}/${this._trainer.id}`, body, { headers }).subscribe({
      error: (error) => {
        console.log(error.message);
      }
    })
  }
}