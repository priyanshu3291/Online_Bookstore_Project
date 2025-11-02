package com.priyanshu.bookstore;

import com.priyanshu.bookstore.entity.Admin;
import com.priyanshu.bookstore.entity.Book;
import com.priyanshu.bookstore.service.AdminService;
import com.priyanshu.bookstore.service.BookService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableMethodSecurity
public class BookstoreBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookstoreBackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner init(AdminService adminService, BookService bookService) {
        return args -> {
            System.out.println("✅ Bookstore Backend started successfully!");

            // Add default admin if not exists
            if (adminService.getAll().isEmpty()) {
                Admin admin = new Admin();
                admin.setFull_name("Super Admin");
                admin.setEmail("admin@bookstore.com");
                admin.setPassword("admin123"); // plain text for demo
                adminService.save(admin);
                System.out.println("⚡ Default admin created: admin@bookstore.com / admin123");
            }

            // Add default book if not exists
            if (bookService.getAll().isEmpty()) {
                Book book = new Book();
                book.setTitle("Sample Book");
                book.setAuthor("Author Name");
                book.setCategory("General");
                book.setPrice(100.0);
                book.setFormat(Book.BookFormat.paperback);
                book.setStock_quantity(10);
                bookService.save(book);
                System.out.println("📚 Sample book added: " + book.getTitle());
            }
        };
    }
}
