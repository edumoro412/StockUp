import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-favorites-card',
  imports: [],
  templateUrl: './favorites-card.html',
  styleUrl: './favorites-card.scss',
})
export class FavoritesCard implements OnInit {
  data: FavoritesProductType[] | null = null;
  loading: boolean = false;

  constructor(private supabase: SupabaseService, private route: Router) {}
  async ngOnInit(): Promise<void> {
    try {
      this.loading = true;
      const favorites = await this.supabase.getFavorites();
      if (favorites.success) {
        this.data = favorites.data;
      }
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  goDetails(id: string) {
    this.route.navigate(['/product', id]);
  }
}
