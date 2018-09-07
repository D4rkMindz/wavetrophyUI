
export interface Trophy {
  hash: string;
  name: string;
  country: string;
}

export class TrophyModel implements Trophy {

  private readonly _hash: string;
  private readonly _name: string;
  private readonly _country: string;
  
  constructor(hash: string, name: string, country: string, ) {
    this._hash = hash;
    this._name = name;
    this._country = country;
  }

  get hash(): string {
    return this._hash;
  }

  get name(): string {
    return this._name;
  }

  get country(): string {
    return this._country;
  }
}
