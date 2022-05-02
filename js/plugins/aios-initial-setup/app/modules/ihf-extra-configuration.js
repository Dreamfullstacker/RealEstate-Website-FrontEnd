jQuery(document).ready( function() {
	
	/* Make IHF pages use specified map layer */
	if ( jQuery("#ihf-main-container #ihf-map-canvas").length > 0 ) {
		var ihfMapInterval = setInterval( function() {
			if ( jQuery(".leaflet-map-pane").length > 0 ) {
				
				/* Save current scrollTop since IHF scrolls to the top of the map whenever the layer type is changed */
				var currentScroll = jQuery(window).scrollTop();
				
				/* Change the layer type */
				jQuery(".leaflet-control-layers-selector").eq(asis_ihf_extra_configuration_map_layer).trigger("click");
				
				/* Restore original scrollTop before changing layer type */
				jQuery(window).scrollTop(currentScroll);
				
				clearInterval(ihfMapInterval);
			}
		},200);
	}
	
});