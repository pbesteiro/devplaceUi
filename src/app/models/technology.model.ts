export class TechnologyModel {
  _id: string;
  name: string;
  active: boolean;

  constructor(
    _id: string,
    name: string,
    active: boolean = true
  ) {
    this._id = _id;
    this.name = name;
    this.active = active;
  }
}
