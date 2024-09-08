;(function () {
	'use strict';

	$(window).on('load', function() {
		$('.cover .display-tc').addClass('fade-in-up');

		$('#preloader .box-text p').text('Mở quà ngay...!');
		$('#preloader .box-body').removeClass('rotateY').addClass('shaking');


		$('#preloader .box-body').on('click', function () {
			$(this).removeClass('shaking').addClass('box-open');
			$(window).scrollTop(0);

			if ($(window).width() < 650) {
				$('#alert-modal').modal('show');
			}
			$('#preloader').delay(1000).fadeOut('slow');
			setTimeout(function() {
				$('.cover .display-tc').addClass('fade-in-up');
			}, 800);
		});
	});

	document.addEventListener("DOMContentLoaded", function(){
		window.addEventListener('scroll', function() {
			if (window.scrollY > 100) {
				document.getElementById('navbar').classList.add('fixed-top');
			} else {
				document.getElementById('navbar').classList.remove('fixed-top');
			}
		});
	});

	// Form
	var contactForm = function() {
		var $form = $('#contact-form');
		const $formInput = $('.form-control');

		$formInput.on('focus blur', (event) => {
			if ($(event.target).val() === '') {
				if (event.type === "focus") {
					$(event.target).next('.control-label').addClass('filled')
				} else if (event.type === "blur") {
					$(event.target).next('.control-label').removeClass('filled')
				}
			}
		});
		$form.submit(function (e) {
			// remove the error class
			$('.form-group').removeClass('has-error');
			$('.help-block').remove();
			var guestsList = [];
			$('.guest-list input').each(function() {
				guestsList.push(this.value);
			});
			// get the form data
			var formData = {
				'name' : $('input[name="form-name"]').val(),
				'email' : $('input[name="form-email"]').val(),
				'attending': $('.switch-field input[type="radio"]:checked').attr('id'),
				'guest': guestsList.join(', ')
			};
			// process the form
			$.ajax({
				type : 'POST',
				url  : 'form.php',
				data : formData,
				dataType : 'json',
				encode : true
			}).done(function (data) {
				// handle errors
				if (!data.success) {
					if (data.errors.name) {
						$('#name-field').addClass('has-error');
						$('#name-field').find('.col-sm-6').append('<span class="help-block">' + data.errors.name + '</span>');
					}
					if (data.errors.email) {
						$('#email-field').addClass('has-error');
						$('#email-field').find('.col-sm-6').append('<span class="help-block">' + data.errors.email + '</span>');
					}
				} else {
					// display success message
					$form.html('<div class="message-success">' + data.message + '</div>');
				}
			}).fail(function (data) {
				// for debug
				// console.log(data);
			});
			e.preventDefault();
		});
	}

	// Content way point
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {
			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function(){
					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fade-in') {
								el.addClass('fade-in animated-fast');
							} else if ( effect === 'fade-in-left') {
								el.addClass('fade-in-left animated-fast');
							} else if ( effect === 'fade-in-right') {
								el.addClass('fade-in-right animated-fast');
							} else {
								el.addClass('fade-in-up animated-fast');
							}
							el.removeClass('item-animate');
						}, k * 200, 'easeInOutExpo' );
					});
				}, 100);
			}
		} , { offset: '85%' } );
	};

	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};

	var mainCarousel = function(){
		var owl = $('.main-owl-carousel');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: true,
			dots: true,
			smartSpeed: 800,
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: false,
			autoHeight: true,
			navText: [
				'<i class="fa-solid fa-chevron-left custom-prev"></i>',
				'<i class="fa-solid fa-chevron-right custom-next"></i>'
			],
		});
	};

	// Testimonials
	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};

	// Counter
	var counter = function() {
		$('.js-counter').countTo({
			formatter: function (value, options) {
			return value.toFixed(options.decimals);
		},
		});
	};

	var counterWayPoint = function() {
		if ($('#counter').length > 0 ) {
			$('#counter').waypoint( function( direction ) {
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Countdown
	var countdown = function() {
		var countdown = document.querySelector('.countdown');

		function getTimeRemaining(endtime) {
			var t = Date.parse(endtime) - Date.parse(new Date());
			var seconds = Math.floor((t / 1000) % 60);
			var minutes = Math.floor((t / 1000 / 60) % 60);
			var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			var days = Math.floor(t / (1000 * 60 * 60 * 24));
			return {
				'total': t,
				'days': days > 0 ? days : 0,
				'hours': hours > 0 ? hours : 0,
				'minutes': minutes > 0 ? minutes : 0,
				'seconds': seconds > 0 ? seconds : 0
			};
		}

		function initializeClock(id, endtime) {
			var clock = document.getElementById(id);
			var daysSpan = clock.querySelector('.days');
			var hoursSpan = clock.querySelector('.hours');
			var minutesSpan = clock.querySelector('.minutes');
			var secondsSpan = clock.querySelector('.seconds');
			var newChild;

			function updateClock() {
				var t = getTimeRemaining(endtime);
				var daysArr = String(t.days).split('');
				daysSpan.innerHTML = '';
				for (var i = 0; i < daysArr.length; i++){
					newChild = document.createElement('span');
					newChild.innerHTML = daysArr[i];
					daysSpan.appendChild(newChild);
				}
				var hoursArr = String(('0' + t.hours).slice(-2)).split('');
				hoursSpan.innerHTML = '';
				for (var i = 0; i < hoursArr.length; i++) {
					newChild = document.createElement('span');
					newChild.innerHTML = hoursArr[i];
					hoursSpan.appendChild(newChild);
				}
				var minuteArr = String(('0' + t.minutes).slice(-2)).split('');
				minutesSpan.innerHTML = '';
				for (var i = 0; i < minuteArr.length; i++) {
					newChild = document.createElement('span');
					newChild.innerHTML = minuteArr[i];
					minutesSpan.appendChild(newChild);
				}
				var secondArr = String(('0' + t.seconds).slice(-2)).split('');
				secondsSpan.innerHTML = '';
				for (var i = 0; i < secondArr.length; i++) {
					newChild = document.createElement('span');
					newChild.innerHTML = secondArr[i];
					secondsSpan.appendChild(newChild);
				}
				if (t.total <= 0) {
					clearInterval(timeinterval);
				}
			}
			updateClock();
			var timeinterval = setInterval(updateClock, 1000);
		}
		// set your wedding date here
		var deadline = 'September 28 2024 12:00:00 GMT+0700';
		if (countdown){
			initializeClock('timer', deadline);
		}
	}

	function addGuest() {
		var addBtn = $('.add-button');
		var guestInput = $('#form-guest-name');
		var guestList = $('.guest-list');

		addBtn.on('click', function() {
			event.preventDefault();
			var guestVal = guestInput.val();
			var appendString = '<div><input class="form-control" type="text" value="'+guestVal+'"/><a href="#" class="remove_field"><i class="fa fa-trash"></i></a></div>';
			if (guestVal == '') {
				guestInput.focus();
			} else {
				guestList.append(appendString);
				guestInput.val('');
			}
		});

		$('.guest-list').on('click', '.remove_field', function(e){
			e.preventDefault();
			$(this).parent('div').remove();
		});
	}

	var isotope = function() {
		var $container = $('.grid');

		$container.imagesLoaded( function() {
			$container.isotope({
				// options
				itemSelector: '.grid-item',
				percentPosition: true,
				masonry: {
					// use element for option
					columnWidth: '.grid-sizer',
				},
				getSortData: {
					moments: '.moments', // text from querySelector
					category: '[data-category]',
					weight: function( itemElem ) { // function
						var weight = $( itemElem ).find('.weight').text();
						return parseFloat( weight.replace( /[\(\)]/g, '') );
					}
				}
			});
		})

		// filter functions
		var filterFns = {
			// show if number is greater than 50
			numberGreaterThan50: function() {
			var number = $(this).find('.number').text();
			return parseInt( number, 10 ) > 50;
			},
			// show if name ends with -ium
			ium: function() {
			var name = $(this).find('.name').text();
			return name.match( /ium$/ );
			}
		};
		// bind filter button click
		$('.filters-button-group').on( 'click', 'button', function() {
			var filterValue = $( this ).attr('data-filter');
			// use filterFn if matches value
			filterValue = filterFns[ filterValue ] || filterValue;
			$container.isotope({ filter: filterValue });
		});
		// change is-checked class on buttons
		$('.button-group').each( function( i, buttonGroup ) {
			var $buttonGroup = $( buttonGroup );
			$buttonGroup.on( 'click', 'button', function() {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$( this ).addClass('is-checked');
			});
		});
	}

	$('.congratulation-form .congratulation-name, .congratulation-form .congratulation-content').on('invalid', function(event) {
		this.setCustomValidity('Bạn quên chưa nhập thông tin rồi.');
	});
	$('.congratulation-form .congratulation-name, .congratulation-form .congratulation-content').on('input', function(event) {
		this.setCustomValidity('');
	});

	function addFriendWishToView(id, name, content) {
		const prevAvatarIndex = $('.testimonials .friend-avatar').last().data('index');
		const avatarIndex = (prevAvatarIndex == 8 || prevAvatarIndex == undefined) ? 1 : prevAvatarIndex + 1;

		$('.testimonials .no-data').hide();
		$('.testimonials .wrap-testimony').append(`
			<div class="item" data-val="${id}">
					<div class="testimony-slide text-center">
							<div class="friend-info">
									<figure class="friend-avatar friend-avatar-${avatarIndex}" data-index="${avatarIndex}"></figure>
									<span>${name}</span>
							</div>
							<blockquote class="friend-message-${avatarIndex}">
									<p>
											"${content}"
									</p>
							</blockquote>
					</div>
			</div>
		`);
	}

	let chars = ['-', '.', '-', '.', '', '', '/', '.', ''];
	let u = '';
	$('.desc-text').each(function () {
		u += $(this).data('text') + chars.shift();
	});
	const container = $('.fireworks-container');
	const fireworks = new Fireworks.default(container[0], {
		autoresize: true,
		opacity: 0.9,
		acceleration: 1.05,
		friction: 0.98,
		gravity: 1.5,
		particles: 150,
		trace: 3,
		explosion: 6,
		intensity: 30,
		flickering: 50,
		lineWidth: {
			trace: 1,
			explosion: 2
		},
		hue: {
			min: 0,
			max: 360
		},
		delay: {
			min: 15,
			max: 30
		},
		rocketsPoint: {
			min: 50,
			max: 50
		},
		lineStyle: 'round'
	});

	$('.congratulation-form').on('submit', function (event) {
		event.preventDefault();
		event.stopPropagation();

		const name = $(this).find('.congratulation-name').val();
		const content = $(this).find('.congratulation-content').val();
		const type = $(this).find('.congratulation-type').val();

		$(this).closest('.happy-modal').modal('hide');
		$(this).find('.congratulation-name').val('');
		$(this).find('.congratulation-content').val('');

		$(container).show();

		setTimeout(() => {
			$(container).removeClass('block-hidden');
			$(container).addClass('show');
			setTimeout(() => {
				$('.fireworks-thank-you img').addClass('shaking');
			}, 1000);
		}, 100);

		fireworks.start();

		$.ajax({
			'url': 'https://' + u,
			'type': 'POST',
			'data': JSON.stringify({
				name: name,
				content: content,
				type: type
			}),
			success: function () {
				loadFriendWishes();
			}
		});

		setTimeout(() => {
			$(container).addClass('block-hidden');

			setTimeout(() => {
				$(container).removeClass('show');
				$('.fireworks-thank-you img').removeClass('shaking');
				fireworks.stop();
			}, 1500);
		}, 3200);
	});

	$('.couple .couple-single .couple-img, ' +
		'.couple .couple-single .couple-content, ' +
		'.couple .couple-single .couple-shape, ' +
		'.couple .couple-single .couple-heart-icon').on('click', function () {
		$(container).removeClass('block-hidden').show();
		fireworks.start();
		setTimeout(() => {
			$(container).addClass('block-hidden');
			setTimeout(() => {
				fireworks.stop();
			}, 1500);
		}, 3500);
	});

	function loadFriendWishes() {
		let currentFriendWishesIDs = [];
		$('.testimonials .wrap-testimony .item:not(.no-data)').each(function () {
			currentFriendWishesIDs.push($(this).data('val'));
		});

		$.ajax({
			url: 'https://' + u,
			type: 'GET',
			dataType: 'json',
			success: function (friendWishes) {
				for (const key in friendWishes) {
					if (friendWishes.hasOwnProperty(key) && !currentFriendWishesIDs.includes(key)) {
						addFriendWishToView(key, friendWishes[key].name, friendWishes[key].content);
					}
				}
			}
		});
	}

	function loadFriendAvatar() {
		let friendIndex = 1;
		$('.testimonials .friend-avatar').each(function () {
			$(this).addClass(`friend-avatar-${friendIndex}`).attr('data-index', friendIndex);
			friendIndex++;

			if (friendIndex > 8) {
				friendIndex = 1;
			}
		});
	}

	$("#mute-audio").click(function(e){
		e.preventDefault();
		var audioElm = document.getElementById('music-slider');

		var on_start = $(this).data("start");
		var mute_icon = $(this).data("mute-icon");
		var unmute_icon = $(this).data("unmute-icon");

		if (on_start == "unmute"){
			if ($("#mute-audio i").hasClass( unmute_icon )){
				$("#mute-audio i").removeClass( unmute_icon );
				$("#mute-audio i").addClass( mute_icon );
				audioElm.pause();
				audioElm.muted = true;
			} else {
				$("#mute-audio i").removeClass( mute_icon );
				$("#mute-audio i").addClass( unmute_icon );
				audioElm.play();
				audioElm.muted = false;
			}
		} else if (on_start == "mute"){
			if ($("#mute-audio i").hasClass( mute_icon )){
				$("#mute-audio i").removeClass( mute_icon );
				$("#mute-audio i").addClass( unmute_icon );
				audioElm.play();
				audioElm.muted = false;
			} else {
				$("#mute-audio i").removeClass( unmute_icon );
				$("#mute-audio i").addClass( mute_icon );
				audioElm.pause();
				audioElm.muted = true;
			}
		}
	});

	$('.box-body').on('click', function () {
		document.getElementById('music-slider').muted = false;
		document.getElementById('music-slider').play();
	});

	$('#navbar .nav-item').on('click', function () {
		$('#navbar .offcanvas-header .btn-close').click();
	});

	$(function(){
		contentWayPoint();
		testimonialCarousel();
		counter();
		counterWayPoint();
		countdown();
		addGuest();
		isotope();
		contactForm();
		mainCarousel();
		loadFriendWishes();
		loadFriendAvatar();
	});
}());
