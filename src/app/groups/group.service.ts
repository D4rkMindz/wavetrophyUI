import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Group, GroupModel} from '@app/shared/models/group.model';
import {catchError, map} from 'rxjs/operators';
import {extract} from '@app/core';

@Injectable()
export class GroupService {

  constructor(private http: HttpClient) {
  }

  public getGroups(trophyHash: string): Observable<Group[] | string> {
    const url = `/trophies/${trophyHash}/groups`;
    return this.http.cache()
      .get(url)
      .pipe(
        map((res: any) => {
          const groups = [];
          for (const group of res.groups) {
            groups.push(new GroupModel(group.hash, group.name, group.wavetrophy_hash));
          }
          return groups;
        }),
        catchError(() => {
          return of(extract('Could not load any groups. Please create a group'));
        })
      );
  }

  public createGroup(trophyHash: string, name: string): Observable<string> {
    const url = `/trophies/${trophyHash}/groups`;
    return this.http.post(url, JSON.stringify({name: name}))
      .pipe(
        map((res: any) => {
          if ('group_hash' in res) {
            return res.group_hash;
          }
        })
      );
  }

  public deleteGroup(trophyHash: string, groupHash: string): Observable<string|boolean> {
    const url = `/trophies/${trophyHash}/groups/${groupHash}`;
    return this.http.delete(url)
      .pipe(
        map((res: any) => {
          if (res.status === 200) {
            return res.info;
          }
          return false;
        })
      );
  }
}
