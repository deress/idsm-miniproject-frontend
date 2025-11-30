import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserResponse, UsersListResponse } from '../model/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:8000/api/users';
  http = inject(HttpClient);

  getAllUsers() {
    return this.http.get<UsersListResponse>(this.apiUrl);
  }

  getDetailUser(id: number) {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`);
  }

  createUser(data: { name: string; email: string; password: string }) {
    return this.http.post(this.apiUrl, data);
  }

  updateUser(id: number, data: { name: string; email: string }) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  changePassword(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteUser(id: number) {
    return this.http.delete<UserResponse>(`${this.apiUrl}/${id}`);
  }
}
