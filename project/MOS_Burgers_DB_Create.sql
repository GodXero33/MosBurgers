DROP DATABASE IF EXISTS mos_burgers;
CREATE DATABASE mos_burgers;
USE mos_burgers;

CREATE TABLE report (
	report_id INT AUTO_INCREMENT,
	creation_date DATE NOT NULL,
	type ENUM('Monthly', 'Annual') NOT NULL,
	detail VARCHAR(256),
	PRIMARY KEY (report_id)
);

CREATE TABLE food_item (
	item_id INT AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	code VARCHAR(15) NOT NULL UNIQUE,
	price DOUBLE(8, 2) NOT NULL,
	discount DOUBLE(8, 2) DEFAULT 0.0,
	expire_date DATE NOT NULL,
	category ENUM('Burgers', 'Submarines', 'Beverages', 'Other'),
	PRIMARY KEY (item_id)
);

CREATE TABLE admin (
	admin_id INT AUTO_INCREMENT,
	name VARCHAR(30),
	phone VARCHAR(12) UNIQUE,
	email VARCHAR(30),
	address VARCHAR(60),
	salary DOUBLE(8, 2),
	position ENUM('Cashier', 'Manager'),
	dob DATE,
	password VARCHAR(15),
	PRIMARY KEY (admin_id)
);

CREATE TABLE customer (
	customer_id INT AUTO_INCREMENT,
	name VARCHAR(30),
	phone VARCHAR(12) UNIQUE,
	email VARCHAR(30),
	address VARCHAR(60),
	PRIMARY KEY (customer_id)
);

CREATE TABLE mos_order (
	order_id INT AUTO_INCREMENT,
	place_date DATE NOT NULL,
	total_amount DOUBLE(9, 2) NOT NULL,
	discount DOUBLE(7, 2) NOT NULL DEFAULT 0.0,
	final_amount DOUBLE(9, 2) NOT NULL,
	customer_id INT,
	admin_id INT,
	FOREIGN KEY (admin_id) REFERENCES admin (admin_id),
	FOREIGN KEY (customer_id) REFERENCES customer (customer_id),
	PRIMARY KEY (order_id),
	CHECK (final_amount = total_amount - discount)
);

CREATE TABLE order_item (
	item_id INT,
	order_id INT,
	quantity INT(5) NOT NULL,
	total_price DOUBLE(8, 2) NOT NULL,
	price_per_unit DOUBLE(7, 2) NOT NULL,
	FOREIGN KEY (item_id) REFERENCES food_item (item_id),
	FOREIGN KEY (order_id) REFERENCES mos_order (order_id),
	PRIMARY KEY (item_id, order_id)
);

CREATE TABLE receipt (
	receipt_id INT AUTO_INCREMENT,
	receipt_date TIME NOT NULL,
	receipt_time DATE NOT NULL,
	order_id INT,
	FOREIGN KEY (order_id) REFERENCES mos_order (order_id),
	PRIMARY KEY (receipt_id)
);

DESC report;
DESC food_item;
DESC admin;
DESC customer;
DESC mos_order;
DESC order_item;
DESC receipt;

INSERT INTO report (creation_date, type, detail) VALUES
('2024-01-01', 'Annual', 'Annual performance and sales report.'),
('2024-03-01', 'Monthly', 'Sales analysis for February.'),
('2024-04-01', 'Monthly', 'Customer feedback summary.'),
('2024-05-01', 'Monthly', 'Inventory management insights.'),
('2023-12-01', 'Annual', 'Yearly report of expenses and revenue.'),
('2024-06-01', 'Monthly', 'Promotional campaign results.'),
('2023-11-01', 'Monthly', 'Operational challenges summary.'),
('2024-02-01', 'Monthly', 'Special offers impact review.'),
('2023-10-01', 'Monthly', 'Staff performance evaluation.'),
('2023-09-01', 'Monthly', 'Quarterly targets overview.');

INSERT INTO food_item (name, code, price, discount, expire_date, category) VALUES
('Classic Burger', 'CLB001', 5.99, 0.50, '2024-12-31', 'Burgers'),
('Cheese Burger', 'CHB002', 6.49, 0.30, '2024-12-31', 'Burgers'),
('Veggie Burger', 'VGB003', 5.49, 0.00, '2024-12-31', 'Burgers'),
('Chicken Submarine', 'CHS004', 7.99, 1.00, '2024-12-20', 'Submarines'),
('Beef Submarine', 'BFS005', 8.49, 0.50, '2024-12-20', 'Submarines'),
('Coke', 'CK006', 1.99, 0.20, '2024-12-15', 'Beverages'),
('Orange Juice', 'OJ007', 2.49, 0.00, '2024-12-15', 'Beverages'),
('Fries', 'FR008', 2.99, 0.00, '2024-12-15', 'Other'),
('Ice Cream', 'IC009', 3.99, 0.25, '2024-12-10', 'Other'),
('Milkshake', 'MS010', 4.49, 0.50, '2024-12-10', 'Beverages');

INSERT INTO admin (name, phone, email, address, salary, position, dob, password) VALUES
('John Doe', '1234567890', 'john.doe@mos.com', '123 Burger St.', 3000.00, 'Manager', '1985-03-25', 'manager123'),
('Jane Smith', '9876543210', 'jane.smith@mos.com', '456 Submarine Ave.', 2500.00, 'Cashier', '1990-07-15', 'cashier456'),
('Mark Lee', '1122334455', 'mark.lee@mos.com', '789 Fries Ln.', 3200.00, 'Manager', '1982-11-05', 'admin789'),
('Emily Clark', '2233445566', 'emily.clark@mos.com', '101 Dessert Rd.', 2800.00, 'Cashier', '1995-05-20', 'clerk888'),
('Alice Brown', '3344556677', 'alice.brown@mos.com', '202 Shake Blvd.', 2900.00, 'Manager', '1988-09-30', 'shake999');

INSERT INTO customer (name, phone, email, address) VALUES
('Tom Hanks', '5551234567', 'tom.hanks@gmail.com', '25 Hollywood St.'),
('Sarah Connor', '5557654321', 'sarah.connor@gmail.com', '42 Sci-Fi Blvd.'),
('Jack Dawson', '5556789012', 'jack.dawson@gmail.com', '15 Titanic Ln.'),
('Rose DeWitt', '5558901234', 'rose.dewitt@gmail.com', '23 Drama Ave.'),
('Clark Kent', '5552468101', 'clark.kent@gmail.com', '77 Hero Rd.');

INSERT INTO mos_order (place_date, total_amount, discount, final_amount, customer_id, admin_id) VALUES
('2024-12-01', 15.97, 1.00, 14.97, 1, 1),
('2024-12-02', 19.97, 2.00, 17.97, 2, 2),
('2024-12-03', 10.97, 0.50, 10.47, 3, 3),
('2024-12-04', 22.47, 3.00, 19.47, 4, 4),
('2024-12-05', 18.97, 1.50, 17.47, 5, 5);

INSERT INTO order_item (item_id, order_id, quantity, total_price, price_per_unit) VALUES
(1, 1, 2, 11.98, 5.99),
(2, 1, 1, 3.99, 3.99),
(3, 2, 3, 16.47, 5.49),
(4, 2, 1, 3.50, 3.50),
(5, 3, 2, 13.98, 6.99),
(6, 4, 1, 2.49, 2.49),
(7, 5, 2, 9.98, 4.99),
(8, 5, 1, 2.99, 2.99);

INSERT INTO receipt (receipt_date, receipt_time, order_id) VALUES
('2024-12-01', '10:30:00', 1),
('2024-12-02', '11:15:00', 2),
('2024-12-03', '12:45:00', 3),
('2024-12-04', '14:00:00', 4),
('2024-12-05', '16:20:00', 5);

SELECT * FROM report;
SELECT * FROM food_item;
SELECT * FROM admin;
SELECT * FROM customer;
SELECT * FROM mos_order;
SELECT * FROM order_item;
SELECT * FROM receipt;
