import { Component } from '@angular/core';
import { LoginRegister } from '../../layouts/login-register/login-register';

@Component({
  selector: 'app-register',
  imports: [LoginRegister],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {}
