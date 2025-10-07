package com.priyanshu.bookstore.controller;


import com.priyanshu.bookstore.entity.Wishlist;
import com.priyanshu.bookstore.repository.BookRepository;
import com.priyanshu.bookstore.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private BookRepository bookRepository;

    // Get all wishlist items for a customer
    @GetMapping("/{customerId}")
    public List<Map<String, Object>> getWishlist(@PathVariable Integer customerId) {
        List<Wishlist> wishlistItems = wishlistRepository.findByCustomerId(customerId);
        List<Map<String, Object>> response = new ArrayList<>();

        for (Wishlist w : wishlistItems) {
            bookRepository.findById(w.getBook_id()).ifPresent(book -> {
                Map<String, Object> map = new HashMap<>();
                map.put("wishlist_id", w.getWishlist_id());
                map.put("book_id", book.getBook_id());
                map.put("title", book.getTitle());
                map.put("author", book.getAuthor());
                map.put("price", book.getPrice());
                map.put("image", book.getImage()); // uses the new image field
                response.add(map);
            });
        }
        return response;
    }

    // Add an item to wishlist
    @PostMapping("/")
    public Wishlist addItem(@RequestBody Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }

    // Remove an item from wishlist
    @DeleteMapping("/{wishlistId}")
    public void removeItem(@PathVariable Integer wishlistId) {
        wishlistRepository.deleteById(wishlistId);
    }
}
