package com.priyanshu.bookstore.repository;

import com.priyanshu.bookstore.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    // ✅ Add this method to find cart by customer ID
    Optional<Cart> findByCustomer_Id(Integer customerId);
}
