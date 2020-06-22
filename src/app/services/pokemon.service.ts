import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = environment.pokemonBaseUrl;

  constructor(private http: HttpClient) { }

  getPokemons(page: number = 0, size: number = 50): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon?limit=${size}&offset=${(size * page)}`);
  }

  getPokemon(idOrName: number | string): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon/${idOrName}`);
  }

  getPokemonEvolutionChain(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}evolution-chain/${id}`);
  }

  getPokemonSpecies(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon-species/${id}`);
  }
}
