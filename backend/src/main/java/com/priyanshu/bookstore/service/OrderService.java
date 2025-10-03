package com.priyanshu.bookstore.service;

import com.priyanshu.bookstore.entity.Order;
import com.priyanshu.bookstore.repository.OrderRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository repo;
    public OrderService(OrderRepository repo) { this.repo = repo; }

    public List<Order> getAll() { return repo.findAll(); }
    public Optional<Order> getById(Integer id) { return repo.findById(id); }
    public Order save(Order o) { return repo.save(o); }
    public void delete(Integer id) { repo.deleteById(id); }
}
