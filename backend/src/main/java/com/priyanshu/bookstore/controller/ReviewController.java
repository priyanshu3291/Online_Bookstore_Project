package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.Review;
import com.priyanshu.bookstore.service.ReviewService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService service;
    public ReviewController(ReviewService service) { this.service = service; }

    @GetMapping
    public List<Review> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public Review getById(@PathVariable Integer id) { return service.getById(id).orElse(null); }

    @PostMapping
    public Review create(@RequestBody Review r) { return service.save(r); }

    @PutMapping("/{id}")
    public Review update(@PathVariable Integer id, @RequestBody Review r) {
        r.setReview_id(id);
        return service.save(r);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) { service.delete(id); }
}
