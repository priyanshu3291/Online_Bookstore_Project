package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.Customer;
import com.priyanshu.bookstore.repository.CustomerRepository;
import com.priyanshu.bookstore.util.PasswordUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CustomerRepository customerRepo;

    public AuthController(CustomerRepository customerRepo) {
        this.customerRepo = customerRepo;
    }

    @PostMapping("/register")
    public String register(@RequestBody Customer customer) {
        customer.setPassword(PasswordUtil.hashPassword(customer.getPassword())); // hash password
        customerRepo.save(customer);
        return "✅ Customer registered successfully!";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        Customer customer = customerRepo.findByEmail(email).orElse(null);

        if (customer != null && PasswordUtil.matches(password, customer.getPassword())) {
            // Prepare response including role
            Map<String, Object> response = new HashMap<>();
            response.put("id", customer.getId());
            response.put("fullName", customer.getFullName());
            response.put("email", customer.getEmail());
            response.put("role", customer.getRole());
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("❌ Invalid credentials");
    }
}
