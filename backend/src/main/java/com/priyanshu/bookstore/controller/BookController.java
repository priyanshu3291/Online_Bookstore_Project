package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.Book;
import com.priyanshu.bookstore.service.BookService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService service;
    public BookController(BookService service) { this.service = service; }

    @GetMapping
    public List<Book> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Book getById(@PathVariable Integer id) {
        return service.getById(id).orElse(null);
    }

    @PostMapping
    public Book create(@Valid @RequestBody Book b) {
        return service.save(b);
    }

    @PutMapping("/{id}")
    public Book update(@PathVariable Integer id, @Valid @RequestBody Book b) {
        b.setBook_id(id);
        return service.save(b);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
