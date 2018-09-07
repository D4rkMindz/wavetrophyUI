import {Image} from '@app/shared/models/image.model';
import {Address} from '@app/shared/models/address.model';
import {WaveEvent} from '@app/shared/models/event.model';


export interface Location {
  hash: string;
  title: string;
  description: string;
  address: Address;
  images: Image[];
  events: WaveEvent[];
}

export class LocationModel implements Location {
  private readonly _hash: string;
  private readonly _title: string;
  private readonly _description: string;
  private readonly _address: Address;
  private readonly _images: Image[];
  private readonly _events: WaveEvent[];

  constructor(hash: string,
              title: string,
              description: string,
              address: Address,
              images: Image[],
              events: WaveEvent[]) {
    this._hash = hash;
    this._title = title;
    this._description = description;
    this._address = address;
    this._images = images;
    this._events = events;
  }

  get hash(): string {
    return this._hash;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get address(): Address {
    return this._address;
  }

  get images(): Image[] {
    return this._images;
  }

  get events(): WaveEvent[] {
    return this._events;
  }
}
