import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css']
})
export class StudentListComponent implements OnInit {

  students: any[] = [];

  isLoading = false;
  errorMessage = '';

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.isLoading = true;
    this.studentService.getStudents()
      .subscribe({
        next: (data: any[]) => {
          console.log("DATA RECEIVED:", data);
          this.students = data;
          this.isLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.errorMessage = "Failed to load students";
          this.isLoading = false;
        }
      });
  }

  deleteStudent(id: number) {
    if (confirm("Delete this student?")) {
      this.studentService.deleteStudent(id)
        .subscribe({
          next: () => {
            alert("Student Deleted");
            this.loadStudents();
          },
          error: (err: any) => {
            console.log(err);
          }
        });
    }
  }

  getInitials(name: string) {
    return name ? name.charAt(0).toUpperCase() : '';
  }

  getAvatarClass(index: number) {
    const colors = ['avatar-teal', 'avatar-amber', 'avatar-blue', 'avatar-rose', 'avatar-violet', 'avatar-green'];
    return colors[index % colors.length];
  }

  formatStudentId(id: number) {
    return "#ST-" + id;
  }
}