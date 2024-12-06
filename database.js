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

export async function loadAdminByName (name, password) {
	const [results] = await pool.query(`
SELECT name, address, dob, email, phone, position, salary
FROM admin
WHERE name = ?
	`, [name]);
	return results[0];
}

export async function loadAdminByNameAndPW (name, password) {
	const [results] = await pool.query(`
SELECT name, address, dob, email, phone, position, salary
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
