export interface PokemonListObject {
    count: number;
    next: string;
    previous: string;
    results: PokemonList[];
}

export interface PokemonList {
    name: string;
    url: string;
}

export interface PokemonRaw {
    name: string;
    sprites: Sprites;
    types: Types[];
}

export interface PokemonShort {
    name: string;
    sprite: string;
    type: string;
    caught: boolean;
}

export interface Sprites {
    versions: Versions;
 }

 export interface Versions {
    "generation-vii": Generation_vii;
 }

 export interface Generation_vii {
    "ultra-sun-ultra-moon": SunMoon;
 }

 export interface SunMoon {
    front_default: string;
 }

export interface Types {
    type: Type;
}

export interface Type {
    name: string;
}