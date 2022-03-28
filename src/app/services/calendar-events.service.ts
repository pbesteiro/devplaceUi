import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {CourseModel} from "../models/course.model";

@Injectable({ providedIn: 'root' })
export class CalendarEventsService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>(`${environment.apiUrl}/classes`)
  }

  create(classes: any) {
    return this.http.post(`${environment.apiUrl}/classes`, classes);
  }

  update(calendarEventId: string, assistants: any) {
    return this.http.patch(`${environment.apiUrl}/classes/${calendarEventId}`, assistants);
  }

  updateStatus(calendarEventId: string, assistants: any) {
    return this.http.patch(`${environment.apiUrl}/classes/${calendarEventId}/update-status`, assistants);
  }

  remove(calendarEventId: string) {
    return this.http.delete(`${environment.apiUrl}/calendar-events/${calendarEventId}`);
  }

  getOne(calendarEventId: string) {
    return this.http.get(`${environment.apiUrl}/classes/${calendarEventId}`);
  }

}
