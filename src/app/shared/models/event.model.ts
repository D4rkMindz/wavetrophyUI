import {Image} from '@app/shared/models/image.model';


export interface WaveEvent {
  hash: string;
  day: string;
  start: string;
  title: string;
  description: string;
  images: Image[];
}

export class EventModel implements WaveEvent {
  private readonly _hash: string;
  private readonly _day: string;
  private readonly _start: string;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _images: Image[];

  constructor(hash: string, day: string, start: string, title: string, description: string, images: Image[]) {
    this._hash = hash;
    this._day = day;
    this._start = start;
    this._title = title;
    this._description = description;
    this._images = images;
  }

  get hash(): string {
    return this._hash;
  }

  get day(): string {
    return this._day;
  }

  get start(): string {
    return this._start;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get images(): Image[] {
    return this._images;
  }
}
