-- ============================
-- Sample Data for Online Bookstore
-- ============================

USE bookstore_db;

-- ============================
-- Customers
-- ============================
INSERT INTO Customers (full_name, email, password, contact_number, address)
VALUES
('Priyanshu Kumar', 'priyanshu@example.com', SHA2('pass123', 256), '9876543210', 'Varanasi, India'),
('Aryan Rai', 'aryan@example.com', SHA2('pass123', 256), '9876501234', 'Lucknow, India'),
('Sriyog Holkar', 'sriyog@example.com', SHA2('pass123', 256), '9876512345', 'Delhi, India');

-- ============================
-- Admins
-- ============================
INSERT INTO Admins (full_name, email, password)
VALUES
('Admin One', 'admin1@example.com', SHA2('admin123', 256));

-- ============================
-- Books
-- ============================
INSERT INTO Books (title, author, category, price, isbn, description, format, stock_quantity)
VALUES
('C Programming', 'Dennis Ritchie', 'Programming', 350.00, '9780131103627', 'Classic C programming book', 'paperback', 10),
('Data Structures', 'Seymour Lipschutz', 'Programming', 450.00, '9780070666830', 'DS book for beginners', 'hardcover', 8),
('DBMS Concepts', 'Silberschatz', 'Database', 500.00, '9780073523323', 'Database management fundamentals', 'hardcover', 5),
('Java Basics', 'Herbert Schildt', 'Programming', 400.00, '9780071808552', 'Learn Java from scratch', 'ebook', 15),
('Web Development', 'Jon Duckett', 'Web', 550.00, '9781118907443', 'HTML, CSS & JS guide', 'paperback', 7);

-- ============================
-- Carts
-- ============================
INSERT INTO Carts (customer_id)
VALUES
(1),
(2);

-- ============================
-- Cart_Items
-- ============================
INSERT INTO Cart_Items (cart_id, book_id, quantity, total_price)
VALUES
(1, 1, 1, 350.00),
(1, 2, 2, 900.00),
(2, 3, 1, 500.00);

-- ============================
-- Orders
-- ============================
INSERT INTO Orders (customer_id, total_amount, status)
VALUES
(1, 1250.00, 'Pending'),
(2, 500.00, 'Pending');

-- ============================
-- Order_Items
-- ============================
INSERT INTO Order_Items (order_id, book_id, quantity, price)
VALUES
(1, 1, 1, 350.00),
(1, 2, 2, 450.00),
(2, 3, 1, 500.00);

-- ============================
-- Payments
-- ============================
INSERT INTO Payments (order_id, method, status, amount)
VALUES
(1, 'Credit Card', 'Success', 1250.00),
(2, 'UPI', 'Success', 500.00);

-- ============================
-- Reviews
-- ============================
INSERT INTO Reviews (customer_id, book_id, rating, feedback)
VALUES
(1, 1, 5, 'Excellent book!'),
(1, 2, 4, 'Very informative.'),
(2, 3, 5, 'Must read for DBMS!'),
(3, 4, 4, 'Good introduction to Java.'),
(3, 5, 5, 'Amazing web dev guide.');
