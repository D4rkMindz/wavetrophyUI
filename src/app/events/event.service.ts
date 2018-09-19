import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {extract, Logger, toDate} from '@app/core';
import {Moment} from 'moment';
import {EventModel, Image, ImageModel, WaveEvent} from '@app/shared';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private logger: Logger = new Logger('EVENT');

  constructor(private http: HttpClient) {
  }

  public getEvents(trophyHash: string, groupHash: string, locationHash: string): Observable<WaveEvent[] | string> {
    const url = `/trophies/${trophyHash}/groups/${groupHash}/locations/${locationHash}/events`;
    return this.http.cache()
      .get(url)
      .pipe(map((res: any) => {
          const events = [];
          for (const event of res.events) {
            const eventImages = [];
            for (const image of event.images) {
              eventImages.push(new ImageModel(image));
            }
            const eventModel = new EventModel(
              event.hash,
              event.day,
              toDate(event.start),
              toDate(event.end),
              event.title,
              event.description,
              eventImages
            );
            events.push(eventModel);
          }
          return events;
        }),
        catchError(() => {
          return of(extract('Could not load any events. Please create some'));
        }));
  }

  public createEvent(
    trophyHash: string,
    groupHash: string,
    locationHash: string,
    title: string,
    day: string,
    start: Moment,
    end: Moment,
    description: string,
    images?: Image[],
  ) {
    const parsedImages = [];
    for (const image of images) {
      parsedImages.push({url: image.url});
    }

    const data = {
      title: title,
      day: day,
      start: start.utc(false).format('X'),
      end: end.utc(false).format('X'),
      description: description,
      images: parsedImages,
    };
    this.logger.debug(data);
    const url = `/trophies/${trophyHash}/groups/${groupHash}/locations/${locationHash}/events`;
    return this.http.post(url, JSON.stringify(data))
      .pipe(
        map((res: any) => {
          if ('event_hash' in res) {
            return new EventModel(res.event_hash, day, start, end, title, description, images);
          }
          if ('validation' in res) {
            return res.validation;
          }
        })
      );
  }

  public deleteEvent(trophyHash: string, groupHash: string, locationHash: string, eventHash: string): Observable<string> {
    const url = `/trophies/${trophyHash}/groups/${groupHash}/locations/${locationHash}/events/${eventHash}`;
    return this.http.delete(url)
      .pipe(
        map((res: any) => {
          if (res.status === 200) {
            return res.info;
          }
          return extract('Could not delete Event. Please make sure that you are connected to the internet');
        })
      );
  }

}
