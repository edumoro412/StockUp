import { Component } from '@angular/core';
import { LoginRegister } from '../../layouts/login-register/login-register';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [LoginRegister, CommonModule, ReactiveFormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {
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
    });
  }

  async LogIn() {
    this.error = '';
    this.success = false;

    if (this.form.invalid) {
      this.error = 'Completa todos los campos correctamente.';
      return;
    }

    const { email, password } = this.form.value;

    try {
      const { error } = await this.supabaseService.Login(email, password);

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          this.error =
            'Tienes que confirmar tu correo. Revisa tu bandeja de entrada o spam 📬';
        } else if (error.message.includes('Invalid login credentials')) {
          this.error =
            'La contraseña o el correo son incorrectos. Inténtalo de nuevo.';
        } else {
          this.error = 'No se pudo iniciar sesión: ' + error.message;
        }
        this.success = false;
        return;
      } else {
        this.success = true;
        this.router.navigate(['/']);
      }
    } catch (err) {
      this.error = 'Algo ha salido mal. Intentalo más tarde';
    }
  }

  async resendEmailConfirmation(event: Event) {
    event.preventDefault();

    const email = this.form.get('email')?.value;
    const { error } = await this.supabaseService.resendConfirmation(email);

    if (error) {
      this.error = 'No se pudo reenviar el correo: ' + error.message;
      console.log('No se pudo reenviar el correo de confirmación:', error);
    } else {
      this.error =
        'Email de confirmacion reenviado. Revisa tu bandeja de entrada o spam 📬';
      console.log('Email de confirmación reenviado correctamente');
    }
  }
}
