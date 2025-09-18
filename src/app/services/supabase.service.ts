import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async createUser(
    email: string,
    password: string,
    name: string,
    surnames: string
  ) {
    const { data, error } = await this.supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'https://stock-up-green.vercel.app/login',
        data: {
          name,
          surnames,
        },
      },
    });

    if (error) {
      return { error };
    }

    if (data.user) {
      const { error: insertError } = await this.supabase.from('users').insert({
        email: email,
        name: name,
        surnames: surnames,
        auth_id: data.user.id,
      });

      if (insertError) {
        return { error: insertError };
      }
      return { success: true };
    }
    return { error: new Error('No se pudo crear el usuario') };
  }

  async Login(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async getProducts(userId: string) {
    const { data, error } = await this.supabase
      .from('pantry')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.log('Error fetching products', error);
      return [];
    }
    return data || [];
  }

  async getProductsOfCurrentUser() {
    const user = await this.getUser();
    if (!user) return [];
    return this.getProducts(user.id);
  }
  async getUser() {
    const { data } = await this.supabase.auth.getUser();
    console.log(data);
    return data.user;
  }

  async getUserId() {
    const user = await this.getUser();
    if (!user) {
      return null;
    } else {
      return user.id;
    }
  }
  //ESTO LO TENGO QUE REVISAR PORQUE NO FUNCIONA
  resendConfirmation(email: string) {
    return this.supabase.auth.resend({
      type: 'signup',
      email,
    });
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      console.error('No se ha podido cerrar la sesión', error);
    } else {
      this.router.navigate(['/login']);
    }
  }

  async getUserName(): Promise<string | null> {
    const { data, error } = await this.supabase.auth.getUser();
    if (error || !data.user) {
      return null;
    }
    const name = data.user.user_metadata['name'];
    if (!name) {
      return null;
    }
    return name;
  }

  async addToPantry(userId: string, code: string, quantity: number) {
    const { data, error } = await this.supabase.from('pantry').upsert(
      {
        user_id: userId,
        product_id: code,
        quantity,
      },
      {}
    );
    if (error) {
      console.log('Error guardando en la despensa');
    }
  }
}
