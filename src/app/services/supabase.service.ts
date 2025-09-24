import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ProductCard } from '../component/product-card/product-card';

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

  fetchProduct(code: string): Promise<ProductType | null> {
    const isBarcode = /^\d{8,14}$/.test(code);

    if (!isBarcode) {
      return Promise.resolve(null);
    }

    return fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
      .then((res) => res.json() as Promise<OpenFoodFactsResponse>)
      .then((data) => {
        if (data.status === 1) {
          const productInfo = data.product;
          console.log('Producto:', data.product);
          return productInfo;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.error('Error al hacer la petición:', err);
        return null;
      });
  }

  async contains(code: string) {
    const user = await this.getUserId();
    const { data, error } = await this.supabase
      .from('pantry')
      .select('*')
      .eq('user_id', user)
      .eq('product_id', code);

    if (data && data.length > 0) {
      return true;
    }
    return false;
  }

  async getProducts(userId: string) {
    const { data, error } = await this.supabase
      .from('pantry')
      .select('*')
      .eq('user_id', userId)
      .order('quantity');

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
    try {
      const { error, data } = await this.supabase
        .from('pantry')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', code)
        .maybeSingle();

      if (error) {
        return;
      }

      const productInfo = await this.fetchProduct(code);
      console.log('=====Esto es productInfo', productInfo?.product_name);
      if (data == null) {
        await this.supabase.from('pantry').insert({
          user_id: userId,
          product_id: code,
          quantity,
          product_name: productInfo?.product_name?.trim()
            ? productInfo.product_name
            : productInfo?.brands,
          image_url: productInfo?.image_url,
        });
      } else {
        const { data, error } = await this.supabase

          .from('pantry')
          .select('quantity')
          .eq('user_id', userId)
          .eq('product_id', code);

        if (error) {
          return;
        }

        const quantityNumber =
          data.length > 0 ? data[0].quantity + quantity : 0;

        await this.supabase
          .from('pantry')
          .update({ quantity: quantityNumber })
          .eq('user_id', userId)
          .eq('product_id', code);
      }
    } catch (e) {
      console.log('Error guardando en la despensa', e);
    }
  }

  async decreaseQuantity(product_id: string) {
    if (product_id) {
      let user_id = await this.getUserId();
      if (user_id) {
        const { data, error } = await this.supabase
          .from('pantry')
          .select('*')
          .eq('user_id', user_id)
          .eq('product_id', product_id);

        if (error) {
          return;
        }
        console.log(data);
        const newQuantity = data.length > 0 ? data[0].quantity - 1 : 0;

        await this.supabase
          .from('pantry')
          .update({ quantity: newQuantity })
          .eq('user_id', user_id)
          .eq('product_id', product_id);
      }
    }
  }

  async deletePantryItem(product_id: string) {
    if (product_id) {
      const user_id = await this.getUserId();
      if (user_id) {
        const { error } = await this.supabase
          .from('pantry')
          .delete()
          .eq('user_id', user_id)
          .eq('product_id', product_id);

        if (error) {
          console.log('Error al borrar la fila de la tabla pantry');
        }
      }
    } else {
      return;
    }
  }
}
