import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private router: Router) {}
  goHome() {
    this.router.navigate(['/']);
  }
}
