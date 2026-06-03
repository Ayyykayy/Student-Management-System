import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private readonly apiUrl = 'http://localhost:8080/students';

  constructor(private http: HttpClient) { }


  getStudents(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl);

  }


  getStudentById(id: number): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${id}`
    );

  }


  addStudent(student: any): Observable<any> {

    return this.http.post(
      this.apiUrl,
      student,
      {
        responseType: 'text'
      }
    );

  }


  updateStudent(id: number, student: any): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      student,
      {
        responseType: 'text'
      }
    );

  }


  deleteStudent(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        responseType: 'text'
      }
    );

  }

}