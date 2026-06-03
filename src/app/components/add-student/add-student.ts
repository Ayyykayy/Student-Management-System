import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-student.html',
  styleUrls: ['./add-student.css']
})
export class AddStudentComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  studentForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  courses = [
    { value: 'cse', label: 'Computer Science' },
    { value: 'ba', label: 'Business Administration' },
    { value: 'me', label: 'Mechanical Engineering' },
    { value: 'ar', label: 'Architecture' }
  ];

  years = [
    { value: '1', label: 'First Year' },
    { value: '2', label: 'Second Year' },
    { value: '3', label: 'Third Year' },
    { value: '4', label: 'Fourth Year' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      course: [
        '',
        Validators.required
      ],
      year: [
        '',
        Validators.required
      ],
      fatherName: [''],
      motherName: [''],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+?[0-9\s\-().]{7,20}$/)
        ]
      ]
    });
  }

  get f() {
    return this.studentForm.controls;
  }

  isFieldInvalid(field: string): boolean {
    const control = this.studentForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isFieldValid(field: string): boolean {
    const control = this.studentForm.get(field);
    return !!(control && control.valid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const data = this.studentForm.value;
    const student = {
      name: data.fullName,
      email: data.email,
      course: data.course,
      year: Number(data.year),
      fatherName: data.fatherName,
      motherName: data.motherName,
      phoneNumber: data.phone
    };

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.studentService.addStudent(student)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          alert("Student Saved Successfully");
          this.studentForm.reset();
          this.router.navigate(['/students']);
        },
        error: (err: any) => {

          console.log("FULL ERROR:", err);

          this.isSubmitting = false;

          this.errorMessage = err.message;

        }
      });
  }

  onClear() {
    this.studentForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
  }

  goBack() {
    this.router.navigate(['/students']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}