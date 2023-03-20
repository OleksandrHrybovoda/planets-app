import { Injectable } from '@angular/core';
import { Planet } from '../models/planet.model';

@Injectable({
  providedIn: 'root',
})
export class PlanetsHelperService {
  setPlanetIds(planets: Planet[]): Planet[] {
    return planets.map((planet, index) => {
      planet.id = index + 1;
      return planet;
    });
  }
}
