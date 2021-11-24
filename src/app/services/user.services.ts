import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user.model";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/users`);
  }
}
