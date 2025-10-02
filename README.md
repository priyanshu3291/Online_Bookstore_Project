# 📚 Online Bookstore – DBMS Project

## 🔹 Overview
This project is a **CSE DBMS course project** that implements an **Online Bookstore** application.  
The system provides modules for both **customers** and **admins**, mimicking real-world e-commerce functionality.  

## 🔹 Features
### Customer
- Register / Login
- Browse & search books
- View book details
- Add to cart & checkout
- Track order status
- Leave reviews & ratings

### Admin
- Admin login with privileges
- Manage books (add, edit, delete, update stock)
- Manage users & orders
- Monitor reviews and payments

## 🔹 Tech Stack
- **Backend**: Spring Boot (Java)
- **Database**: MySQL
- **Frontend**: HTML, CSS, JavaScript
- **Version Control**: Git + GitHub

## 🔹 Database Schema
The schema includes:
- Customers
- Admins
- Books
- Carts & Cart Items
- Orders & Order Items
- Payments
- Reviews

Schema and sample data are available in the [`db/`](./db) folder:
- `bookstore_models.sql` → Table definitions + triggers
- `sample_data.sql` → Initial dummy records

## 🔹 Project Structure
```
Online_Bookstore_Project/
│── backend/        # Spring Boot code (to be implemented)
│── frontend/       # HTML/CSS/JS files (to be implemented)
│── db/             # SQL schema & sample data
│── .gitignore
│── README.md
```

## 🔹 Setup Instructions
### Database
1. Open MySQL and run:
   ```sql
   source db/bookstore_models.sql;
   source db/sample_data.sql;
   ```

2. Verify using:
   ```sql
   SHOW TABLES;
   SELECT * FROM Customers;
   ```

### Backend (Spring Boot)
* Will be added soon (skeleton + API endpoints).

### Frontend
* Will be added soon (basic HTML templates).

## 🔹 Contributors
* Priyanshu Kumar
* Aryan Rai
* Sriyog Holkar
* Khushaboo
* Eedhala Manohar
