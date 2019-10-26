import { Component, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../_services/storage/storage.service';
import { ApiService } from './../_services/api/api.service';
import { Film } from '../_interfaces/Film';
import { Character } from '../_interfaces/Character';
import { Planet } from '../_interfaces/Planet';
import { Starship } from '../_interfaces/Starship';
import { Vehicle } from '../_interfaces/Vehicle';
import { Species } from '../_interfaces/Species';

@Component({
  selector: 'app-film',
  templateUrl: 'film.page.html',
  styleUrls: ['film.page.scss'],
})
export class FilmPage implements OnDestroy {

  subscriptions = new Subscription();
  film: Film;
  characters: Character[];
  planets: Planet[];
  starships: Starship[];
  vehicles: Vehicle[];
  species: Species[];
  loading = true;

  constructor(
    private storage: StorageService,
    private api: ApiService,
    private route: ActivatedRoute,
  ) {
    // Getting the url :id parameter
    this.subscriptions.add(
      this.route.params
        .pipe(map(p => p.id))
        .subscribe(id => this.setUpPage(parseInt(id, 10)))
    );
  }

  async setUpPage(id: number) {
    // Retrieving from storage the film from the id
    this.film = await this.storage.getFilm(id);

    // Querying each nested film components array
    this.characters = await Promise.all(
      this.film.characters.map(url =>
        this.api.get<Character>(url)));
    this.planets = await Promise.all(
      this.film.planets.map(url =>
        this.api.get<Planet>(url)));
    this.starships = await Promise.all(
      this.film.starships.map(url =>
        this.api.get<Starship>(url)));
    this.vehicles = await Promise.all(
      this.film.vehicles.map(url =>
        this.api.get<Vehicle>(url)));
    this.species = await Promise.all(
      this.film.species.map(url =>
        this.api.get<Species>(url)));
  }

  ngOnDestroy() {
    // Making sure to destroy the rxjs subscriptions
    // when leaving
    this.subscriptions.unsubscribe();
  }
}
