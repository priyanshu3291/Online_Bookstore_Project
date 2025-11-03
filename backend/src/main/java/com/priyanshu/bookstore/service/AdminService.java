package com.priyanshu.bookstore.service;

import com.priyanshu.bookstore.entity.Admin;
import com.priyanshu.bookstore.repository.AdminRepository;
import com.priyanshu.bookstore.util.PasswordUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository repo;

    public AdminService(AdminRepository repo) {
        this.repo = repo;
    }

    public List<Admin> getAll() {
        return repo.findAll();
    }

    public Optional<Admin> getById(Integer id) {
        return repo.findById(id);
    }

    public Admin save(Admin a) {
        String pw = a.getPassword();
        // if not already BCrypt-hashed, hash it
        if (pw != null && !pw.startsWith("$2a$") && !pw.startsWith("$2b$") && !pw.startsWith("$2y$")) {
            a.setPassword(PasswordUtil.hashPassword(pw));
        }
        return repo.save(a);
    }

    public void delete(Integer id) {
        repo.deleteById(id);
    }
}
