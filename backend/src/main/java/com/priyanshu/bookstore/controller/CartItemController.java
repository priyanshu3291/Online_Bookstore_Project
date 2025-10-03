package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.CartItem;
import com.priyanshu.bookstore.service.CartItemService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart-items")
public class CartItemController {

    private final CartItemService service;
    public CartItemController(CartItemService service) { this.service = service; }

    @GetMapping
    public List<CartItem> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public CartItem getById(@PathVariable Integer id) { return service.getById(id).orElse(null); }

    @PostMapping
    public CartItem create(@RequestBody CartItem c) { return service.save(c); }

    @PutMapping("/{id}")
    public CartItem update(@PathVariable Integer id, @RequestBody CartItem c) {
        c.setCart_item_id(id);
        return service.save(c);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) { service.delete(id); }
}
