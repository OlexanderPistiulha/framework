window.addEventListener('DOMContentLoaded', function () {


	//=========================================== slider===========================================
	let slides = document.querySelectorAll('.slider__slide'),
		prev = document.querySelector('.slider__prev'),
		next = document.querySelector('.slider__next'),
		sliderWindow = document.querySelector('.slider__window'),
		innerWindow = document.querySelector('.slider__inner-window'),
		dotsWrapp = document.querySelector('.slider__dots-wrapp'),
		sliderWindowWidth = window.getComputedStyle(sliderWindow).width,
		slideIndex = 1,
		offset = 0;

	// it is neets more learn, how fitt two or more slides in window
	innerWindow.style.width = 100 * (slides.length) + '%';

	slides.forEach(slide => {
		slide.style.width = sliderWindowWidth;
	});

	const indicators = document.createElement('ol'),
		dots = [];
	indicators.classList.add('slider__dots');


	dotsWrapp.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('slider__dot');
		//
		if (i == 0) {
			dot.classList.add('slider__dot-active');
		}
		indicators.append(dot);
		dots.push(dot);
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(sliderWindowWidth) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(sliderWindowWidth);
		}

		innerWindow.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		dots.forEach(dot => dot.style.opacity = ".5");
		dots[slideIndex - 1].style.opacity = 1;
	});

	next.addEventListener('click', () => {
		if (offset == (deleteNotDigits(sliderWindowWidth) * (slides.length - 1))) {
			offset = 0;
		} else {
			offset += deleteNotDigits(sliderWindowWidth);
		}

		innerWindow.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		dots.forEach(dot => dot.style.opacity = ".5");
		dots[slideIndex - 1].style.opacity = 1;
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(sliderWindowWidth) * (slideTo - 1);

			innerWindow.style.transform = `translateX(-${offset}px)`;

			dots.forEach(dot => dot.style.opacity = ".5");
			dots[slideIndex - 1].style.opacity = 1;
		});
	});
});