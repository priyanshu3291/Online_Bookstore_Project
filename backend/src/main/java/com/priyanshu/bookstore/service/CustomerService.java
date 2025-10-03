package com.priyanshu.bookstore.service;

import com.priyanshu.bookstore.entity.Customer;
import com.priyanshu.bookstore.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.priyanshu.bookstore.util.PasswordUtil;

@Service
public class CustomerService {

    private final CustomerRepository repo;

    public CustomerService(CustomerRepository repo) { this.repo = repo; }

    public List<Customer> getAll() { return repo.findAll(); }
    public Optional<Customer> getById(Integer id) { return repo.findById(id); }
    public Customer save(Customer c) { 
        c.setPassword(PasswordUtil.hashPassword(c.getPassword()));
        return repo.save(c); }
    public void delete(Integer id) { repo.deleteById(id); }
}
