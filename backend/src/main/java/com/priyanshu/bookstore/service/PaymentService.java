package com.priyanshu.bookstore.service;

import com.priyanshu.bookstore.entity.Payment;
import com.priyanshu.bookstore.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    private final PaymentRepository repo;
    public PaymentService(PaymentRepository repo) { this.repo = repo; }

    public List<Payment> getAll() { return repo.findAll(); }
    public Optional<Payment> getById(Integer id) { return repo.findById(id); }
    public Payment save(Payment p) { return repo.save(p); }
    public void delete(Integer id) { repo.deleteById(id); }
}
