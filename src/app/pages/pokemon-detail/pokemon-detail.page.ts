import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { ROUTES } from '@constants/shared-constants';
import { IPokemonDetail } from '@interfaces/pokemon.interface';
import { Pokemon } from '@services/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
  pokemonDetail: IPokemonDetail;

  constructor(private pokemon: Pokemon, private router: Router, private toastController: ToastController) {
    this.pokemonDetail = this.pokemon.selectedPokemon;
  }

  ngOnInit() { }

  ionViewWillEnter() {
    if (!this.pokemonDetail) {
      this.presentToast('Sorry, could not open the detail page');
      this.router.navigate([ROUTES.POKEMON_LIST]);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });

    toast.present();
  }
}
