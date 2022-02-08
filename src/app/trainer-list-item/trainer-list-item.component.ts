import { Component, EventEmitter, Input, Output } from '@angular/core'
import { TrainerPokemon } from '../models/trainer-pokemon-model';


@Component({
    selector: 'app-trainer-list-item',
    templateUrl: './trainer-list-item.component.html',
    styleUrls: ['./trainer-list-item.component.css']
})
export class TrainerListItemComponent {
    @Input() pokemon: TrainerPokemon | undefined;
    @Output() clicked: EventEmitter<TrainerPokemon> = new EventEmitter();

    public onPokemonClicked(): void {
        this.clicked.emit(this.pokemon);
    }
}