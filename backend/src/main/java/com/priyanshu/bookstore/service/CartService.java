package com.priyanshu.bookstore.service;

import com.priyanshu.bookstore.entity.CartItem;
import com.priyanshu.bookstore.repository.CartItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartItemRepository repo;

    public CartService(CartItemRepository repo) {
        this.repo = repo;
    }

    public List<CartItem> getCart(Integer customerId) {
        return repo.findByCart_Customer_Id(customerId);
    }

    public CartItem addItem(CartItem item) {
        return repo.save(item);
    }

    public Optional<CartItem> getById(Integer id) {
        return repo.findById(id);
    }

    public void removeItem(Integer id) {
        repo.deleteById(id);
    }

    public CartItem updateQuantity(Integer id, Integer quantity) {
        CartItem item = repo.findById(id).orElseThrow();
        item.setQuantity(quantity);
        return repo.save(item);
    }
}
