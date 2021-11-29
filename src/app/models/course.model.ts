export class CourseModel {
  _id: string;
  name: string;
  photo: string;
  requirements: string;
  description: string;
  contents: string;
  technology: string[];

  constructor(
    _id: string,
    name: string,
    photo: string,
    requirements: string,
    description: string,
    contents: string,
    technology: string[],
  ) {
    this._id = _id;
    this.name = name;
    this.photo = photo;
    this.requirements = requirements;
    this.description = description;
    this.contents = contents;
    this.technology = []
  }
}
