(function () {
	function init () {
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
	}

	async function createContent () {
		try {
			const response = await fetch('components/content.html');

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
