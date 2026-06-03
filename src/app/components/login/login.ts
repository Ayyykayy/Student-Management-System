import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  isSuccess = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMsg = '';
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { username, password } = this.loginForm.value;

    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('token', 'admin-token');
        this.isSuccess = true;
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(['/students']);
        }, 800);
      } else {
        this.isLoading = false;
        this.errorMsg = 'Invalid username or password';
      }
    }, 1000);
  }
}