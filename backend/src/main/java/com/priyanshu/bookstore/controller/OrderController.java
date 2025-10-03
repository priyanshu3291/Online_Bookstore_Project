package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.Order;
import com.priyanshu.bookstore.service.OrderService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService service;
    public OrderController(OrderService service) { this.service = service; }

    @GetMapping
    public List<Order> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public Order getById(@PathVariable Integer id) { return service.getById(id).orElse(null); }

    @PostMapping
    public Order create(@RequestBody Order o) { return service.save(o); }

    @PutMapping("/{id}")
    public Order update(@PathVariable Integer id, @RequestBody Order o) {
        o.setOrder_id(id);
        return service.save(o);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) { service.delete(id); }
}
