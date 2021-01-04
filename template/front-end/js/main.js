import './modules/$.js';

const loader = $('.loader');

window.addEventListener('load', () => {
	loader.classList.add('loaded-1');
	loader.addEventListener('transitionend', () => {
		setTimeout(() => {
			loader.style.transition = '3s';
			loader.classList.add('loaded-2');
			loader.addEventListener('transitionend', () => loader.remove());
		}, 500);
	});
});
