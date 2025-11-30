import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { User } from '../../model/user-interface';

@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  isMobileMenuOpen = signal(false);
  authService = inject(AuthService);
  currentUser: User | null = null;

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((value) => !value);
  }

  constructor() {
    this.currentUser = this.authService.getUser();
  }

  onLogout() {
    this.authService.logout();
  }
}
