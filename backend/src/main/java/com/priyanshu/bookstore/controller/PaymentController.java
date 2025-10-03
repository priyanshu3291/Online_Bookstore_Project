package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.Payment;
import com.priyanshu.bookstore.service.PaymentService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService service;
    public PaymentController(PaymentService service) { this.service = service; }

    @GetMapping
    public List<Payment> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public Payment getById(@PathVariable Integer id) { return service.getById(id).orElse(null); }

    @PostMapping
    public Payment create(@RequestBody Payment p) { return service.save(p); }

    @PutMapping("/{id}")
    public Payment update(@PathVariable Integer id, @RequestBody Payment p) {
        p.setPayment_id(id);
        return service.save(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) { service.delete(id); }
}
