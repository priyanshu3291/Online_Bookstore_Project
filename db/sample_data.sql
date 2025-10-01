-- ============
-- Sample Data
-- ============

INSERT INTO Customers (full_name, email, password, contact_number, address)
VALUES ('Priyanshu Kumar', 'priyanshu@example.com', SHA2('password123', 256), '9876543210', 'Patna, Bihar');

INSERT INTO Books (title, author, category, price, isbn, description, format, stock_quantity)
VALUES ('DBMS Concepts', 'Navathe', 'Computer Science', 550.00, '9780133970777', 'Database Management Systems book', 'paperback', 20);

INSERT INTO Admins (full_name, email, password)
VALUES ('System Admin', 'admin@bookstore.com', SHA2('admin123', 256));