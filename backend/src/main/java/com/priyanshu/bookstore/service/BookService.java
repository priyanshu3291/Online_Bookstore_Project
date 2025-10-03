package com.priyanshu.bookstore.service;

import com.priyanshu.bookstore.entity.Book;
import com.priyanshu.bookstore.repository.BookRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final BookRepository repo;
    public BookService(BookRepository repo) { this.repo = repo; }

    public List<Book> getAll() { return repo.findAll(); }
    public Optional<Book> getById(Integer id) { return repo.findById(id); }
    public Book save(Book b) { return repo.save(b); }
    public void delete(Integer id) { repo.deleteById(id); }
}
