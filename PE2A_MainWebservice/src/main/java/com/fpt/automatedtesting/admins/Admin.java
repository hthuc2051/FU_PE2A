package com.fpt.automatedtesting.admins;

import com.fpt.automatedtesting.actions.Action;
import com.fpt.automatedtesting.users.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Admin")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
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

    @Column(name = "email", nullable = true)
    private String email;

    @Column(name = "contact_phone", nullable = true)
    private String contactPhone;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    private List<Action> actions;

    @Column(name = "active", columnDefinition = "boolean default true")
    private Boolean active;

}
