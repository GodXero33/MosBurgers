import express from 'express';

import cors from 'cors';

import {
	loadCustomers,
	loadCustomerByName,
	loadCustomerById,
	addCustomer,
	loadAdminByName,
	loadAdminByNameAndPW,
	loadItems
} from './database.js';

const app = express();
app.use(express.json());

app.use(cors({
	origin: 'http://localhost'
}));

app.get('/customers', async (req, res) => {
	const customers = await loadCustomers();
	res.send(customers);
});

app.get('/customers/:id', async (req, res) => {
	const id = req.params.id;
	const customer = await loadCustomerById(id);
	res.send(customer);
});

app.get('/admin/:name', async (req, res) => {
	const name = req.params.name;
	let customer = await loadAdminByName(name);

	if (customer) {
		customer.ok = true;
	} else {
		customer = { ok: false };
	}

	res.send(customer);
});

app.get('/admin/:name/:password', async (req, res) => {
	const name = req.params.name;
	const password = req.params.password;
	let customer = await loadAdminByNameAndPW(name, password);

	if (customer) {
		customer.ok = true;
	} else {
		customer = { ok: false };
	}

	res.send(customer);
});

app.get('/items', async (req, res) => {
	const items = await loadItems();
	res.send(items);
});

app.post('/customers', async (req, res) => {
	const { name, phone, email, address } = req.body;
	const customer = await addCustomer(name, phone, email, address);
	res.status(201).send(customer);
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

app.listen(5500, () => {
	console.log('Server is running on port 5500');
});
