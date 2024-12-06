import mysql from 'mysql2';

import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
}).promise();

export async function loadCustomers () {
	const [results] = await pool.query(`
SELECT *
FROM customer
	`);
	return results;
}

export async function loadCustomerByName (userName) {
	const [results] = await pool.query(`
SELECT *
FROM customer
WHERE name = ?
	`, [userName]);
	return results[0];
}

export async function loadCustomerById (id) {
	const [results] = await pool.query(`
SELECT *
FROM customer
WHERE customer_id = ?
	`, [id]);
	return results[0];
}

export async function addCustomer (name, phone, email, address) {
	const [result] = await pool.query(`
INSERT INTO customer (name, phone, email,  address)
VALUES (?, ?, ?, ?)
	`, [name, phone, email, address]);
	const id = result.insertId;
	return loadCustomerById(id);
}

export async function loadAdminByName (name) {
	const [results] = await pool.query(`
SELECT name, address, dob, email, phone, position, salary, admin_id
FROM admin
WHERE name = ?
	`, [name]);
	return results[0];
}

export async function loadAdminByNameAndPW (name, password) {
	const [results] = await pool.query(`
SELECT name, address, dob, email, phone, position, salary, admin_id
FROM admin
WHERE name = ? AND password = ?
	`, [name, password]);
	return results[0];
}

export async function loadItems () {
	const [results] = await pool.query(`
SELECT *
FROM food_item
	`);
	return results;
}

export async function placeOrder (customer_id, admin_id, place_date, total_amount, discount, final_amount, items) {
	let [result] = await pool.query(`
INSERT INTO mos_order (customer_id, admin_id, place_date, total_amount, discount, final_amount)
VALUES (?, ?, ?, ?, ?, ?)
	`, [customer_id, admin_id, place_date, total_amount, discount, final_amount]);
	const order_id = result.insertId;

	items.forEach(async item => {
		await pool.query(`
INSERT INTO order_item (item_id, order_id, quantity, total_price, price_per_unit)
VALUES (?, ?, ?, ?, ?)
		`, [item.item_id, order_id, item.quantity, item.total_price, item.price_per_unit]);
	});

	const today = new Date();
	const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
	const time = `${today.getHours()}:${today.getMinutes()}:00`;

	await pool.query(`
INSERT INTO receipt (receipt_date, receipt_time, order_id)
VALUES (?, ?, ?)
	`, [date, time, order_id]);
}
