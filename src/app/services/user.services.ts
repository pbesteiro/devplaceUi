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

  getAllManagers() {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/users?role=MANAGER`);
  }

  getAllStudents() {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/users?role=STUDENT`);
  }

  getAllMentors() {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/users?role=MENTOR`);
  }

  create(user: any) {
    return this.http.post(`${environment.apiUrl}/users`, user)
  }

  update(userId: string, user: any) {
    return this.http.patch(`${environment.apiUrl}/users/${userId}`, user)
  }

  updatePassword(userId: string, body: any) {
    return this.http.patch(`${environment.apiUrl}/users/${userId}/update-password`, body)
  }

  cleanPassword(userId: string, body: any) {
    return this.http.patch(`${environment.apiUrl}/users/${userId}/clean-password`, body)
  }
}
