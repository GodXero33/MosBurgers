INSERT INTO report (creation_date, type, detail) VALUES
('2024-11-30', 1, 'Report on November sales and customer trends'),
('2024-12-31', 2, 'Annual sales overview and performance analysis');

INSERT INTO customer (name, phone, email, address) VALUES
('Sathish Shan', '0712345678', 'shan@example.com', '60, Alokamawatha, Walawegama, Udawalawe'),
('Lahiru Madhushan', '0787654321', 'lahiru@example.com', '64, Samamawatha, Walawegama, Udawalawe');

INSERT INTO food_item (name, price, code, discount, expire_date, category) VALUES
('Classic Burger', 750.00, "12asd3458456", 100.00, '2024-12-15', 'Burgers'),
('Cheese Burger', 1000.00, "827719sds023", 500.00, '2024-12-20', 'Burgers'),
('Crispy Chicken Submarine', 1500.00, "78466cjd3", 0.00, '2024-12-18', 'Submarines'),
('Pepsi', 1500.00, "8723yfvf647hb", 0.00, '2024-12-10', 'Beverages');

INSERT INTO mos_order (place_date, total_amount, discount, final_amount, customer_id) VALUES
('2024-12-01', 2500.00, 500.00, 2000.00, 1),
('2024-12-02', 3200.00, 400.00, 2800.00, 2);

INSERT INTO order_item (item_id, order_id, quantity, total_price, price_per_unit) VALUES
(1, 1, 2, 1500.00, 750.00),
(3, 1, 1, 1500.00, 1500.00),
(2, 2, 3, 3000.00, 1000.00),
(4, 2, 2, 3000.00, 1500.00);

SELECT * FROM report;
SELECT * FROM customer;
SELECT * FROM food_item;
SELECT * FROM mos_order;
SELECT * FROM order_item;
