import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  fullName = '';
  dob = '';
  fatherName = '';
  motherName = '';
  gender = '';
  qualification = '';
  email = '';
  mobile = '';
  aadhaar = '';
  address = '';
  photoName = '';
  errorMsg = '';

  constructor(private router: Router) {}

  onPhotoUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.photoName = input.files[0].name;
    }
  }

  onRegister() {
    if (!this.fullName || !this.email || !this.mobile) {
      this.errorMsg = 'Please fill in all required fields.';
      return;
    }
    this.errorMsg = '';
    this.router.navigate(['/login']);
  }
}