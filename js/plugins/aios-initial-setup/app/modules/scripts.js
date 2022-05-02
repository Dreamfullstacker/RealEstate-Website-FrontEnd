( function() {

	var app = {
		
		initNavigation: function() {
			var $nav = jQuery( '#nav' );
			if ( $nav.length > 0 ) $nav.navTabDoubleTap();
		},
		initFeaturedProperties: function() {
			if(jQuery('.featured-properties-slider').length > 0){
				jQuery('.featured-properties-slider').slick({
					infinite: true,
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: false,
					prevArrow: jQuery('.fp-arrow-prev'),
					nextArrow: jQuery('.fp-arrow-next'),
					pauseOnFocus: false,
					pauseOnHover: false,
					autoplay: true,
					autoplaySpeed: 4000,
					responsive: [
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 1
							}
						}
					]
				});
			}

			/* Mobile Double Tap */
			jQuery(document).on('click', '.mobile .fp-box a', function(e) {
				e.preventDefault();
				if(jQuery(this).hasClass('clicked_once')) {
					var item_link = jQuery(this).attr('href');
					window.location.href = item_link;
				}
				
				jQuery(this).addClass('clicked_once');
			});
		},
		initFeaturedCommunities: function() {
			/* Put featured communities code here */
		},
		initTestimonials: function() {
			if(jQuery('.testimonials-slider').length > 0){
				jQuery('.testimonials-slider').slick({
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 1,					
					fade: true,
					dots: false,
					prevArrow: jQuery('.testi-arrow-prev'),
					nextArrow: jQuery('.testi-arrow-next'),
					pauseOnFocus: false,
					pauseOnHover: false,
					autoplay: true,
					autoplaySpeed: 4000,
					responsive: [
				    {
				      breakpoint: 992,
				      settings: {
				        adaptiveHeight : true
				      }
				    },
				],
				});
			}
			if (jQuery('.moreless-button').text() == "Read More") {
				jQuery(this).html('<span>Read Less</span>');
				jQuery('.testi-content').css('height', 'auto');
				jQuery('.testi-content').css('overflow', 'visible');
			} else {
				jQuery(this).html('<span>Read More</span>');
				jQuery('.testi-content').css('height', '150px');
				jQuery('.testi-content').css('overflow', 'hidden');
			}

			jQuery('.moreless-button').toggle(function(){
				jQuery(this).html('<span>Read Less</span>');	
				jQuery(this).parent().find('.testi-content').css('height', 'auto');
				jQuery(this).parent().find('.testi-content').css('overflow', 'visible');
			},function(){
				jQuery(this).html('<span>Read More</span>');
				jQuery(this).parent().find('.testi-content').css('height', '150px');
				jQuery(this).parent().find('.testi-content').css('overflow', 'hidden');
			});


			jQuery('.testi-slide').each(function(){

				var testiCont = jQuery(this).find(".testi-content p").text();
							   
				var testi = testiCont.split(" ");

				var testiNumber = testi.length;
				
				if (testiNumber < 110){
					jQuery(this).find('.testi-content').css('height', 'auto');
					jQuery(this).find('.testi-content').css('overflow', 'visible');
					jQuery(this).find('.moreless-button').css('display', 'none');
				}

			});
		},
		initQuickSearch: function() {
			/* Put quick search code here */
		},
		initMeetTheTeam: function() {
			if(jQuery('.team-slider').length > 0){
				jQuery('.team-slider').slick({
					infinite: true,
					slidesToShow: 4,
					slidesToScroll: 1,					
					dots: false,
					prevArrow: jQuery('.team-arrow-prev'),
					nextArrow: jQuery('.team-arrow-next'),
					pauseOnFocus: false,
					pauseOnHover: false,
					autoplay: true,
					autoplaySpeed: 4000,
					responsive: [
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 2
							}
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 1
							}
						}
					]
				});
			}
		},
		sideNavigation: function() {
			jQuery('#sections-navigation').sideNavigation();
		},
		initHeaderScroll: function(){
			if(jQuery(document).scrollTop() > 100){
				jQuery(".site-header").addClass("change-header");
			}
			else{
				jQuery(".site-header").removeClass("change-header");
			}
		},
		slideDrawer: function(){
			jQuery('.b-menu-trigger').click(function(e){
				e.stopPropagation();
				e.preventDefault();
				if(jQuery('body').hasClass('open-slideout')){
					jQuery('body').addClass('closed-slideout');
					jQuery('body').removeClass('open-slideout');
				}else{
					jQuery('body').addClass('open-slideout');
					jQuery('body').removeClass('closed-slideout');
				}
			});
			jQuery(document).on('click', '.slide-menu-close', function(e){
				e.preventDefault();
					jQuery('body').addClass('closed-slideout');
					jQuery('body').removeClass('open-slideout');
			});
		},
		videoSlick: function(){
			if(jQuery('.videos-slider').length > 0){
				jQuery('.videos-slider').slick({
					infinite: true,
					slidesToShow: 3,
					slidesToScroll: 1,
					dots: false,
					prevArrow: jQuery('.video-arrow-prev'),
					nextArrow: jQuery('.video-arrow-next'),
					pauseOnFocus: false,
					pauseOnHover: false,
					autoplay: true,
					autoplaySpeed: 4000,
					responsive: [
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 2
							}
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 1
							}
						}
					]
				});
			}
		},
		logoSlide: function(){
			if(jQuery('.as-seen-in-logo-slider').length > 0){
				jQuery('.as-seen-in-logo-slider').slick({
					infinite: true,
					slidesToShow: 5,
					slidesToScroll: 1,
					dots: false,
					prevArrow: jQuery('.logo-arrow-prev'),
					nextArrow: jQuery('.logo-arrow-next'),
					pauseOnFocus: false,
					pauseOnHover: false,
					autoplay: true,
					autoplaySpeed: 4000,
					responsive: [
						{
							breakpoint: 992,
							settings: {
								slidesToShow: 3
							}
						},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2
							}
						},
						{
							breakpoint: 480,
							settings: {
								slidesToShow: 1
							}
						}
					]
				});
			}
		},
		mobileDoubleTap: function(){
			if(jQuery(window).width() < 1200){
				var tap_ctr = 0;
				var loc = '';
				jQuery('.fp-box a').click(function(e){
					e.preventDefault();
					var this_loc = jQuery(this).attr('href');
					tap_ctr++;
					if(tap_ctr > 1){
						if(loc == this_loc){
							window.location.href = jQuery(this).attr('href');
						}else{
							tap_ctr = 0;
						}
					}
					loc = this_loc;
				});
			}
		},
		socialMedia:function(){
			var fb_html ='';
			var ig_html ='';
			jQuery('.facebook-data div').each(function(){
			    url = jQuery(this).data('url');
			    image = jQuery(this).data('image');
			    fb_html += '<div class="feed-col col-xs-6">'+
							'<a href="'+url+'" target="_blank">'+
								'<div class="feed-col-content-wrapper">'+
									'<img src="'+image+'" class="absolute-image" alt="facebook">'+
								'</div>'+
							'</a>'+
						'</div>';
			});
			jQuery('.instagram-data div').each(function(){
			    url = jQuery(this).data('url');
			    image = jQuery(this).data('image');
			    ig_html += '<div class="feed-col col-xs-6">'+
							'<a href="'+url+'" target="_blank">'+
								'<div class="feed-col-content-wrapper">'+
									'<img src="'+image+'" class="absolute-image" alt="facebook">'+
								'</div>'+
							'</a>'+
						'</div>';
			});
			jQuery('.social-feed.instagram-feed').append(ig_html);
			jQuery('.social-feed.facebook-feed').prepend(fb_html);
		}
		
	}

	
	jQuery(document).ready( function() {
		AOS.init();
		/* Initialize navigation */
		app.initNavigation();
		
		/* Initialize featured properties */
		app.initFeaturedProperties();

		/* Initialize featured communities */
		app.initFeaturedCommunities();
		
		/* Initialize testimonials */
		app.initTestimonials();
		
		/* Initialize quick search */
		app.initQuickSearch();

		app.sideNavigation();

		app.slideDrawer();
		app.videoSlick();
		app.initMeetTheTeam();
		app.logoSlide();
		app.mobileDoubleTap();
		app.socialMedia();
	});
	
	jQuery(window).on('load', function(){


	});

	jQuery(document).on("scroll", function(){
		app.initHeaderScroll();
	});


})();