import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PublicationsService {

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get(`${environment.apiUrl}/publications`)
  }

  update(publicationId: string, body: any) {
    return this.http.patch(`${environment.apiUrl}/publications/${publicationId}`, body)
  }

  create(body: any) {
    return this.http.post(`${environment.apiUrl}/publications`, body)
  }

}
