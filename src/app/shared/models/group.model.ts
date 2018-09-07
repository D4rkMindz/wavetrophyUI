export interface Group {
  hash: string;
  name: string;
  wavetrophy_hash: string;
}

export class GroupModel implements Group {
  private readonly _hash: string;
  private readonly _name: string;
  private readonly _wavetrophy_hash: string;

  constructor(hash: string, name: string, wavetrophy_hash: string) {
    this._hash = hash;
    this._name = name;
    this._wavetrophy_hash = wavetrophy_hash;
  }


  get hash(): string {
    return this._hash;
  }

  get name(): string {
    return this._name;
  }

  get wavetrophy_hash(): string {
    return this._wavetrophy_hash;
  }

}
