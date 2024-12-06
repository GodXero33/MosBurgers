(function () {
	const itemsHolder = document.getElementById('place-order-items-holder');
	const itemPlaceContainer = document.getElementById('item-place-card');
	const itemPlaceContainerCloseBtn = document.getElementById('item-place-card-close-btn');
	const itemPlaceContainerBackdrop = itemPlaceContainer.querySelector('.backdrop');
	const itemPlaceCardContainer = document.getElementById('item-place-card-holder');
	const itemPlaceCountInput = document.getElementById('item-place-count-input');
	const itemPlacePlaceBtn = document.getElementById('item-place-place-btn');
	const cartContainer = document.getElementById('cart-container');
	const cartCloseBtn = document.getElementById('cart-close-btn');
	const cartOpenBtn = document.getElementById('open-cart-btn');
	const cartPlaceBtn = document.getElementById('cart-place-btn');
	const cartHolder = document.getElementById('cart-holder');

	let items = null;
	let placeOrderCardComponent = null;
	let itemPlaceComponent = null;
	let cartComponent = null;
	let cartItemComponent = null;
	let currentPlaceItemIndex = -1;
	let currentPlaceItemCard = null;
	const cart = {
		items: [],
		price: 0,
		discount: 0,
		total: 0
	};

	async function placeOrder () {
		if (cart.items.length == 0) {
			sendWarningAlert('The cart is Empty. Can\'t place an order right networkInterfaces. Please add somthing into the cart.');
			return;
		}

		// After adding customer details
		const customer_id = 1;
		const admin_id = SHOP_WINDOW['admin'].admin_id;
		const today = new Date();
		const place_date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
		const total_amount = cart.total;
		const discount = cart.discount;
		const final_amount = cart.total;
		
		const order = {
			customer_id,
			admin_id,
			place_date,
			total_amount,
			discount,
			final_amount,
			items: cart.items.map(cartItem => {
				const item_id = cartItem.item.item_id;
				const quantity = cartItem.count;
				const total_price = cartItem.total;
				const price_per_unit = cartItem.item.price;

				return {
					item_id,
					quantity,
					total_price,
					price_per_unit
				};
			})
		};

		try {
			const response = await fetch(`${SHOP_WINDOW.db_host}/order`, {
				method: 'POST',
				body: JSON.stringify(order),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) throw new Error('Somthing went wrong while placing order.');

			const data = await response.json();
			
			if (data.ok) {
				alert('Order Placed!');
				hideCartCard();
				resetCart();
			} else {
				alert('Order Failed!');
			}
		} catch (error) {
			console.log(error);
		}
	}

	function hideCartCard () {
		cartContainer.classList.remove('show');
	}

	function openCartCard () {
		cartContainer.classList.add('show');

		let cartItemsHTML = '';

		cart.items.forEach(cartItem => {
			itemHTML = cartItemComponent
				.replace(':NAME', cartItem.item.name)
				.replace(':QUANTITY', cartItem.count)
				.replace(':PRICE', cartItem.price.toFixed(2))
				.replace(':DISCOUNT', cartItem.discount.toFixed(2))
				.replace(':TOTAL', cartItem.total.toFixed(2));
			
			cartItemsHTML += itemHTML;
		});

		cartHolder.innerHTML = cartComponent
			.replace(':ITEMS', cartItemsHTML)
			.replace(':PRICE', cart.price.toFixed(2))
			.replace(':DISCOUNT', cart.discount.toFixed(2))
			.replace(':TOTAL', cart.total.toFixed(2));
	}

	function resetCart () {
		cart.items = [],
		cart.price = 0;
		cart.discount = 0;
		cart.total = 0;

		itemsHolder.querySelectorAll('.item-card').forEach(card => {
			if (card.classList.contains('active')) card.classList.remove('active');
		});
	}

	function updateCart () {
		let price = 0;
		let discount = 0;
		let total = 0;

		cart.items.forEach(cartItem => {
			price += cartItem.price;
			discount += cartItem.discount;
			total += cartItem.total;
		});

		cart.price = price;
		cart.discount = discount;
		cart.total = total;
	}

	function addPlaceItemToCart () {
		if (currentPlaceItemIndex == -1) return;

		const item = items[currentPlaceItemIndex];
		const existItemIndex = cart.items.findIndex(cartItem => cartItem.item.code == item.code);
		const count = itemPlaceCountInput.value;

		if (itemPlaceCountInput.value == 0) {
			if (existItemIndex == -1) {
				sendWarningAlert('Qunatity is 0.');
				return;
			}

			cart.items.splice(existItemIndex, 1);
			currentPlaceItemCard.classList.remove('active');
			hideItemPlaceCard();
			updateCart();
			return;
		}
	
		const existItem = cart.items[existItemIndex];

		if (existItem) {
			const price = item.price * count;
			const discount = item.discount * count;
			const total = price - discount;

			existItem.count = count;
			existItem.price = price;
			existItem.discount = discount;
			existItem.total = total;
		} else {
			const price = item.price * count;
			const discount = item.discount * count;
			const total = price - discount;

			cart.items.push({
				item,
				count,
				price,
				discount,
				total
			});
		}

		currentPlaceItemCard.classList.add('active');
		hideItemPlaceCard();
		updateCart();
	}

	function hideItemPlaceCard () {
		itemPlaceContainer.classList.remove('show');
		itemPlaceCountInput.value = 0;
		currentPlaceItemIndex = -1;
		currentPlaceItemCard = null;
	}

	function showItemPlaceCard () {
		itemPlaceContainer.classList.add('show');

		const item = items[currentPlaceItemIndex];
		const existItem = cart.items.find(cartItem => cartItem.item.code == item.code);

		if (existItem) {
			itemPlaceCountInput.value = existItem.count;
		}
	}

	function updateItemPlaceCard () {
		const item = items[currentPlaceItemIndex];
		const count = itemPlaceCountInput.value;
		const price = item.price * count;
		const discount = item.discount * count;
		const total = price - discount;
		const { name, category, code } = item;

		const holderHTML = itemPlaceComponent
			.replace(':NAME', name)
			.replace(':CATEGORY', category)
			.replace(':PRICE', price.toFixed(2))
			.replace(':DISCOUNT', discount.toFixed(2))
			.replace(':TOTAL', total.toFixed(2))
			.replace(':IMAGE', code);
		
		itemPlaceCardContainer.innerHTML = holderHTML;
	}

	function createFoodCards () {
		items.forEach((item, index) => {
			const card = placeOrderCardComponent
				.replace(':PRICE', item['price'])
				.replace(':DISCOUNT', item['discount'])
				.replace(':TITLE', item['name'])
				.replace(':IMAGE', item['code'])
				.replace(':INDEX', index);

			itemsHolder.innerHTML += card;
		});
	}

	async function loadItems () {
		try {
			const response = await fetch(`${SHOP_WINDOW.db_host}/items`);

			if (!response.ok) throw new Error('Failed to fetch items data.');

			items = await response.json();
		} catch (error) {
			console.error(error);
		}
	}

	async function loadComponent (component) {
		try {
			const response = await fetch(`components/food-item/${component}.html`);

			if (!response.ok) throw new Error(`Failed to fetch ${component} component.`);

			const componentHTML = await response.text();
			return componentHTML;
		} catch (error) {
			console.error(error);
		}
	}

	async function loadFoodResources () {
		await loadItems();
		placeOrderCardComponent = await loadComponent('item-card');
		itemPlaceComponent = await loadComponent('item-place');
		cartComponent = await loadComponent('cart');
		cartItemComponent = await loadComponent('cart-item');

		createFoodCards();

		document.getElementById('place-order-section').addEventListener('click', (event) => {
			if (event.target == itemPlaceContainerCloseBtn || event.target == itemPlaceContainerBackdrop) {
				hideItemPlaceCard();
				return;
			}

			if (event.target == cartCloseBtn) {
				hideCartCard();
				return;
			}

			if (event.target == cartOpenBtn) {
				openCartCard();
				return;
			}

			if (event.target == cartPlaceBtn) {
				placeOrder();
				return;
			}

			const card = event.target.closest('.item-card');
	
			if (!card) return;
	
			currentPlaceItemIndex = card.dataset.index * 1;
			currentPlaceItemCard = card;
			showItemPlaceCard();
			updateItemPlaceCard();
		});

		itemPlacePlaceBtn.addEventListener('click', addPlaceItemToCart);
		itemPlaceCountInput.addEventListener('input', updateItemPlaceCard);
	}

	loadFoodResources();
})();
