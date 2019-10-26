import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Films } from '../../_interfaces/Films';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://swapi.co/api';

  constructor(
    private storageService: StorageService,
    private http: HttpClient,
  ) { }

  public async get<T>(fullUrl: string): Promise<T> {
    return this.http.get<T>(fullUrl).toPromise();
  }

  public async fetchFilms(): Promise<Films> {
    return this.http.get<Films>(`${this.baseUrl}/films`).toPromise()
      .then(async (films: Films) => {
        await this.storageService.setFilms(films);
        return films;
      });
  }
}
