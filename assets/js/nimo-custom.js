(function ($) {
	"use strict";

	// image background
	function bgImageActive($scope, $) {
		$("[data-background]").each(function () {
			$(this).css(
				"background-image",
				"url(" + $(this).attr("data-background") + ") "
			);
		});
	}

	// tx_testimonial
	function tx_testimonial($scope, $) {
		if ($(".nm_t1_preview_slider_active").length) {
			const nm_t1_preview_slider_active = new Swiper(
				".nm_t1_preview_slider_active",
				{
					speed: 500,
					slidesPerView: "auto",
					spaceBetween: 20,
				}
			);

			const nm_t1_main_slider_active = new Swiper(
				".nm_t1_main_slider_active",
				{
					speed: 500,
					slidesPerView: "auto",
					effect: "fade",
					fadeEffect: { crossFade: true },
					navigation: {
						nextEl: ".kk_t1_next",
						prevEl: ".kk_t1_prev",
					},
					thumbs: {
						swiper: nm_t1_preview_slider_active,
					},
				}
			);
		}

		if ($(".nm-testimonial-1-preview-slider").length) {
			const slides = document.querySelectorAll(
				".nm-testimonial-1-preview-slider .swiper-slide"
			);
			const wrapper = document.querySelector(
				".nm-testimonial-1-preview-slider .swiper-wrapper"
			);

			const radius = 450;
			const centerX = wrapper.clientWidth / 2;
			const centerY = wrapper.clientHeight / 2;
			const total = slides.length;
			const angleStep = (2 * Math.PI) / total;

			slides.forEach((slide, index) => {
				const angle = index * angleStep;
				const x =
					centerX + radius * Math.cos(angle) - slide.clientWidth / 2;
				const y =
					centerY + radius * Math.sin(angle) - slide.clientHeight / 2;

				slide.style.left = `${x}px`;
				slide.style.top = `${y}px`;
			});
		}

		var t1scrollAni = gsap.timeline({
			scrollTrigger: {
				trigger: ".nm-testimonial-1-preview-slider",
				toggleActions: "play none none reverse",
				scrub: true,
				markers: false,
			},
		});

		t1scrollAni.fromTo(
			".nm-testimonial-1-preview-slider .swiper-wrapper",
			{
				rotation: 40,
			},
			{ rotation: -40 }
		);

		if ($(".nm-testimonial-2-preview-slider").length) {
			const imgSlider = new Swiper(".nm-testimonial-2-img-slider", {
				slidesPerView: 1,
				loop: true,
				speed: 800,
				effect: "fade",
				fadeEffect: {
					crossFade: true,
				},
			});

			const previewSlider = new Swiper(
				".nm-testimonial-2-preview-slider",
				{
					speed: 800,
					spaceBetween: 25,
					centeredSlides: true,
					loop: true,
					breakpoints: {
						0: {
							slidesPerView: 1,
						},
						576: {
							slidesPerView: 3,
						},
						768: {
							slidesPerView: 5,
						},
						992: {
							slidesPerView: 4,
						},
						1200: {
							slidesPerView: 5,
						},
					},
				}
			);

			const contentSlider = new Swiper(
				".nm-testimonial-2-content-slider",
				{
					slidesPerView: 1,
					loop: true,
					speed: 800,
					effect: "fade",
					fadeEffect: {
						crossFade: true,
					},
				}
			);

			const nextBtn = document.querySelector(".t2_slider_next");
			const prevBtn = document.querySelector(".t2_slider_prev");

			if (nextBtn && prevBtn) {
				nextBtn.addEventListener("click", () => {
					imgSlider.slideNext();
					previewSlider.slideNext();
					contentSlider.slideNext();
				});
				prevBtn.addEventListener("click", () => {
					imgSlider.slidePrev();
					previewSlider.slidePrev();
					contentSlider.slidePrev();
				});
			}
		}

		if ($(".t4_slider_active").length) {
			var t4_slider_active = new Swiper(".t4_slider_active", {
				loop: true,
				slidesPerView: "auto",
				spaceBetween: 24,
				autoplay: {
					delay: 5000,
				},
				navigation: {
					nextEl: ".t4_btn_next",
					prevEl: ".t4_btn_prev",
				},

				pagination: {
					el: ".t4_slider_pagi",
					clickable: true,
				},
			});
		}
	}

	function tx_team_lists($scope, $) {
		if ($(".nm_t1_slider_active").length) {
			const nm_t1_slider_active = new Swiper(".nm_t1_slider_active", {
				loop: true,
				speed: 800,
				breakpoints: {
					0: {
						slidesPerView: 1,
						centeredSlides: false,
					},
					576: {
						slidesPerView: 1,
						centeredSlides: false,
					},
					768: {
						slidesPerView: 2,
						centeredSlides: false,
						spaceBetween: 20,
					},
					992: {
						slidesPerView: 2,
						spaceBetween: 0,
						centeredSlides: true,
					},
					1200: {
						slidesPerView: 3,
						spaceBetween: 0,
						centeredSlides: true,
					},
				},

				navigation: {
					nextEl: ".team1_slider_next",
					prevEl: ".team1_slider_prev",
				},
			});
		}
	}

	// tx_hero_slider
	function tx_hero_slider($scope, $) {
		// nm-hero-slider-active
		if ($('.nm-hero-slider-active').length) {
			const nm_hero_slider_active = new Swiper('.nm-hero-slider-active', {
				loop: true,
				speed: 1000,
				effect: "slide",
				fadeEffect: {
					crossFade: true
				},
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				navigation: {
					nextEl: ".nm-hero-slider-next",
					prevEl: ".nm-hero-slider-prev",
				},
			});
		}
	}


	$(window).on("elementor/frontend/init", function () {
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_brand.default",
			function ($scope, $) {
				bgImageActive($scope, $);
			}
		);
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_testimonial.default",
			function ($scope, $) {
				bgImageActive($scope, $);
				tx_testimonial($scope, $);
			}
		);
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_team_lists.default",
			function ($scope, $) {
				bgImageActive($scope, $);
				tx_team_lists($scope, $);
			}
		);
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_post_grid.default",
			function ($scope, $) {
				bgImageActive($scope, $);
			}
		);
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_hero_section.default",
			function ($scope, $) {
				bgImageActive($scope, $);
			}
		);
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_cta.default",
			function ($scope, $) {
				bgImageActive($scope, $);
			}
		);
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_about.default",
			function ($scope, $) {
				bgImageActive($scope, $);
			}
		);
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_pricing_section.default",
			function ($scope, $) {
				bgImageActive($scope, $);
			}
		);
		elementorFrontend.hooks.addAction(
			"frontend/element_ready/tx_hero_slider.default",
			function ($scope, $) {
				tx_hero_slider($scope, $);
			}
		);
	});

	// Manual initialization for static site (outside Elementor)
	$(document).ready(function () {
		bgImageActive(null, $);
		tx_testimonial(null, $);
		tx_team_lists(null, $);
		tx_hero_slider(null, $);

		// Video Popup Initialization
		if ($(".popup_video").length) {
			$(".popup_video").magnificPopup({
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false
			});
		}

		// Working Clock
		const clockFace = document.querySelector('.nm-working-clock');
		if (clockFace) {
			const secondHand = document.querySelector('.second-hand');
			const minsHand = document.querySelector('.min-hand');
			const hourHand = document.querySelector('.hour-hand');

			function setDate() {
				const now = new Date();

				const seconds = now.getSeconds();
				const secondsDegrees = ((seconds / 60) * 360) + 90;
				secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

				const mins = now.getMinutes();
				const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
				minsHand.style.transform = `rotate(${minsDegrees}deg)`;

				const hour = now.getHours();
				const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
				hourHand.style.transform = `rotate(${hourDegrees}deg)`;
			}

			setInterval(setDate, 1000);
			setDate(); // init
		}

		// Smoother Vanilla JS Counter with RAF and NaN fixing
		const counterElements = document.querySelectorAll(".counter");
		if (counterElements.length) {
			const observer = new IntersectionObserver(
				(entries, observer) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const counter = entry.target;
							// Clean the text to ensure it's a number
							let text = counter.innerText.trim();
							// Try to find the target number, ignoring non-digits
							const match = text.match(/(\d+)/);
							if (!match) return; // Skip if no digits found

							const target = parseInt(match[0]);

							if (isNaN(target)) return;

							const duration = 2000; // ms
							const startTimestamp = performance.now();

							const step = (timestamp) => {
								const progress = Math.min((timestamp - startTimestamp) / duration, 1);
								// Easing function for smooth stop (easeOutExpo)
								const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

								const current = Math.floor(easeProgress * target);
								counter.innerText = current;

								if (progress < 1) {
									window.requestAnimationFrame(step);
								} else {
									counter.innerText = target; // Ensure final value matches exactly
								}
							};

							window.requestAnimationFrame(step);

							observer.unobserve(counter);
							counter.classList.add('animated');
						}
					});
				},
				{ threshold: 0.5 }
			);

			counterElements.forEach((el) => observer.observe(el));
		}
	});
})(jQuery);
