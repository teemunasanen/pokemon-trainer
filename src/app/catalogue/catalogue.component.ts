import {Component, OnInit} from '@angular/core'
import { PokemonShort } from '../models/pokemon-list.model';
import { CatalogueService } from '../services/catalogue.service';

@Component({
    selector: 'app-catalogue',
    templateUrl: './catalogue.component.html',
    styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
    constructor(private readonly catalogueService: CatalogueService) {
        
    }
    ngOnInit(): void {
        this.catalogueService.fetchCatalogue(151);
    }

    get catalogue(): PokemonShort[] {
        return this.catalogueService.Catalogue();
    }
}