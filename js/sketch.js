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
	// 
}








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
