package com.fpt.automatedtesting.subjectclasses;

import com.fpt.automatedtesting.classes.Class;
import com.fpt.automatedtesting.students.Student;
import com.fpt.automatedtesting.lecturers.Lecturer;
import com.fpt.automatedtesting.practicalexams.PracticalExam;
import com.fpt.automatedtesting.subjects.Subject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Subject_Class")
public class SubjectClass {

    @Id
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "subject_id", referencedColumnName = "id")
    private Subject subject;

    @ManyToOne
    @JoinColumn(name = "class_id", referencedColumnName = "id")
    private Class aClass;

    @OneToMany(mappedBy = "subjectClass",cascade = CascadeType.ALL)
    private List<PracticalExam> practicalExams;

    @ManyToMany(targetEntity = Student.class, mappedBy = "subjectClasses", fetch = FetchType.LAZY)
    private List<Student> students;

    @ManyToOne
    @JoinColumn(name = "lecturer_id", referencedColumnName = "id")
    private Lecturer lecturer;

    @Column(name = "active", columnDefinition = "boolean default true")
    private Boolean active;
}