import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://games.directory/api/play_station/v1/';
  headers = {
    'token': 'e732ca7b-9e17-4a66-9306-5ccbd3133ac4',
    'Authority': 'demo@games.directory'
  };

  get(route:string, q:any = {}) {
    var query = Object.keys(q).length > 0 ? '?' : '';
    Object.keys(q).forEach((key, index) => {
      var value = Object.values(q)[index];

      if (value && value != '') {
        if (index !== 0) {
          query += '&';
        }

        query = query + key + '=' + value;
      }
    });

    return this.http.get(this.baseUrl + route + query, {headers: this.headers})
  }

  constructor(private http: HttpClient) { }
}
