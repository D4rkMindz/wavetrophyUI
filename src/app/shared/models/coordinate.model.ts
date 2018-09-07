export interface Coordinate {
  lat: string;
  lon: string;
}

export class CoordinateModel implements Coordinate {
  private readonly _lat: string;
  private readonly _lon: string;

  constructor(lat: string, lon: string) {
    this._lat = lat;
    this._lon = lon;
  }

  get lat(): string {
    return this._lat;
  }

  get lon(): string {
    return this._lon;
  }
}
