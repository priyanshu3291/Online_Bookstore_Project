package com.priyanshu.bookstore.service;

import com.priyanshu.bookstore.entity.OrderItem;
import com.priyanshu.bookstore.repository.OrderItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrderItemService {
    private final OrderItemRepository repo;
    public OrderItemService(OrderItemRepository repo) { this.repo = repo; }

    public List<OrderItem> getAll() { return repo.findAll(); }
    public Optional<OrderItem> getById(Integer id) { return repo.findById(id); }
    public OrderItem save(OrderItem o) { return repo.save(o); }
    public void delete(Integer id) { repo.deleteById(id); }
}
