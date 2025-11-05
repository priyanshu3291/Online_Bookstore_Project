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
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500", "http://localhost:3000"})
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

            // ✅ Find or create cart for the customer
            Cart cart = cartRepo.findByCustomer_Id(customerId)
                    .orElseGet(() -> {
                        Cart newCart = new Cart();
                        newCart.setCustomer(customer);
                        newCart.setCreated_at(LocalDateTime.now());
                        return cartRepo.save(newCart);
                    });

            // ✅ Check if book already exists in cart
            Optional<CartItem> existingItem = cartItemRepo.findByCart_Customer_Id(customerId)
                    .stream()
                    .filter(ci -> ci.getBook().getBook_id().equals(bookId))
                    .findFirst();

            if (existingItem.isPresent()) {
                CartItem item = existingItem.get();
                item.setQuantity(item.getQuantity() + quantity);
                item.setTotal_price(book.getPrice() * item.getQuantity());
                cartItemRepo.save(item);
                return ResponseEntity.ok(Map.of("message", "Cart updated successfully!"));
            }

            // ✅ Add new item
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setBook(book);
            newItem.setQuantity(quantity);
            newItem.setTotal_price(book.getPrice() * quantity);
            cartItemRepo.save(newItem);

            return ResponseEntity.ok(Map.of("message", "Book added to cart successfully!"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    // ✅ Get cart items by customer ID (Fixed endpoint)
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getCartByCustomer(@PathVariable Integer customerId) {
        try {
            List<CartItem> items = cartItemRepo.findByCart_Customer_Id(customerId);

            if (items.isEmpty()) {
                return ResponseEntity.ok(Collections.emptyList());
            }

            List<Map<String, Object>> response = new ArrayList<>();
            for (CartItem item : items) {
                Map<String, Object> map = new HashMap<>();
                map.put("cart_item_id", item.getCart_item_id());
                map.put("quantity", item.getQuantity());
                map.put("total_price", item.getTotal_price());
                map.put("book", Map.of(
                        "book_id", item.getBook().getBook_id(),
                        "title", item.getBook().getTitle(),
                        "author", item.getBook().getAuthor(),
                        "price", item.getBook().getPrice()
                ));
                response.add(map);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    // ✅ Remove item from cart
    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<?> removeCartItem(@PathVariable Integer cartItemId) {
        try {
            Optional<CartItem> cartItemOpt = cartItemRepo.findById(cartItemId);
            if (cartItemOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Cart item not found"));
            }

            cartItemRepo.deleteById(cartItemId);
            return ResponseEntity.ok(Map.of("message", "Item removed from cart successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}
