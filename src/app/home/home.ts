import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar-component/navbar-component';
import { UserListComponent } from '../components/user-list-component/user-list-component';

@Component({
  selector: 'app-home',
  imports: [UserListComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
