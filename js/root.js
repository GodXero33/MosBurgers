const SHOP_WINDOW = {};

function loadDynamicSrcipt (url) {
	return new Promise((res, rej) => {
		try {
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.src = url;

			script.addEventListener('load', () => {
				res({ ok: true });
			});

			script.addEventListener('error', () => {
				rej({ ok: false });
			});

			document.head.appendChild(script);
		} catch (error) {
			rej({ ok: false });
		}
	});
}

window.addEventListener('load', () => {
	SHOP_WINDOW['main-container'] = document.getElementById('main-container');
	SHOP_WINDOW['loader'] = document.getElementById('loader');

	loadDynamicSrcipt('js/login.js').then(data => {
		// console.log(data);
	}).catch(error => {
		console.error(error);
	});
});
