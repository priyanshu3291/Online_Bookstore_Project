package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.Book;
import com.priyanshu.bookstore.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books") // customers still access via same URL
public class CustomerBookController {

    private final BookService service;

    public CustomerBookController(BookService service) {
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

}
