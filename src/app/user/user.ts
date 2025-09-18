import { Component, OnInit } from '@angular/core';
import { Header } from '../layouts/header/header';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-user',
  imports: [Header],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit {
  name: string = 'Usuario';
  constructor(private supabaseService: SupabaseService) {}
  ngOnInit(): void {
    this.supabaseService.getUserName().then((name) => {
      if (name) {
        this.name = name;
      }
    });
  }

  signOut() {
    this.supabaseService.signOut();
  }
}
