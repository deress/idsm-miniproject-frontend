import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../services/users-service';

@Component({
  selector: 'app-user-edit',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.css',
})
export class UserEdit implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UsersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  userId!: number;

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = +id;
      this.userService.getDetailUser(this.userId).subscribe((res) => {
        this.form.patchValue({
          name: res.data.name,
          email: res.data.email,
        });
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.userService.updateUser(this.userId, this.form.value).subscribe({
        next: () => {
          alert('Profile update successful!');
          this.router.navigate(['/']);
        },
        error: () => alert('Profil update failed!'),
      });
    } else {
      alert('Mohon lengkapi data');
      return;
    }
  }
}
