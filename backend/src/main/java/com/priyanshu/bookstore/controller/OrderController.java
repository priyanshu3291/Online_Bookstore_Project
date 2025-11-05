package com.priyanshu.bookstore.controller;

import com.priyanshu.bookstore.entity.*;
import com.priyanshu.bookstore.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500", "http://localhost:3000"})
public class OrderController {

    private final OrderRepository orderRepo;
    private final CartItemRepository cartItemRepo;
    private final CartRepository cartRepo;
    private final CustomerRepository customerRepo;
    private final OrderItemRepository orderItemRepo;

    public OrderController(OrderRepository orderRepo,
                           CartItemRepository cartItemRepo,
                           CartRepository cartRepo,
                           CustomerRepository customerRepo,
                           OrderItemRepository orderItemRepo) {
        this.orderRepo = orderRepo;
        this.cartItemRepo = cartItemRepo;
        this.cartRepo = cartRepo;
        this.customerRepo = customerRepo;
        this.orderItemRepo = orderItemRepo;
    }

    // ✅ Place new order
    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody Map<String, Object> request) {
        try {
            Integer customerId = (Integer) request.get("customerId");
            if (customerId == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "customerId is required"));
            }

            Optional<Customer> customerOpt = customerRepo.findById(customerId);
            if (customerOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid customer ID"));
            }
            Customer customer = customerOpt.get();

            List<CartItem> cartItems = cartItemRepo.findByCart_Customer_Id(customerId);
            if (cartItems.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Cart is empty"));
            }

            double total = cartItems.stream()
                    .mapToDouble(CartItem::getTotal_price)
                    .sum();

            Order order = new Order();
            order.setCustomer(customer);
            order.setOrder_date(LocalDateTime.now());
            order.setTotal_amount(total);
            order.setStatus(Order.OrderStatus.Confirmed);

            Order savedOrder = orderRepo.save(order);

            // ✅ Save order items
            for (CartItem ci : cartItems) {
                OrderItem oi = new OrderItem();
                oi.setOrder(savedOrder);
                oi.setBook(ci.getBook());
                oi.setQuantity(ci.getQuantity());
                oi.setPrice(ci.getTotal_price());
                orderItemRepo.save(oi);
            }

            // ✅ Clear cart
            cartItemRepo.deleteAll(cartItems);

            return ResponseEntity.ok(Map.of(
                    "message", "Order placed successfully!",
                    "orderId", savedOrder.getOrderId(),
                    "total", total,
                    "status", savedOrder.getStatus()
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    // ✅ Get all orders
    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        return ResponseEntity.ok(orderRepo.findAll());
    }

    // ✅ Get orders by customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<?> getOrdersByCustomer(@PathVariable Integer customerId) {
        List<Order> orders = orderRepo.findByCustomer_Id(customerId);
        return ResponseEntity.ok(orders);
    }

    // ✅ Get specific order details
    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderDetails(@PathVariable Integer orderId) {
        Optional<Order> orderOpt = orderRepo.findById(orderId);
        if (orderOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Order not found"));
        }

        Order order = orderOpt.get();
        List<OrderItem> orderItems = orderItemRepo.findByOrder_OrderId(orderId);

        List<Map<String, Object>> items = new ArrayList<>();
        for (OrderItem oi : orderItems) {
            items.add(Map.of(
                    "book_id", oi.getBook().getBook_id(),
                    "title", oi.getBook().getTitle(),
                    "author", oi.getBook().getAuthor(),
                    "price", oi.getPrice(),
                    "quantity", oi.getQuantity()
            ));
        }

        return ResponseEntity.ok(Map.of(
                "orderId", order.getOrderId(),
                "customer", order.getCustomer().getFullName(),
                "order_date", order.getOrder_date(),
                "status", order.getStatus(),
                "total_amount", order.getTotal_amount(),
                "items", items
        ));
    }
}
