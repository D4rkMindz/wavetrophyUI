export interface Image {
  url: string;
}

export class ImageModel implements Image {
  private _url: string;

  constructor(url: string) {
    this._url = url;
  }

  get url(): string {
    return this._url;
  }
}
