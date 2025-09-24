import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  name: string | undefined = undefined;

  constructor(private supabaseService: SupabaseService) {}
  ngOnInit(): void {
    this.supabaseService.getUserName().then((name) => {
      if (name) {
        this.name = name;
      }
    });
  }
}
