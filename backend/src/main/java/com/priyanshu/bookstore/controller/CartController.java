package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.CartItem;
import com.priyanshu.bookstore.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    // ✅ Get all items in a customer's cart
    @GetMapping("/{customerId}")
    public List<CartItem> getCart(@PathVariable Integer customerId) {
        return service.getCart(customerId);
    }

    // ✅ Add item to cart
    @PostMapping
    public CartItem addToCart(@RequestBody CartItem item) {
        return service.addItem(item);
    }

    // ✅ Update item quantity
    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuantity(@PathVariable Integer id, @RequestBody CartItem updated) {
        return ResponseEntity.ok(service.updateQuantity(id, updated.getQuantity()));
    }

    // ✅ Remove item
    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable Integer id) {
        service.removeItem(id);
    }
}
