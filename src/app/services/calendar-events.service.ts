import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {CourseModel} from "../models/course.model";

@Injectable({ providedIn: 'root' })
export class CalendarEventsService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>(`${environment.apiUrl}/calendar-events`)
  }

  create(calendarEvent: any) {
    return this.http.post(`${environment.apiUrl}/calendar-events`, calendarEvent);
  }

  update(calendarEventId: string, assistants: any) {
    return this.http.patch(`${environment.apiUrl}/calendar-events/${calendarEventId}`, assistants);
  }

}
