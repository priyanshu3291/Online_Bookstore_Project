package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.Cart;
import com.priyanshu.bookstore.service.CartService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService service;
    public CartController(CartService service) { this.service = service; }

    @GetMapping
    public List<Cart> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public Cart getById(@PathVariable Integer id) { return service.getById(id).orElse(null); }

    @PostMapping
    public Cart create(@RequestBody Cart c) { return service.save(c); }

    @PutMapping("/{id}")
    public Cart update(@PathVariable Integer id, @RequestBody Cart c) {
        c.setCart_id(id);
        return service.save(c);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) { service.delete(id); }
}
