package com.priyanshu.bookstore.service;

import com.priyanshu.bookstore.entity.Cart;
import com.priyanshu.bookstore.repository.CartRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private final CartRepository repo;
    public CartService(CartRepository repo) { this.repo = repo; }

    public List<Cart> getAll() { return repo.findAll(); }
    public Optional<Cart> getById(Integer id) { return repo.findById(id); }
    public Cart save(Cart c) { return repo.save(c); }
    public void delete(Integer id) { repo.deleteById(id); }
}
