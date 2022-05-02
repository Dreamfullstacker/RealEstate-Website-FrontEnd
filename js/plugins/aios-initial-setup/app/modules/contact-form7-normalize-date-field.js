jQuery(document).ready( function() {
	
	/* 
	* WPCF7 4.9 uses wpcf7 instead of _wpcf7 so both have to be checked.
	* 
	* I didn't use is_plugin_active() because it fails when the plugin folder is renamed.
	* Checking for the wpcf7 variable is reliable in more cases.
	* Please support new variables whenever WPCF7 is updated.
	*
	* Don't remove the check since doing so may produce broken date fields;
	* you'd rather skip this enhancement than end up with broken forms.
	*/
	var asisWpcf7 = {};
	if ( typeof _wpcf7 == "object" ) {
		asisWpcf7 = _wpcf7;
	}
	else if ( typeof wpcf7 == "object" ) {
		asisWpcf7 = wpcf7;
	}
	
	if ( !asisWpcf7.jqueryUi ) {
		return;
	}
		
	/*Loop thru date fields */
	jQuery("input.wpcf7-date[type='date']").each( function(i,v) {
		
		/* Destroy jQuery datepicker instance so we can re-initialize it */
		if( jQuery(v).hasClass("hasDatepicker") ) {
			jQuery(v).datepicker("destroy");
		}
	
		/* 
		 * Convert date field to text field:
		 * 	- to normalize behavior and appearance.
		 * 	- to support the placeholder attribute
		 */
		jQuery(v).attr("type","text");
		
		/*
		 * Update placeholder
		 */ 
		if ( typeof jQuery(v).attr("placeholder") == "undefined" ) {
			jQuery(v).attr("placeholder","yy-mm-dd");
		}
		else {
			jQuery(v).attr("placeholder", jQuery(v).attr("placeholder"));
		}
		
		/* Disable normal behavior */
		jQuery(v).on("keydown keyup",function(e) {
			e.preventDefault();
		});
	
		/* Initialize datepicker */
		jQuery(v).datepicker( {
			dateFormat: 'yy-mm-dd',
			minDate: new Date( jQuery(v).attr("min") ),
			maxDate: new Date( jQuery(v).attr("max") )
		} );
		
		
		/* Since we now use a text field, remove invalid attributes */
		jQuery(v).removeAttr("min max");
		
	});
	
});