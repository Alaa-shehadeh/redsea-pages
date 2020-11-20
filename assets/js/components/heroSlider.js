function heroSliderInit() {
	$('.hero_slider_item', $heroSlider).each(function() {
		let $this = $(this);
		let $title = $('.heroSliderItemTitle', $this);
		let $subTitle = $('.heroSliderItemSubTitle', $this);

		let splittedTitle = new SplitText($title, {type: "lines", linesClass: 'split_title'});
		new SplitText($title, {type: "lines", linesClass: 'split_title_wrap'});


		let slideData = {
			'el': $this,
			'elTitle': splittedTitle,
			'elSubTitle': $subTitle,
			'elDecor': $('.hero_slider_decor', $this),
			'elImage': $('.hero_slider_w_img', $this),
			'elContentW': $('.hero_slider_content', $this),
			'elContents': $('.heroSliderContent', $this),
		};

		heroSlidesArray.push(slideData);
	});

	$heroSlider.on('init', (event, slick, currentSlide) => {
		gsap.set(heroSlidesArray[0].elImage, {
			xPercent: -100
		});
		gsap.set(heroSlidesArray[0].elContentW, {
			opacity: 1
		});
	});

	$heroSlider.slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		speed: 0,
		arrows: false,
		touchMove: false,
		waitForAnimate: false,
		accessibility: false,
		rtl: isRtl
	});
	
	// $('.test_button.prev_mod').click(function () {
	// 	if(!isHeroAnimDone) {

	// 		if (currentHeroSlideIndex === 0) {
	// 			$heroSlider.slick('slickGoTo', heroSlidesArray.length-1);
	// 		} else {
	// 			$heroSlider.slick("slickPrev");
	// 		}

	// 	}
	// });

	// $('.test_button.next_mod').click(function () {
	// 	if(!isHeroAnimDone) {

	// 		if (currentHeroSlideIndex === heroSlidesArray.length-1) {
	// 			$heroSlider.slick('slickGoTo', 0);
	// 		} else {
	// 			$heroSlider.slick('slickNext');
	// 		}

	// 	}
	// });

	$heroSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		if (currentSlide !== nextSlide) {
			heroSliderAnim(currentSlide, nextSlide);
		}
	});

}

function heroSliderAnim(currentSlide, nextSlide) {

	const createTitlesAnim = (indexSlide, direction) => {
		const subTl = gsap.timeline();
		let fromYvalue;
		let toYvalue;

		if (direction === 'leave') {
			fromYvalue = 0;
			toYvalue = 100;
		} else {
			fromYvalue = 100;
			toYvalue = 0;
		}

		subTl
			.fromTo([heroSlidesArray[indexSlide].elTitle.lines, heroSlidesArray[indexSlide].elSubTitle], {
				yPercent: fromYvalue
			}, {
				yPercent: toYvalue,
				duration: .7,
				stagger: .06,
				ease: "power4.out"
			})

		return subTl;
	};

	const createAllContentsAnim = (indexSlide, direction) => {
		const subTl = gsap.timeline();

		let fromOpacityValue = direction === 'leave' ? 1 : 0;
		let toOpacityValue = direction === 'leave' ? 0 : 1;

		subTl
			.fromTo(heroSlidesArray[indexSlide].elContents, {
				opacity: fromOpacityValue
			}, {
				opacity: toOpacityValue,
				duration: .4,
			})

		return subTl;
	};

	const tlSlide = gsap.timeline({
		onComplete: () => {
			currentHeroSlideIndex = nextSlide;
		}
	});
	
	if (currentSlide < nextSlide) {
		tlSlide
			.addLabel('slide')
			.fromTo([heroSlidesArray[currentSlide].elImage, heroSlidesArray[nextSlide].elImage], {
				xPercent: gsap.utils.wrap([-100, 0]),
			}, {
				xPercent: gsap.utils.wrap([-200, -100]),
				duration: .8,
				ease: "power4.inOut"
			})
			.add(createTitlesAnim(currentSlide, 'leave'), 'slide')
			.add(createAllContentsAnim(currentSlide, 'leave'), 'slide')
			.set(heroSlidesArray[nextSlide].elContentW, {opacity: 1}, '-=.2')
			.addLabel('next_slide', '-=.2')
			.add(createAllContentsAnim(nextSlide), 'next_slide')
			.add(createTitlesAnim(nextSlide), 'next_slide')

	} else {
		tlSlide
			.addLabel('slide')
			.fromTo([heroSlidesArray[currentSlide].elImage, heroSlidesArray[nextSlide].elImage], {
				xPercent: gsap.utils.wrap([-100, -200]),
			}, {
				xPercent: gsap.utils.wrap([0, -100]),
				duration: .8,
				ease: "power4.inOut"
			})
			.add(createTitlesAnim(currentSlide, 'leave'), 'slide')
			.add(createAllContentsAnim(currentSlide, 'leave'), 'slide')
			.set(heroSlidesArray[nextSlide].elContentW, {opacity: 1}, '-=.2')
			.addLabel('next_slide', '-=.2')
			.add(createAllContentsAnim(nextSlide), 'next_slide')
			.add(createTitlesAnim(nextSlide), 'next_slide')
	}

}