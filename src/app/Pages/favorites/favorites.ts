import { Component, OnInit } from '@angular/core';
import { FavoritesCard } from '../../component/favorites-card/favorites-card';
import { InputFilter } from '../../component/input-filter/input-filter';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';
import { FactoryOrValue } from 'rxjs';

@Component({
  selector: 'app-favorites',
  imports: [FavoritesCard, InputFilter],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites implements OnInit {
  data: FavoritesProductType[] | null = null;
  filteredData: FavoritesProductType[] = [];
  loading: boolean = false;

  constructor(private supabase: SupabaseService, private route: Router) {}
  async ngOnInit(): Promise<void> {
    try {
      this.loading = true;
      const favorites = await this.supabase.getFavorites();
      if (favorites.success) {
        this.data = favorites.data;
        this.filteredData = [...(favorites.data ?? [])];
      }
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  goDetails(id: string) {
    this.route.navigate(['/product', id]);
  }

  filterData(data: FavoritesProductType[]) {
    this.filteredData = data;
  }
}
