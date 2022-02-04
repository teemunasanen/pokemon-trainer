import { Injectable } from '@angular/core';

const TRAINER_KEY = 'trainer-name'

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private _trainer: string = "";

  get trainer(): string {
    return this._trainer;
  }

  set trainer(trainer: string) {
    sessionStorage.setItem(TRAINER_KEY, trainer)
    this._trainer = trainer;
  }

  constructor() {
    this._trainer = sessionStorage.getItem(TRAINER_KEY) || "";
  }
}
