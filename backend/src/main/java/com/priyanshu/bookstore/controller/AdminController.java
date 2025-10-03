package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.Admin;
import com.priyanshu.bookstore.service.AdminService;
import com.priyanshu.bookstore.util.PasswordUtil;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    private final AdminService service;
    public AdminController(AdminService service) { this.service = service; }

    @GetMapping
    public List<Admin> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Admin getById(@PathVariable Integer id) {
        return service.getById(id).orElse(null);
    }

    @PostMapping
    public Admin create(@Valid @RequestBody Admin a) {
        // Hash password before saving
        a.setPassword(PasswordUtil.hashPassword(a.getPassword()));
        return service.save(a);
    }

    @PutMapping("/{id}")
    public Admin update(@PathVariable Integer id, @Valid @RequestBody Admin a) {
        a.setAdmin_id(id);
        a.setPassword(PasswordUtil.hashPassword(a.getPassword())); // hash password on update
        return service.save(a);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
