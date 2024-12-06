const SHOP_WINDOW = {
	db_host: 'http://localhost:5500'
};



function newStyleSheet (url, name) {
	const style = document.createElement('link');
	style.setAttribute('rel', 'stylesheet');
	style.setAttribute('href', `${url}?t=${new Date().getTime()}`);
	style.setAttribute('mos-style-name', name);
	document.head.appendChild(style);
}

function deleteStyleSheet (name) {
	const style = document.head.querySelector(`link[mos-style-name="${name}"]`);
	style.remove();
}

function loadDynamicSrcipt (url) {
	return new Promise((res, rej) => {
		try {
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.src = `${url}?t=${new Date().getTime()}`;

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

function sendWarningAlert (message) {
	alert(message);
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
