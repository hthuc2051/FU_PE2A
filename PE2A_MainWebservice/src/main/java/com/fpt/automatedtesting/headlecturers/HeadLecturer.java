package com.fpt.automatedtesting.headlecturers;

import com.fpt.automatedtesting.scripts.Script;
import com.fpt.automatedtesting.users.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "HeadLecturer")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeadLecturer {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "first_name", nullable = true)
    private String firstName;

    @Column(name = "middle_name", nullable = true)
    private String middleName;

    @Column(name = "last_name", nullable = true)
    private String lastName;

    @Column(name = "subject_code", nullable = true)
    private String subjectCode;

    @Column(name = "email", nullable = true)
    private String email;

    @Column(name = "contact_phone", nullable = true)
    private String contactPhone;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "headLecturer", cascade = CascadeType.ALL)
    private List<Script> scripts;

    @Column(name = "active", columnDefinition = "boolean default true")
    private Boolean active;

}
