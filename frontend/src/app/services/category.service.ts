import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  addCategory(category: any) {
    return this.httpClient.post(`${this.url}/category/add`, category, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }


  updateCategory(category: any) {
    return this.httpClient.patch(`${this.url}/category/update`, category);
  }

  getCategory() {
    return this.httpClient.get(`${this.url}/category/get`);
  }
}