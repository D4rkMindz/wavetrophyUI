export interface Url {
  android: string;
  ios: string;
}

export class UrlModel implements Url {
  private readonly _android: string;
  private readonly _ios: string;

  constructor(android: string, ios: string) {
    this._android = android;
    this._ios = ios;
  }

  get android(): string {
    return this._android;
  }

  get ios(): string {
    return this._ios;
  }
}
