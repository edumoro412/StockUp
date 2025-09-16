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
  products: any[] = []; //LO TENGO QUE TIPAR

  constructor(private supabaseService: SupabaseService) {}

  //AQUI SACO TODOS LOS PRODUCTOS DEL USUARIO
  async ngOnInit() {
    this.products = await this.supabaseService.getProductsOfCurrentUser();
  }
}
