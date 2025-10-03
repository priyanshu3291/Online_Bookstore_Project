package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.Customer;
import com.priyanshu.bookstore.repository.CustomerRepository;
import com.priyanshu.bookstore.util.PasswordUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final CustomerRepository customerRepo;

    public AuthController(CustomerRepository customerRepo) {
        this.customerRepo = customerRepo;
    }

    @PostMapping("/register")
    public String register(@RequestBody Customer customer) {
        customer.setPassword(PasswordUtil.hashPassword(customer.getPassword())); // password ko hash karo
        customerRepo.save(customer);
        return "✅ Customer registered successfully!";
    }

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password) {
        Customer customer = customerRepo.findByEmail(email).orElse(null); // ab ye valid hai
        if (customer != null && PasswordUtil.matches(password, customer.getPassword())) {
            return "✅ Login successful for " + customer.getFull_name();
        }
        return "❌ Invalid credentials";
    }
}
