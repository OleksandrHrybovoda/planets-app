import { Planet } from './core/models/planet.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PlanetsApiService } from './core/services/api/planets-api.service';
import { PlanetsHelperService } from './core/services/planets.helper';
import { DialogService } from './core/services/dialog.service';
import { PlanetDialogComponent } from './components/planet-dialog/planet-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  planets: Planet[] = [];
  activePlanet!: Planet | undefined;
  displayedColumns: string[] = ['name', 'diameter', 'climate', 'population'];

  private readonly destroy$ = new Subject();

  constructor(
    private planetsService: PlanetsApiService,
    private planetsHelperService: PlanetsHelperService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.prepareToShowPlanets();
  }

  openDialogToSeePlanetDetails(id: string): void {
    const width = '600px';
    this.dialogService.openDialog(PlanetDialogComponent, id, width);
  }

  trackByFn(index: number, item: Planet) {
    return item.id;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private prepareToShowPlanets(): void {
    this.planetsService
      .getPlanets()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.planets = this.planetsHelperService.setPlanetIds(response.results);
        this.activePlanet = this.planets.length ? this.planets[0] : undefined;
      });
  }
}
