package com.priyanshu.bookstore.service;

import com.priyanshu.bookstore.entity.Review;
import com.priyanshu.bookstore.repository.ReviewRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository repo;
    public ReviewService(ReviewRepository repo) { this.repo = repo; }

    public List<Review> getAll() { return repo.findAll(); }
    public Optional<Review> getById(Integer id) { return repo.findById(id); }
    public Review save(Review r) { return repo.save(r); }
    public void delete(Integer id) { repo.deleteById(id); }
}
