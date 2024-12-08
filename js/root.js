const SHOP_WINDOW = {
	db_host: 'http://localhost:5500'
};



function newStyleSheet (url, name) {
	return new Promise(async (res, rej) => {
		try {
			const response = await fetch(`${url}?t=${new Date().getTime()}`);
			
			if (!response.ok) throw new Error('Failed to load style sheet. ' + url);

			const css = await response.text();

			const style = document.createElement('style');
			style.setAttribute('mos-style-name', name);
			style.innerHTML = css;
			document.head.appendChild(style);
			res();
		} catch (error) {
			rej(error);
		}
	});
}

function deleteStyleSheet (name) {
	const style = document.head.querySelector(`style[mos-style-name="${name}"]`);
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

function sendInfoAlert (message) {
	alert(message);
}

function wait (time) {
	return new Promise(res => setTimeout(res, time));
}

window.addEventListener('load', async () => {
	SHOP_WINDOW['main-container'] = document.getElementById('main-container');
	SHOP_WINDOW['loader'] = document.getElementById('loader');

	try {
		await loadDynamicSrcipt('js/login.js');
	} catch (error) {
		console.error(error);
	}
});
