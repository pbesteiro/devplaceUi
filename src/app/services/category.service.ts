import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CategoryModel} from "../models/category.model";

@Injectable({ providedIn: 'root'})
export class CategoryService {
  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<CategoryModel[]>(`${environment.apiUrl}/categories`);
  }

  create(category: string) {
    return this.http.post(`${environment.apiUrl}/categories`, {name: category})
  }

  update(id: string, body: any) {
    return this.http.patch(`${environment.apiUrl}/categories/${id}`, body)
  }
}
