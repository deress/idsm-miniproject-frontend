import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  });

  errorMessage = signal<string>('');

  onSubmit() {
    if (this.form.valid) {
      if (this.form.value.password !== this.form.value.confirmPassword) {
        alert('Password tidak cocok!');
        return;
      }

      this.authService.register(this.form.value).subscribe({
        next: () => {
          alert('Profile created successfully!');
          this.router.navigate(['/login']);
        },
        error: () => alert('User create failed!'),
      });
    } else {
      alert('Mohon lengkapi data');
      return;
    }
  }
}
