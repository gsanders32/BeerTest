import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBeer } from '../interfaces/ibeer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  url = 'https://api.punkapi.com/v2/';

  async get(path){
    return await this.httpClient.get<IBeer[]>(this.url + path).toPromise();
  }
}
