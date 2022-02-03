import { Component, EventEmitter, Input, Output } from '@angular/core'
import { PokemonShort } from '../models/pokemon-list.model'

@Component({
    selector: 'app-catalogue-item',
    templateUrl: './catalogue-item.component.html',
    styleUrls: ['./catalogue-item.component.css']
})
export class CatalogueItemComponent {
    @Input() pokemon: PokemonShort | undefined;
    @Output() clicked: EventEmitter<PokemonShort> = new EventEmitter();

    public onPokemonClicked(): void {
        this.clicked.emit(this.pokemon);
    }
}