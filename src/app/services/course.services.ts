import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { CourseModel } from "../models/course.model";

@Injectable({ providedIn: 'root' })
export class CourseService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<CourseModel[]>(`${environment.apiUrl}/courses`);
  }

  create(course: CourseModel) {
    return this.http.post(`${environment.apiUrl}/courses`, course);
  }

  update(id: string, course: any) {
    return this.http.patch(`${environment.apiUrl}/courses/${id}`, course)
  }
}
