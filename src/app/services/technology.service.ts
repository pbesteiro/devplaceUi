import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TechnologyModel} from "../models/technology.model";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root'})
export class TechnologyService {
  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<TechnologyModel[]>(`${environment.apiUrl}/technologies`);
  }

  create(technology: string) {
    return this.http.post(`${environment.apiUrl}/technologies`, {name: technology})
  }
}
