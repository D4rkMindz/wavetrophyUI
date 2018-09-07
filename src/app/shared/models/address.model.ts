import {AddressText} from '@app/shared/models/address-text.model';
import {Url} from '@app/shared/models/url.model';


export interface Address {
  lat: string;
  lon: string;
  url: Url;
  text: AddressText;
}

export class AddressModel implements Address {
  private readonly _lat: string;
  private readonly _lon: string;
  private readonly _url: Url;
  private readonly _text: AddressText;

  constructor(lat: string, lon: string, url: Url, text: AddressText) {
    this._lat = lat;
    this._lon = lon;
    this._url = url;
    this._text = text;
  }


  get lat(): string {
    return this._lat;
  }

  get lon(): string {
    return this._lon;
  }

  get url(): Url {
    return this._url;
  }

  get text(): AddressText {
    return this._text;
  }
}
