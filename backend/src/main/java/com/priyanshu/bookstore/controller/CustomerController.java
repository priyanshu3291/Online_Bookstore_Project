package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.Customer;
import com.priyanshu.bookstore.service.CustomerService;
import com.priyanshu.bookstore.util.PasswordUtil;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService service;
    public CustomerController(CustomerService service) { this.service = service; }

    @GetMapping
    public List<Customer> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Customer getById(@PathVariable Integer id) {
        return service.getById(id).orElse(null);
    }

    @PostMapping
    public Customer create(@Valid @RequestBody Customer c) {
        // Hash password before saving
        c.setPassword(PasswordUtil.hashPassword(c.getPassword()));
        return service.save(c);
    }

    @PutMapping("/{id}")
    public Customer update(@PathVariable Integer id, @Valid @RequestBody Customer c) {
        c.setCustomer_id(id);
        c.setPassword(PasswordUtil.hashPassword(c.getPassword())); // hash password on update
        return service.save(c);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
