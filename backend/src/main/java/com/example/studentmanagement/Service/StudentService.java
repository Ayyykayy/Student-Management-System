package com.example.studentmanagement.Service;

import com.example.studentmanagement.Entity.StudentMaster;
import com.example.studentmanagement.Repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentMaster createStudent(StudentMaster student){
        return studentRepository.save(student);
    }
    public List<StudentMaster> getAllStudents() {
        return studentRepository.findAll();
    }
    public StudentMaster getStudentById(Long id){
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student Not Found"));
    }
    public void deleteStudent(Long id){
        studentRepository.deleteById(id);
    }

    public StudentMaster updateStudent(
            Long id,
            StudentMaster student){

        StudentMaster existing =
                studentRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Student Not Found"));

        existing.setName(student.getName());
        existing.setEmail(student.getEmail());
        existing.setCourse(student.getCourse());
        existing.setYear(student.getYear());
        existing.setFatherName(student.getFatherName());
        existing.setMotherName(student.getMotherName());
        existing.setPhoneNumber(student.getPhoneNumber());

        return studentRepository.save(existing);
    }
}