import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  selectedGame:any;

  getGamesList(page = 1, perPage = 25, searchText = '') {
    return this.apiService.get('games', {page: page, per_page: perPage, query: searchText})
  }

  getGame() {
    return this.apiService.get('games/' + this.selectedGame.id);
  }

  getTrophies(perPage = 25) {
    return this.apiService.get('games/' + this.selectedGame.id + '/trophies', {per_page: perPage});
  }

  getCommunity(perPage = 25) {
    return this.apiService.get('games/' + this.selectedGame.id + '/community', {per_page: perPage});
  }

  getProducts(perPage = 25) {
    return this.apiService.get('games/' + this.selectedGame.id + '/products', {per_page: perPage});
  }

  getAddons(perPage = 25) {
    return this.apiService.get('games/' + this.selectedGame.id + '/addons', {per_page: perPage});
  }

  constructor(
    private apiService: ApiService
  ) {
    
  }
}
