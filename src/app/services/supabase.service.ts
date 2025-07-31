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

  async getUser() {
    const { data } = await this.supabase.auth.getUser();
    return data.user;
  }
  //ESTO LO TENGO QUE REVISAR PORQUE NO FUNCIONA
  resendConfirmation(email: string) {
    return this.supabase.auth.resend({
      type: 'signup',
      email,
    });
  }
}
