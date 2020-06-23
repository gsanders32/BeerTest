import { Component, OnInit } from '@angular/core';
import { BeerService } from '../services/beer.service';
@Component({
  selector: 'app-beer-table',
  templateUrl: './beer-table.component.html',
  styleUrls: ['./beer-table.component.css']
})
export class BeerTableComponent implements OnInit {
  title = "Beer Table";
  beers;

  constructor(private beerService: BeerService) { }

  async ngOnInit(){
    const data = await this.beerService.getAll();
    this.beers = data;
  }

}
