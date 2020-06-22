import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PokemonDetailEvolutionChainComponent } from './pokemon-detail-evolution-chain.component';

describe('PokemonDetailEvolutionChainComponent', () => {
  let component: PokemonDetailEvolutionChainComponent;
  let fixture: ComponentFixture<PokemonDetailEvolutionChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonDetailEvolutionChainComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailEvolutionChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
