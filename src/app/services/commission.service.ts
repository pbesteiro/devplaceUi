import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class CommissionService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<any[]>(`${environment.apiUrl}/commissions`)
  }

  create(name: any) {
    return this.http.post(`${environment.apiUrl}/commissions`, name);
  }

  update(commissionId: string, calendarEventIds: any) {
    return this.http.patch(`${environment.apiUrl}/commissions/${commissionId}`, calendarEventIds);
  }
}
