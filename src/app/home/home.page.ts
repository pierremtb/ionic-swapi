import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Film, getDate } from '../_interfaces/Film';
import { StorageService } from '../_services/storage/storage.service';
import { ApiService } from './../_services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  subscriptions = new Subscription();
  films: Array<Film>;

  constructor(
    private storage: StorageService,
    private api: ApiService,
  ) {
    this.setUpHomePage();
  }

  async setUpHomePage() {
    // Adding the rx sub to query storage first
    this.subscriptions.add(
      this.storage.getFilmsObservable()
      .subscribe(films => this.films = films)
    );

    // Refresh the storage from the api
    try {
      await this.api.fetchFilms();
    } catch (e) {}
  }

  ngOnDestroy() {
    // Making sure to destroy the rxjs subscriptions
    // when leaving
    this.subscriptions.unsubscribe();
  }
}
