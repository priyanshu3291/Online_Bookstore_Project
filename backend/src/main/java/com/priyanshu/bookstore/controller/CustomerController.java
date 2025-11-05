package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.Customer;
import com.priyanshu.bookstore.service.CustomerService;
import com.priyanshu.bookstore.util.PasswordUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService service;

    public CustomerController(CustomerService service) {
        this.service = service;
    }

    // ✅ Get all customers
    @GetMapping
    public List<Customer> getAll() {
        return service.getAll();
    }

    // ✅ Get customer by ID
    @GetMapping("/{id}")
    public Customer getById(@PathVariable Integer id) {
        return service.getById(id).orElse(null);
    }

    // ✅ Create new customer (register)
    @PostMapping
    public Customer create(@Valid @RequestBody Customer c) {
        c.setPassword(PasswordUtil.hashPassword(c.getPassword()));
        return service.save(c);
    }

    // ✅ Update customer details
    @PutMapping("/{id}")
    public Customer update(@PathVariable Integer id, @Valid @RequestBody Customer c) {
        c.setId(id);
        c.setPassword(PasswordUtil.hashPassword(c.getPassword()));
        return service.save(c);
    }

    // ✅ Delete a customer
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    // ✅ Login endpoint (fixed)
    @PostMapping("/login")
    public ResponseEntity<?> loginCustomer(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        Optional<Customer> optionalCustomer = service.findByEmail(email);

        if (optionalCustomer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }

        Customer customer = optionalCustomer.get();

        // ✅ Use the correct password check method name
        boolean passwordMatch = PasswordUtil.matches(password, customer.getPassword());
        if (!passwordMatch) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid email or password"));
        }

        return ResponseEntity.ok(customer);
    }
}
