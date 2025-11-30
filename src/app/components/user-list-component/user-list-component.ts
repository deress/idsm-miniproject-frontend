import { Component, inject, OnInit, signal } from '@angular/core';
import { User, UsersListResponse } from '../../model/user-interface';
import { UsersService } from '../../services/users-service';
import { catchError, finalize, map, of } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list-component',
  imports: [RouterLink],
  templateUrl: './user-list-component.html',
  styleUrl: './user-list-component.css',
})
export class UserListComponent implements OnInit {
  userService = inject(UsersService);
  users = signal<User[]>([]);
  isLoading = signal<boolean>(true);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading.set(true);
    this.userService
      .getAllUsers()
      .pipe(
        map((response: UsersListResponse) => {
          return response.data;
        }),
        catchError((err) => {
          this.errorMessage.set('Gagal mengambil data dari server.');
          return of([]);
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe((usersList) => {
        this.users.set(usersList);
      });
  }

  onDelete(id: number) {
    if (confirm('You sure to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users.update((currentUsers) => currentUsers.filter((user) => user.id !== id));
        },
        error: (err) => {
          console.error('Gagal hapus:', err);
          alert('Gagal menghapus user. Cek console untuk detail.');
        },
      });
    }
  }
}
