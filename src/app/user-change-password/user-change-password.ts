import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../services/users-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-change-password',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './user-change-password.html',
  styleUrl: './user-change-password.css',
})
export class UserChangePassword implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UsersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  userId!: number;

  form: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.userId = +id;
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.form.value.password !== this.form.value.confirmPassword) {
        alert('Password tidak cocok!');
        return;
      }
      this.userService.changePassword(this.userId, this.form.value).subscribe({
        next: () => {
          alert('Password has been changed!');
          this.router.navigate(['/']);
        },
        error: () => alert('Password change failed!'),
      });
    }
  }
}
