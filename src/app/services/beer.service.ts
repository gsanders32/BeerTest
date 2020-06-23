import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  constructor(private httpService: ApiService) { }

  async getAll(){
    const data = await this.httpService.get('beers');
    return data;
  }
}
