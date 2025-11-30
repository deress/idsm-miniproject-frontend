import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  errorMessage = signal<string>('');

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.errorMessage.set('Email or Password Invalid.');
        },
      });
    }
  }
}
