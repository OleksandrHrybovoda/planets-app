import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Planet } from 'src/app/core/models/planet.model';
import { Resident } from 'src/app/core/models/resident.model';
import { PlanetsApiService } from 'src/app/core/services/api/planets-api.service';
import { ResidentsApiService } from 'src/app/core/services/api/residents-api.service';

@Component({
  selector: 'app-planet-dialog',
  templateUrl: './planet-dialog.component.html',
  styleUrls: ['./planet-dialog.component.scss'],
})
export class PlanetDialogComponent implements OnInit, OnDestroy {
  planet: Planet | undefined = undefined;
  residents: Resident[] = [];

  private readonly destroy$ = new Subject();
  constructor(
    private planetsService: PlanetsApiService,
    private residentsService: ResidentsApiService,
    @Inject(MAT_DIALOG_DATA)
    private data: string
  ) {}

  ngOnInit(): void {
    this.prepareToShowPlanet();
  }

  trackByFn(index: number, item: Resident) {
    return item.url;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private prepareToShowPlanet(): void {
    this.planetsService
      .getPlanet(this.data)
      .pipe(
        tap((planet) => (this.planet = planet)),
        switchMap(({ residents }) => {
          const residentsRequests = residents.map((residentUrl) =>
            this.residentsService.getResident(residentUrl)
          );
          return forkJoin(residentsRequests);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((residents) => {
        this.residents = residents;
      });
  }
}
