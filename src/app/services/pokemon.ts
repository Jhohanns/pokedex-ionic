
import { PokemonService } from './pokemon.service';
import { Injectable } from '@angular/core';
import { map, flatMap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { IPokemonDetail, IPokemon, ICustomPokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class Pokemon {
  selectedPokemon: IPokemonDetail;

  constructor(private pokemonService: PokemonService) { }

  getPokemons(page: number = 0): Observable<ICustomPokemon> {
    return this.pokemonService.getPokemons(page).pipe(
      flatMap((response: IPokemon) => {
        const calls = new Array(response.results.length).fill({}).map((x, index) => {
          const pokemonID = response.results[index].url.split('/').reverse()[1];
          return this.getPokemon(pokemonID);
        });

        return forkJoin(calls).pipe(
          map((pokemonDetails: IPokemonDetail[]) => {
            const pokemons: IPokemonDetail[] = [];
            pokemonDetails.forEach((pokemonDetail: IPokemonDetail) => {
              if (pokemonDetail) { pokemons.push(pokemonDetail); }
            });
            return { totalPokemons: response.count, pokemonList: pokemons };
          })
        );
      })
    );
  }

  getPokemon(idOrName: number|string): Observable<any> {
    return this.pokemonService.getPokemon(idOrName);
  }

  getPokemonEvolutionChain(id: number): Observable<any> {
    return this.pokemonService.getPokemonSpecies(id).pipe(
      flatMap((response: any) => {
        const idFromChainUrl = response.evolution_chain.url.split('/').reverse()[1];
        return this.pokemonService.getPokemonEvolutionChain(idFromChainUrl);
      })
    );
  }
}
