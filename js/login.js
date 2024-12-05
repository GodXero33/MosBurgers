(function () {
	function inputResetValidity (event) {
		event.target.setCustomValidity('');
		event.target.reportValidity();
	}

	async function loginClick (event) {
		const userNameInput = document.getElementById('user-name-input');
		const passwordInput = document.getElementById('password-input');
		const userName = userNameInput.value;
		const password = passwordInput.value;

		if (userName == '') {
			userNameInput.setCustomValidity('User Name can\'t be empty!');
			userNameInput.reportValidity();
			return;
		}

		let user;

		try {
			event.target.disabled = true;
			const response = await fetch('http://localhost:5500/admin/' + userName);
			event.target.disabled = false;

			if (!response.ok) throw new Error('Failed to fetch admins.');

			user = await response.json();
		} catch (error) {
			console.error(error);
			alert('Hey, Somthing went wrong. Please try again!');
			event.target.disabled = false;
			return;
		}

		console.log(user);

		if (!user) {
			userNameInput.setCustomValidity('User Name is not found!');
			userNameInput.reportValidity();
			return;
		}

		if (user['password'] != password) {
			passwordInput.setCustomValidity('Invalid Password!');
			passwordInput.reportValidity();
			return;
		}

		loginSuccess(user);
	}

	function releaseMemory () {
		document.getElementById('login-btn').removeEventListener('click', loginClick);
		document.getElementById('user-name-input').removeEventListener('input', inputResetValidity);
		document.getElementById('password-input').removeEventListener('input', inputResetValidity);

		loginClick = null;
		inputResetValidity = null;
		loginSuccess = null;
		releaseMemory = null;
	}

	function loginSuccess (user) {
		releaseMemory();
		document.title = `Mos Burger - ${user['name']}`;
		SHOP_WINDOW['loader'].classList.remove('hide');

		loadDynamicSrcipt('js/content.js').then(data => {
			// console.log(data);
		}).catch(error => {
			console.error(error);
		});
	}

	function init () {
		newStyleSheet('components/login/login.css', 'login');
		SHOP_WINDOW['loader'].classList.add('hide');
	
		document.getElementById('login-btn').addEventListener('click', loginClick);
		document.getElementById('user-name-input').addEventListener('input', inputResetValidity);
		document.getElementById('password-input').addEventListener('input', inputResetValidity);
	}

	async function createLogin () {
		try {
			const response = await fetch('components/login/login.html', { cache: 'no-cache' });

			if (!response.ok) throw new Error('Failed to fetch');

			const html = await response.text();
			SHOP_WINDOW['main-container'].innerHTML = html;
			init();
		} catch (error) {
			console.error(error);
		}
	}

	createLogin();
})();
