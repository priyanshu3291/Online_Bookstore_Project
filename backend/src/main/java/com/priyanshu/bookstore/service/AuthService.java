package com.priyanshu.bookstore.service;

import com.priyanshu.bookstore.entity.User;
import com.priyanshu.bookstore.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> login(String email, String password) {
        return userRepository.findByEmail(email)
                             .filter(user -> user.getPassword().equals(password));
    }
}
