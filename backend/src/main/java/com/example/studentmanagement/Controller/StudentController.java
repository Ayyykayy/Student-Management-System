package com.example.studentmanagement.Controller;

import com.example.studentmanagement.Entity.StudentMaster;
import com.example.studentmanagement.Service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @PostMapping
    public StudentMaster createStudent(@RequestBody StudentMaster student) {
        return studentService.createStudent(student);
    }

    @GetMapping
    public List<StudentMaster> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public StudentMaster getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    @PutMapping("/{id}")
    public StudentMaster updateStudent(
            @PathVariable Long id,
            @RequestBody StudentMaster student) {

        return studentService.updateStudent(id, student);
    }
}