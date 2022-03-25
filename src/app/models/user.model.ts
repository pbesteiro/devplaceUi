export class UserModel {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  active: boolean;
  roles: string[];
  classes: any[];
  accessToken?: string | undefined;

  constructor(
    _id: string,
    name: string,
    lastName: string,
    email: string,
    active: boolean,
    roles: string[],
    classes: any[],
    accessToken?: string) {
    this._id = _id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.active = active;
    this.roles = roles;
    this.classes = classes;
    this.accessToken = accessToken
  }
}
