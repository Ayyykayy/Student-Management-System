import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-student.html',
  styleUrls: ['./edit-student.css']
})
export class EditStudentComponent implements OnInit, OnDestroy {

  studentForm: FormGroup;
  studentId!: number;
  student: any = null;

  isLoadingStudent = true;
  isSubmitting = false;
  submitState: 'idle' | 'saving' | 'success' | 'error' = 'idle';

  errorMessage = '';
  loadError = '';

  courses = [
    { value: 'cs',  label: 'Computer Science' },
    { value: 'ba',  label: 'Business Administration' },
    { value: 'me',  label: 'Mechanical Engineering' },
    { value: 'ar',  label: 'Architecture' },
    { value: 'fa',  label: 'Fine Arts' }
  ];

  years = [
    { value: '1', label: 'First Year' },
    { value: '2', label: 'Second Year' },
    { value: '3', label: 'Third Year' },
    { value: '4', label: 'Fourth Year' }
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      fullName:   ['', [Validators.required, Validators.minLength(3)]],
      email:      ['', [Validators.required, Validators.email]],
      course:     ['', Validators.required],
      year:       ['', Validators.required],
      fatherName: [''],
      motherName: [''],
      phone:      ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-().]{7,20}$/)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || isNaN(+id)) {
      this.loadError = 'Invalid student ID in URL.';
      this.isLoadingStudent = false;
      return;
    }
    this.studentId = +id;
    this.fetchStudent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private fetchStudent(): void {
    this.isLoadingStudent = true;
    this.loadError = '';

    this.studentService.getStudentById(this.studentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (student: any) => {
          this.student = student;
          this.studentForm.patchValue({
            fullName:   student.name,
            email:      student.email,
            course:     student.course,
            year:       String(student.year),
            fatherName: student.fatherName ?? '',
            motherName: student.motherName ?? '',
            phone:      student.phoneNumber
          });
          this.isLoadingStudent = false;
        },
        error: (err: any) => {
          this.loadError = err?.error?.message
            || `Could not load student #${this.studentId}. Please go back and try again.`;
          this.isLoadingStudent = false;
        }
      });
  }

  get f() { return this.studentForm.controls; }

  formatStudentId(id: number): string {
    return String(id).padStart(4, '0');
  }

  isFieldInvalid(field: string): boolean {
    const c = this.studentForm.get(field);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }

  isFieldValid(field: string): boolean {
    const c = this.studentForm.get(field);
    return !!(c && c.valid && (c.dirty || c.touched));
  }

  get isDirty(): boolean {
    return this.studentForm.dirty;
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitState = 'saving';
    this.errorMessage = '';

    const formValue = this.studentForm.value;
    const payload = {
      id: this.studentId,
      name: formValue.fullName,
      email: formValue.email,
      course: formValue.course,
      year: Number(formValue.year),
      fatherName: formValue.fatherName,
      motherName: formValue.motherName,
      phoneNumber: formValue.phone
    };

    this.studentService.updateStudent(this.studentId, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.submitState = 'success';
          this.studentForm.markAsPristine();

          setTimeout(() => {
            this.submitState = 'idle';
            this.router.navigate(['/students']);
          }, 1800);
        },
        error: (err: any) => {
          this.isSubmitting = false;
          this.submitState = 'error';
          this.errorMessage = err?.error?.message || 'Update failed. Please try again.';

          setTimeout(() => { this.submitState = 'idle'; }, 3000);
        }
      });
  }

  onCancel(): void {
    this.router.navigate(['/students']);
  }

  onReset(): void {
    if (this.student) {
      this.studentForm.patchValue({
        fullName:   this.student.name,
        email:      this.student.email,
        course:     this.student.course,
        year:       String(this.student.year),
        fatherName: this.student.fatherName ?? '',
        motherName: this.student.motherName ?? '',
        phone:      this.student.phoneNumber
      });
      this.studentForm.markAsPristine();
    }
  }
}