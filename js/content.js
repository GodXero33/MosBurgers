(function () {
	function init () {
		deleteStyleSheet('login');
		newStyleSheet('components/content/nav-panel.css', 'nav-panel');
		newStyleSheet('components/content/content.css', 'content');
		newStyleSheet('components/content/home.css', 'home');
		newStyleSheet('components/content/place-order.css', 'place-order');
		newStyleSheet('components/food-item/item-card.css', 'item-card');
		newStyleSheet('components/food-item/item-place.css', 'item-place');
		newStyleSheet('components/food-item/cart.css', 'cart');
		SHOP_WINDOW['loader'].classList.add('hide');

		loadDynamicSrcipt('js/nav-panel.js').then(data => {
			// console.log(data);
		}).catch(error => {
			console.error(error);
		});
		loadDynamicSrcipt('js/home.js').then(data => {
			// console.log(data);
		}).catch(error => {
			console.error(error);
		});
		loadDynamicSrcipt('js/place-order.js').then(data => {
			// console.log(data);
		}).catch(error => {
			console.error(error);
		});
	}

	async function createContent () {
		try {
			const response = await fetch('components/content/content.html', { cache: 'no-cache' });

			if (!response.ok) throw new Error('Failed to fetch');

			const html = await response.text();

			setTimeout(() => {
				SHOP_WINDOW['main-container'].innerHTML = html;
				init();
			}, 1);
		} catch (error) {
			console.error(error);
		}
	}

	createContent();
})();
