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

    public BookController(BookService service) {
        this.service = service;
    }

    // GET all books or search by title/author
    @GetMapping
    public List<Book> getAll(@RequestParam(required = false) String search) {
        if (search == null || search.isEmpty()) {
            return service.getAll();
        } else {
            return service.searchBooks(search);
        }
    }

    // GET book by ID
    @GetMapping("/{id}")
    public Book getById(@PathVariable Integer id) {
        return service.getById(id).orElse(null);
    }

    // CREATE new book
    @PostMapping
    public Book create(@Valid @RequestBody Book b) {
        return service.save(b);
    }

    // UPDATE existing book
    @PutMapping("/{id}")
    public Book update(@PathVariable Integer id, @Valid @RequestBody Book b) {
        b.setBook_id(id);
        return service.save(b);
    }

    // DELETE book
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
