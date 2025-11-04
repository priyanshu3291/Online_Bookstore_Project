package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.Book;
import com.priyanshu.bookstore.entity.Cart;
import com.priyanshu.bookstore.entity.CartItem;
import com.priyanshu.bookstore.entity.Customer;
import com.priyanshu.bookstore.repository.BookRepository;
import com.priyanshu.bookstore.repository.CartItemRepository;
import com.priyanshu.bookstore.repository.CartRepository;
import com.priyanshu.bookstore.repository.CustomerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})

public class CartController {

    private final CartRepository cartRepo;
    private final CartItemRepository cartItemRepo;
    private final BookRepository bookRepo;
    private final CustomerRepository customerRepo;

    public CartController(CartRepository cartRepo,
                          CartItemRepository cartItemRepo,
                          BookRepository bookRepo,
                          CustomerRepository customerRepo) {
        this.cartRepo = cartRepo;
        this.cartItemRepo = cartItemRepo;
        this.bookRepo = bookRepo;
        this.customerRepo = customerRepo;
    }

    // ✅ Add to cart
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody Map<String, Object> data) {
        try {
            Integer customerId = (Integer) data.get("customerId");
            Integer bookId = (Integer) data.get("bookId");
            Integer quantity = (Integer) data.get("quantity");

            if (customerId == null || bookId == null || quantity == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Missing required fields"));
            }

            Optional<Customer> customerOpt = customerRepo.findById(customerId);
            Optional<Book> bookOpt = bookRepo.findById(bookId);

            if (customerOpt.isEmpty() || bookOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid customer or book"));
            }

            Customer customer = customerOpt.get();
            Book book = bookOpt.get();

            // find or create cart
            Cart cart = cartRepo.findAll().stream()
                    .filter(c -> c.getCustomer().getId().equals(customerId))
                    .findFirst()
                    .orElseGet(() -> {
                        Cart newCart = new Cart();
                        newCart.setCustomer(customer);
                        newCart.setCreated_at(LocalDateTime.now());
                        return cartRepo.save(newCart);
                    });

            // create CartItem
            CartItem item = new CartItem();
            item.setCart(cart);
            item.setBook(book);
            item.setQuantity(quantity);
            item.setTotal_price(book.getPrice() * quantity);

            cartItemRepo.save(item);
            return ResponseEntity.ok(Map.of("message", "Book added to cart successfully!"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    // ✅ Get items in user's cart
    @GetMapping("/{customerId}")
    public List<CartItem> getCart(@PathVariable Integer customerId) {
        return cartItemRepo.findByCart_Customer_Id(customerId);
    }
}
