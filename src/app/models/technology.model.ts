export class TechnologyModel {
  _id?: string;
  name: string;
  active: boolean;

  constructor(
    name: string,
    active: boolean = true
  ) {
    this.name = name;
    this.active = active;
  }
}
