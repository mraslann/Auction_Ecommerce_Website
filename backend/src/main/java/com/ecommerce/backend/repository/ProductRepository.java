package com.ecommerce.backend.repository;

import com.ecommerce.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Optional: You can define custom queries here if needed later
}
