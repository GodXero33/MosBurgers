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

	function placeOrder () {
		console.log(true);
	}

	function hideCartCard () {
		cartContainer.classList.remove('show');
	}

	function openCartCard () {
		cartContainer.classList.add('show');

		cartHolder.innerHTML = cartComponent;
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
			console.log(items);
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
