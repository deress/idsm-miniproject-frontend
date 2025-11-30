import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../services/users-service';

@Component({
  selector: 'app-user-create',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './user-create.html',
  styleUrl: './user-create.css',
})
export class UserCreate {
  private fb = inject(FormBuilder);
  private userService = inject(UsersService);
  private router = inject(Router);
  userId!: number;

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.valid) {
      if (this.form.value.password !== this.form.value.confirmPassword) {
        alert('Password tidak cocok!');
        return;
      }

      this.userService.createUser(this.form.value).subscribe({
        next: () => {
          alert('Profile created successfully!');
          this.router.navigate(['/']);
        },
        error: () => alert('User create failed!'),
      });
    } else {
      alert('Mohon lengkapi data');
      return;
    }
  }
}
