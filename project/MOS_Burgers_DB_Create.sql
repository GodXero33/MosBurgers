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

CREATE TABLE customer (
	customer_id INT AUTO_INCREMENT,
	name VARCHAR(30),
	phone VARCHAR(12) UNIQUE,
	email VARCHAR(30),
	address VARCHAR(60),
	PRIMARY KEY (customer_id)
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

CREATE TABLE mos_order (
	order_id INT AUTO_INCREMENT,
	place_date DATE NOT NULL,
	total_amount DOUBLE(9, 2) NOT NULL,
	discount DOUBLE(7, 2) NOT NULL DEFAULT 0.0,
	final_amount DOUBLE(9, 2) NOT NULL,
	customer_id INT,
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

DESC report;
DESC customer;
DESC food_item;
DESC mos_order;
DESC order_item;
