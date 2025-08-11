import { Component } from '@angular/core';
import { LoginRegister } from '../../layouts/login-register/login-register';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../services/supabase.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [LoginRegister, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  form: FormGroup;
  error: string = '';
  success: boolean = false;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      surnames: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.error = 'Rellena bien todos los campos antes de enviar';
      return;
    }

    const { email, password, name, surnames } = this.form.value;

    try {
      const { error } = await this.supabaseService.createUser(
        email,
        password,
        name,
        surnames
      );
      if (error) {
        if (error.message.includes('duplicate key value')) {
          this.error = 'El email ya está en uso. Intenta con otro.';
        } else {
          this.error = 'No se pudo registrar el usuario ' + error.message;
        }
        this.success = false;
        return;
      }
      console.log('Usuario creado correctamente');

      this.success = true;
      this.error = '';
      this.form.reset();
      alert('Confirma tu correo para poder iniciar sesión');
      this.router.navigate(['/login']);
    } catch (err: any) {
      this.error = 'Error inesperado' + err.message;
      this.success = false;
    }
  }
}
