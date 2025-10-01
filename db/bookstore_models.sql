-- ============================
-- Create Database
-- ============================
CREATE DATABASE IF NOT EXISTS bookstore_db;
USE bookstore_db;

-- ============================
-- Customers Table
-- ============================
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password CHAR(64) NOT NULL, -- storing SHA2 hash
    contact_number VARCHAR(15),
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Admins Table
-- ============================
CREATE TABLE Admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password CHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Books Table
-- ============================
CREATE TABLE Books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK(price >= 0),
    isbn VARCHAR(20) UNIQUE,
    description TEXT,
    format ENUM('ebook','paperback','hardcover') NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0 CHECK(stock_quantity >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Shopping Cart Tables
-- ============================
CREATE TABLE Carts (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
        ON DELETE CASCADE
);

CREATE TABLE Cart_Items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    book_id INT NOT NULL,
    quantity INT NOT NULL CHECK(quantity > 0),
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES Carts(cart_id)
        ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
        ON DELETE CASCADE
);

-- Trigger to automatically calculate total_price
DELIMITER //

CREATE TRIGGER before_cart_item_insert
BEFORE INSERT ON Cart_Items
FOR EACH ROW
BEGIN
    SET NEW.total_price = NEW.quantity * (SELECT price FROM Books WHERE book_id = NEW.book_id);
END//

CREATE TRIGGER before_cart_item_update
BEFORE UPDATE ON Cart_Items
FOR EACH ROW
BEGIN
    SET NEW.total_price = NEW.quantity * (SELECT price FROM Books WHERE book_id = NEW.book_id);
END//

DELIMITER ;

-- ============================
-- Orders Tables
-- ============================
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    status ENUM('Pending','Confirmed','Shipped','Delivered','Cancelled') DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
        ON DELETE CASCADE
);

CREATE TABLE Order_Items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    book_id INT NOT NULL,
    quantity INT NOT NULL CHECK(quantity > 0),
    price DECIMAL(10,2) NOT NULL CHECK(price >= 0),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
        ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
        ON DELETE CASCADE
);

-- Trigger to update total_amount whenever Order_Items are inserted or updated
DELIMITER //

CREATE TRIGGER after_order_item_insert
AFTER INSERT ON Order_Items
FOR EACH ROW
BEGIN
    UPDATE Orders
    SET total_amount = total_amount + NEW.quantity * NEW.price
    WHERE order_id = NEW.order_id;
END//

CREATE TRIGGER after_order_item_update
AFTER UPDATE ON Order_Items
FOR EACH ROW
BEGIN
    UPDATE Orders
    SET total_amount = total_amount - OLD.quantity * OLD.price + NEW.quantity * NEW.price
    WHERE order_id = NEW.order_id;
END//

CREATE TRIGGER after_order_item_delete
AFTER DELETE ON Order_Items
FOR EACH ROW
BEGIN
    UPDATE Orders
    SET total_amount = total_amount - OLD.quantity * OLD.price
    WHERE order_id = OLD.order_id;
END//

DELIMITER ;

-- ============================
-- Payments Table
-- ============================
CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    method ENUM('UPI','Net Banking','Card','COD') NOT NULL,
    status ENUM('Pending','Success','Failed') DEFAULT 'Pending',
    amount DECIMAL(10,2) NOT NULL CHECK(amount >= 0),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
        ON DELETE CASCADE
);

-- ============================
-- Reviews Table
-- ============================
CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    book_id INT NOT NULL,
    rating INT NOT NULL CHECK(rating BETWEEN 1 AND 5),
    feedback TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
        ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
        ON DELETE CASCADE
);