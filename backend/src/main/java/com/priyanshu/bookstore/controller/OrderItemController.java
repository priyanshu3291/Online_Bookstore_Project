package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.OrderItem;
import com.priyanshu.bookstore.service.OrderItemService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/order-items")
public class OrderItemController {

    private final OrderItemService service;
    public OrderItemController(OrderItemService service) { this.service = service; }

    @GetMapping
    public List<OrderItem> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public OrderItem getById(@PathVariable Integer id) { return service.getById(id).orElse(null); }

    @PostMapping
    public OrderItem create(@RequestBody OrderItem o) { return service.save(o); }

    @PutMapping("/{id}")
    public OrderItem update(@PathVariable Integer id, @RequestBody OrderItem o) {
        o.setOrder_item_id(id);
        return service.save(o);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) { service.delete(id); }
}
