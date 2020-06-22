import { Component, OnInit } from '@angular/core';

import { IPokemonDetail } from '@interfaces/pokemon.interface';
import { Pokemon } from '@services/pokemon';

@Component({
  selector: 'app-pokemon-detail-moves',
  templateUrl: './pokemon-detail-moves.component.html',
  styleUrls: ['./pokemon-detail-moves.component.scss'],
})
export class PokemonDetailMovesComponent implements OnInit {
  pokemonDetail: IPokemonDetail;

  constructor(private pokemon: Pokemon) {
    this.pokemonDetail = this.pokemon.selectedPokemon;
  }

  ngOnInit() { }

}
