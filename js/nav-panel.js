(function () {
	let navPanel = document.getElementById('nav-panel');
	const navOpenBtn = navPanel.querySelector('input[type="checkbox"]');
	let navBtns = Array.from(navPanel.querySelectorAll('.btn'));
	const contentSections = Array.from(document.getElementById('content-container').querySelectorAll('section'));
	let currentActiveBtn = 1;

	function closeNavbar () {
		navOpenBtn.checked = false;
	}

	navPanel.querySelector('.backdrop').addEventListener('click', closeNavbar);

	navBtns.forEach((btn, index) => {
		if (currentActiveBtn == index) {
			currentActiveBtn = index;
			contentSections[currentActiveBtn].classList.remove('hide');
		}

		btn.addEventListener('click', () => {
			contentSections[currentActiveBtn].classList.add('hide');
			currentActiveBtn = index;
			contentSections[currentActiveBtn].classList.remove('hide');
			closeNavbar();
		});
	});

	navPanel = null;
	navBtns = null;
})();
