import {TechnologyModel} from "./technology.model";

export class CourseModel {
  _id: string;
  name: string;
  photo: string;
  requirements: string;
  description: string;
  contents: string;
  technology: TechnologyModel;

  constructor(
    _id: string,
    name: string,
    photo: string,
    requirements: string,
    description: string,
    contents: string,
    technology: TechnologyModel,
  ) {
    this._id = _id;
    this.name = name;
    this.photo = photo;
    this.requirements = requirements;
    this.description = description;
    this.contents = contents;
    this.technology = new TechnologyModel('', '', false)
  }
}
