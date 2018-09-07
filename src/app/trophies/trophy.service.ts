import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {extract} from '@app/core';
import {Trophy, TrophyModel} from '@app/shared/models/trophy.model';

@Injectable()
export class TrophyService {

  constructor(private http: HttpClient) {
  }

  getTrophies(): Observable<Trophy[] | string> {
    return this.http.cache()
      .get('/trophies')
      .pipe(
        map((res: any) => {
          const trophies = [];
          for (const trophy of res.trophies) {
            trophies.push(new TrophyModel(trophy.hash, trophy.name, trophy.country));
          }
          return trophies;
        }),
        catchError(() => {
          return of(extract('Could not load any trophies. Please create a trophy'));
        })
      );
}
}
