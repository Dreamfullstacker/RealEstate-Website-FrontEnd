( function( $ ) {

	var speed = 'fast';
	var slides_selector = '.cycloneslider-template-responsive-img .cycloneslider-slides';

	$( document ).on( 'cycle-before', slides_selector, function( event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag ) {
		
		// crti_center_slider();
		/* Hide captions and readmore */
		$( this ).find( '.cycloneslider-caption-title' ).stop().fadeOut( 0 ).end().find( '.cycloneslider-caption-description' ).stop().fadeOut( 0 ).end().find( '.cycloneslider-caption-more' ).stop().fadeOut( 0 );
	
	} );
	
    $( document ).on( 'cycle-initialized cycle-after', slides_selector, function( event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag ) {
		var index = ( event.type == 'cycle-initialized' ) ? optionHash.currSlide : optionHash.nextSlide;
		var slide = $( optionHash.slides[ index ] );
		
		/* Cascade effect */
		slide.find( '.cycloneslider-caption-title' ).fadeIn( speed, function() { 
			slide.find( '.cycloneslider-caption-description' ).fadeIn( speed, function() {
				slide.find( '.cycloneslider-caption-more' ).fadeIn( speed );
			} );
		} );
	} );
	
} )( jQuery );

