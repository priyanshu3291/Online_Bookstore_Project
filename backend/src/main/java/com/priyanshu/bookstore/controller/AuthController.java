package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.Customer;
import com.priyanshu.bookstore.repository.CustomerRepository;
import com.priyanshu.bookstore.util.PasswordUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://127.0.0.1:5500") // ✅ allows frontend from VSCode Live Server
public class AuthController {

    private final CustomerRepository customerRepo;

    public AuthController(CustomerRepository customerRepo) {
        this.customerRepo = customerRepo;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Customer customer) {
        if (customer.getFullName() == null || customer.getEmail() == null || customer.getPassword() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields"));
        }

        Optional<Customer> existing = customerRepo.findByEmail(customer.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Email already registered"));
        }

        // ✅ hash password
        customer.setPassword(PasswordUtil.hashPassword(customer.getPassword()));
        customer.setRole(Customer.Role.CUSTOMER);
        var saved = customerRepo.save(customer);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "id", saved.getId(),
                "email", saved.getEmail(),
                "fullName", saved.getFullName()
        ));
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Missing email or password"));
        }

        var opt = customerRepo.findByEmail(email);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }

        var customer = opt.get();
        if (!PasswordUtil.matches(password, customer.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }

        return ResponseEntity.ok(Map.of(
                "id", customer.getId(),
                "email", customer.getEmail(),
                "fullName", customer.getFullName(),
                "role", customer.getRole()
        ));
    }
}
