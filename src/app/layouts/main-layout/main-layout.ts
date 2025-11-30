import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar-component/navbar-component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
