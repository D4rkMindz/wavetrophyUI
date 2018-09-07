export interface AddressText {
  zip: string;
  city: string;
  street: string;
  comment?: any;
}

export class AddressTextModel implements AddressText {
  private readonly _zip: string;
  private readonly _city: string;
  private readonly _street: string;
  private readonly _comment?: string;

  constructor(zip: string, city: string, street: string, comment?: string) {
    this._zip = zip;
    this._city = city;
    this._street = street;
    this._comment = comment;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  get street(): string {
    return this._street;
  }

  get comment(): string {
    return this._comment;
  }
}
