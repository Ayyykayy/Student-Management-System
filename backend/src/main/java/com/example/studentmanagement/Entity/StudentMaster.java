package com.example.studentmanagement.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@jakarta.persistence.Entity
@Table(name = "student_master")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String name;

    private String email;

    private String course;

    private Integer year;

    private String fatherName;

    private String motherName;

    private String phoneNumber;
}
