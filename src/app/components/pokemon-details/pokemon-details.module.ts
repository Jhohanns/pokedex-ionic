import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokemonDetailEvolutionChainComponent } from './pokemon-detail-evolution-chain/pokemon-detail-evolution-chain.component';
import { PokemonDetailMovesComponent } from './pokemon-detail-moves/pokemon-detail-moves.component';

const POKEMON_DETAIL_COMPONENTS = [
  PokemonDetailEvolutionChainComponent,
  PokemonDetailMovesComponent
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    POKEMON_DETAIL_COMPONENTS
  ],
  exports: [
    POKEMON_DETAIL_COMPONENTS
  ],
})
export class PokemonDetailsModule { }
