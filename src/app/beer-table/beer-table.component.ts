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

  dataSource: MatTableDataSource<IBeer>;
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
    this.dataSource = new MatTableDataSource(data);
    this.matTablePageSort();
  }

  async getByCount(){
    const data = await this.beerService.getAll(this.count);
    this.dataSource = new MatTableDataSource(data);
    this.matTablePageSort();
  }
  
  // Updates Sort And Paginator
  matTablePageSort(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
