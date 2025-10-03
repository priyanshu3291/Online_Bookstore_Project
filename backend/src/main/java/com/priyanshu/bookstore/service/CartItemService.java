package com.priyanshu.bookstore.service;

import com.priyanshu.bookstore.entity.CartItem;
import com.priyanshu.bookstore.repository.CartItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {
    private final CartItemRepository repo;
    public CartItemService(CartItemRepository repo) { this.repo = repo; }

    public List<CartItem> getAll() { return repo.findAll(); }
    public Optional<CartItem> getById(Integer id) { return repo.findById(id); }
    public CartItem save(CartItem c) { return repo.save(c); }
    public void delete(Integer id) { repo.deleteById(id); }
}
