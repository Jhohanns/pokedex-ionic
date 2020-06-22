export interface IPokemon {
    count: number;
    results: any[];
}
export interface ICustomPokemon {
    totalPokemons: number;
    pokemonList: IPokemonDetail[];
}

export interface IPokemonDetail {
    image: string;
    id: number;
    name: string;
    types: any[];
    species: any;
    height: number;
    weight: number;
    moves: any[];
    sprites: any;
}
