package com.fpt.automatedtesting.users;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByIdAndActiveIsTrue(Integer id);
    List<User> findAllByActiveIsTrue();
}
