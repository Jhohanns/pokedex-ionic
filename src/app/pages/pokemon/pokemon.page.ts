import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ROUTES } from '@constants/shared-constants';
import { ICustomPokemon, IPokemonDetail } from '@interfaces/pokemon.interface';
import { Pokemon } from '@services/pokemon';

import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {
  pokemonsFiltered: IPokemonDetail[];
  pokemons: IPokemonDetail[];
  searchControl: FormControl;
  nextPage = 1;
  totalPokemons = 10;

  constructor(private pokemon: Pokemon, private router: Router) {
    this.searchControl = new FormControl('');
  }

  ngOnInit() {
    this.loadFirstPokemons();
    this.searchValueSubscription();
  }

  /**
   * subscription to searchText [debounce time for delay]
   * Execution:
   * [step 1]: we filter the current pokemon list, looking for names and types with partial match
   * [step 2]: since there is not an pokeAPI endpoint with partial match, if user search a pokemon
   * that is/isn't listed in the 50 first results, we call "this.getPokemon" api with exact match.
   */
  searchValueSubscription(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((text: string) => {
        this.pokemonsFiltered = this.filterPokemonsBySearchText(this.pokemons);
        if (text) {
          this.getPokemon(text);
        }
      });
  }

  filterPokemonsBySearchText(pokemonList: IPokemonDetail[]) {
    return pokemonList.filter(
      (pokemon) =>
        pokemon.name.includes(this.searchControl.value) ||
        pokemon.types.filter((type) => type.type.name.includes(this.searchControl.value)).length
    );
  }

  /**
   * Get pokemon by exact name
   */
  getPokemon(name: string) {
    this.pokemon.getPokemon(name).subscribe((response: IPokemonDetail) => {
      if (response) {
        this.pokemonsFiltered = [response];
      }
    });
  }

  /**
   * Loads the first 50 pokemons once the pag is loaded
   */
  loadFirstPokemons(page: number = 0) {
    this.pokemon.getPokemons(page).subscribe((response: ICustomPokemon) => {
      if (response.pokemonList) {
        this.totalPokemons = response.totalPokemons;
        this.pokemons = response.pokemonList;
        this.pokemonsFiltered = response.pokemonList;
      }
    });
  }

  goToPokemonDetail(pokemon: IPokemonDetail) {
    this.pokemon.selectedPokemon = pokemon;
    this.router.navigateByUrl(ROUTES.POKEMON_DETAIL);
  }

  /**
   * Infinite scroll implementation, will call based on "nextPage"
   * applying the (filter criteria) whenever response arrives,
   * once response arrives, will be concatenated to
   * "this.pokemons" = [current pokemons] + [response],
   * "this.pokemonsFiltered" = [current filtered pokemons] + [response filtered with the current filter criteria]
   * once all pokemons are called, no further api calls will be made
   */
  loadData(event) {
    setTimeout(() => {
      this.pokemon.getPokemons(this.nextPage).subscribe((response: ICustomPokemon) => {
        if (response.pokemonList && response.pokemonList.length) {
          this.pokemons = this.pokemons.concat(response.pokemonList);
          this.pokemonsFiltered = this.pokemonsFiltered.concat(this.filterPokemonsBySearchText(response.pokemonList));
          this.nextPage++;
        }
        event.target.complete();
      });

      if (this.pokemons.length === this.totalPokemons) {
        event.target.disabled = true;
      }
    });
  }
}
