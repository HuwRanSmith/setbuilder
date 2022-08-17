import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from 'query-string';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  public getQuery(query: string) {
    // define common url
    const url: string = 'https://api.spotify.com/v1/${query}';

    // define header to specify token
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQAr2XNaHkRgSxk-lWKIUEjHTPT1pG7qj696yYQgdpTLKSuVL9oMGcENth0yynhRilrfN_FjFxtGd3f9poE',
    });

    // execute request
    return this.http.get(url, { headers });
  }

  public getAuth() {
    const url: string = 'https://accounts.spotify.com/authorize?';
    var scope =
      'streaming \
               user-read-email \
               user-read-private';
    const query: string =
      url +
      stringify({
        response_type: 'code',
        client_id: '2b217b23f72a411b9516407193186248',
        scope: scope,
        redirect_uri: 'http://localhost:4200/edit',
      });
    return this.http.get(query);
  }
}
