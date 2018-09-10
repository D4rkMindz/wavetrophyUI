import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {extract} from '@app/core';
import {AddressModel} from '@app/shared/models/address.model';
import {AddressTextModel} from '@app/shared/models/address-text.model';
import {Image, ImageModel} from '@app/shared/models/image.model';
import {EventModel} from '@app/shared/models/event.model';
import {Location, LocationModel} from '@app/shared/models/location.model';
import {Coordinate} from '@app/shared/models/coordinate.model';
import {UrlModel} from '@app/shared/models/url.model';
import {toDate} from '@app/app.module';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  public getLocations(trophyHash: string, groupHash: string): Observable<Location[] | string> {
    const url = `/trophies/${trophyHash}/groups/${groupHash}/stream`;
    return this.http.cache()
      .get(url)
      .pipe(
        map((res: any) => {
          const locations = [];
          for (const location of res.locations) {
            const aText = location.address.text;
            const addressText = new AddressTextModel(aText.zip, aText.city, aText.street, aText.comment);
            const address = new AddressModel(
              location.address.lat,
              location.address.lon,
              location.address.url,
              addressText
            );
            const images = [];
            for (const image of location.images) {
              images.push(new ImageModel(image.url));
            }
            const events = [];
            for (const event of location.events) {
              const eventImages = [];
              for (const image of event.images) {
                eventImages.push(new ImageModel(image.url));
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
            const locationModel = new LocationModel(
              location.hash,
              location.title,
              location.description,
              address,
              images,
              events
            );
            locations.push(locationModel);
          }
          return locations;
        }),
        catchError(() => {
          return of(extract('Could not load any locations. Please create some'));
        })
      );
  }

  public createLocation(
    trophyHash: string,
    groupHash: string,
    zipcode: string,
    name: string,
    street: string,
    city: string,
    coordinates: Coordinate,
    additionalStops: Coordinate[],
    description: string,
    images: Image[],
  ) {
    console.log(trophyHash, groupHash);
    const parsedImages = [];
    for (const image of images) {
      parsedImages.push({url: image.url});
    }

    const data = {
      zipcode: zipcode,
      name: name,
      street: street,
      city: city,
      lat: coordinates.lat,
      lon: coordinates.lon,
      additional_stops: additionalStops,
      description: description,
      images: images,
    };
    console.log(data);
    const url = `/trophies/${trophyHash}/groups/${groupHash}/locations`;
    return this.http.post(url, JSON.stringify(data))
      .pipe(
        map((res: any) => {
          if ('location_hash' in res) {
            const mapUrl = new UrlModel(res.url.android, res.url.ios);
            const textAddress = new AddressTextModel(zipcode, city, street);
            const address = new AddressModel(coordinates.lat, coordinates.lon, mapUrl, textAddress);
            const location = new LocationModel(res.location_hash, name, description, address, images, []);
            console.log(location);
            return location;
          }
          if ('validation' in res) {
            return res.validation;
          }
        })
      );
  }

  public deleteLocation(trophyHash: string, groupHash: string, locationHash: string): Observable<string> {
    const url = `/trophies/${trophyHash}/groups/${groupHash}/locations/${locationHash}`;
    return this.http.delete(url)
      .pipe(
        map((res: any) => {
          if (res.status === 200) {
            return res.info;
          }
          return extract('Could not delete location. Please make sure that you are connected to the internet');
        })
      );
  }
}
