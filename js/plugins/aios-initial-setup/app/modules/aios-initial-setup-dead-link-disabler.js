jQuery(document).ready( function() {
	
	jQuery("a[href='#']").each( function(i,v) {
		jQuery(v).addClass("aios-initial-setup-dead-link");
	});
	
	jQuery("a[href='#']").click( function(e) {
		if ( jQuery(e.currentTarget).attr("href") == "#" ) {
			e.preventDefault();
		}
	});
	
});