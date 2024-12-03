function addNewFood (data) {
	fetch('includes/new_food.inc.php', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => response.json()).then(data => {
		console.log(data);
	});	
}

function deleteFood (code) {
	fetch('includes/delete_food.inc.php', {
		method: 'POST',
		body: JSON.stringify({ code }),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => response.json()).then(data => {
		console.log(data);
	});	
}

function updatePrice (name, newPrice) {
	fetch('includes/update_price.inc.php', {
		method: 'POST',
		body: JSON.stringify({ name, price: newPrice }),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => response.json()).then(data => {
		console.log(data);
	});	
}

function updateDiscount (name, discount) {
	fetch('includes/update_discount.inc.php', {
		method: 'POST',
		body: JSON.stringify({ name, discount }),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => response.json()).then(data => {
		console.log(data);
	});	
}


// ---------------------------------------------------------------------

function addNewCustomer (data) {
	fetch('includes/new_customer.inc.php', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => response.json()).then(data => {
		console.log(data);
	});	
}

function deleteCustomer (phone) {
	fetch('includes/delete_customer.inc.php', {
		method: 'POST',
		body: JSON.stringify({ phone }),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => response.json()).then(data => {
		console.log(data);
	});
}


// ---------------------------------------------------------------------

function placeOrder (data) {
	fetch('includes/place_order.inc.php', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => response.text()).then(data => {
		console.log(data);
	});
}



// ---------------------------------------------------------------------

function addRecord (data) {
	fetch('includes/add_record.inc.php', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(response => response.text()).then(data => {
		console.log(data);
	});
}


// ---------------------------------------------------------------------

// ---------------------------------------------------------------------

/* addNewFood({
	name: 'Classic Burger',
	price: 500.0,
	code: Math.floor(Math.random() * 1e15).toString(),
	discount: 0,
	expire_date: '2025-09-04',
	category: 'Burgers'
}); */
// deleteFood('50734882587157');
// updatePrice('Classic Burger', 1000);
// updateDiscount('Classic Burger', 140);


/* addNewCustomer({
	name: 'shan',
	phone: '07280354736',
	email: 'shan@dsd.com',
	address: 'no 60, sks, cjsdsd'
}); */
// deleteCustomer('0712345678');


/* placeOrder({
	customer: '0787654321',
	place_date: '2024-12-24',
	total_amount: 1200,
	discount: 200,
	final_amount: 1000,
	order_items: [
		{
			code: '12asd3458456',
			quantity: 2,
			total_price: 400,
			price_per_unit: 200
		},
		{
			code: '827719sds023',
			quantity: 1,
			total_price: 600,
			price_per_unit: 600
		}
	]
}); */


/* addRecord({
	creation_date: '2024-12-24',
	type: 'Annual',
	detail: 'Hi this is new record ' + Math.floor(Math.random() * 1e5)
});
 */
