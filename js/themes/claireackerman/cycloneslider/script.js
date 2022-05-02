( function() {
	
	
	jQuery.fn.aiosCycloneSliderFixedSlideshow = function() {
		
		return jQuery(this).each( function(i,v) {
			new AIOSCycloneSliderFixedSlideshow( jQuery(v) );
		});
		
	}
	
	var AIOSCycloneSliderFixedSlideshow = function(elem) {
		
		var that = this;
		that.target = elem;
		
		that.replaceImagesWithCanvas();
		that.fixSize();
		that.hideUnnecessaryAdminOptions();
		
	}
	
	AIOSCycloneSliderFixedSlideshow.prototype.replaceImagesWithCanvas = function() {
		
		var that = this;
		
		// that.target.find("img").each( function(i,v) {
		// 	var img = jQuery(v);
		// 	img.addClass("hidden");
		// 	img.after("<div class='cycloneslider-fixed-slide-image' style='background-image:url("+img.attr("src")+")'></div>");
		// });
		
	}
	
	AIOSCycloneSliderFixedSlideshow.prototype.fixSize = function() {
		
		var that = this;

		jQuery(window)
			.on("resize", function() {
				var targetHeight = jQuery(window).height() > screen.height ? jQuery(window).height() : screen.height;
				that.target.height(targetHeight);
			})
			.trigger("resize");
		
	}
	
	AIOSCycloneSliderFixedSlideshow.prototype.hideUnnecessaryAdminOptions = function() {
		
		if ( jQuery(".wp-admin.post-type-cycloneslider .cycloneslider-template-fixed").length > 0 ) {
			jQuery(".wp-admin.post-type-cycloneslider #cycloneslider_settings_width_management").parents(".cycloneslider-field").hide();
			jQuery(".wp-admin.post-type-cycloneslider #cycloneslider_settings_resize").parents(".cycloneslider-field").hide();
			jQuery(".wp-admin.post-type-cycloneslider #cycloneslider_settings_width").parents(".cycloneslider-field").hide();
			jQuery(".wp-admin.post-type-cycloneslider #cycloneslider_settings_height").parents(".cycloneslider-field").hide();
		}
		
	}
	
})();