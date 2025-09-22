import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { ProductCard } from '../component/product-card/product-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pantry',
  imports: [ProductCard, CommonModule],
  templateUrl: './pantry.html',
  styleUrl: './pantry.scss',
})
export class Pantry implements OnInit {
  data: PantryProductType[] = [];
  constructor(private supabase: SupabaseService) {}
  async ngOnInit(): Promise<void> {
    this.data = await this.supabase.getProductsOfCurrentUser();
    console.log(this.data);
  }
}
