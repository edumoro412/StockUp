import { Component, OnInit } from '@angular/core';
import { Header } from '../../layouts/header/header';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-home',
  imports: [Header],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  name: string = 'Usuario';

  constructor(private supabaseService: SupabaseService) {}
  ngOnInit(): void {
    this.supabaseService.getUserName().then((name) => {
      if (name) {
        this.name = name;
      }
    });
  }
}
