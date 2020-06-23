import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BeerService } from '../services/beer.service';
import { IBeer } from '../interfaces/ibeer';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-beer-table',
  templateUrl: './beer-table.component.html',
  styleUrls: ['./beer-table.component.css']
})
export class BeerTableComponent implements OnInit {
  @Input()page = 1;
  @Input()count = 25;

  dataSource;
  displayedColumns: string[] = [ 'id', 'name', 'description', 'image_url' ];

  constructor(private beerService: BeerService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit() {
    const data = await this.beerService.getAll(this.count);
    this.matTableData(data);
  }

  async getByCount(){
    const data = await this.beerService.getAll(this.count);
    this.matTableData(data);
  }

  async addBeerToTable(){
    this.count++;
    const data = await this.beerService.getAll(this.count);
    this.matTableData(data);
  }

  // Updates Sort And Paginator
  matTableData(data){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
