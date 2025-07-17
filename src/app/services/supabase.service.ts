import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  getUsers() {
    return this.supabase.from('users').select('*');
  }
  createUser(email: string, password: string, name: string, surnames: string) {
    return this.supabase.from('users').insert({
      email: email,
      password: password,
      name: name,
      surnames: surnames,
    });
  }
}
