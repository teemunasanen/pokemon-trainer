import { TrainerPokemon } from "./trainer-pokemon-model";

export interface Trainer {
    id: number,
    username: string,
    pokemon: TrainerPokemon[];
}