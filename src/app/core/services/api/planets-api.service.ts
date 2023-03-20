import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Planet, PlanetData } from '../../models/planet.model';

@Injectable({
  providedIn: 'root',
})
export class PlanetsApiService {
  private endpoint = environment.api;

  constructor(private http: HttpClient) {}

  getPlanets(): Observable<PlanetData> {
    const url = `${this.endpoint}planets`;

    return this.http.get<PlanetData>(url);
  }

  getPlanet(id: string): Observable<Planet> {
    const url = `${this.endpoint}planets/${id}`;

    return this.http.get<Planet>(url);
  }
}
