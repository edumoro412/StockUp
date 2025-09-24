import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit {
  name: string | undefined = undefined;
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
