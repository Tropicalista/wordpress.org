( function( $ ) {
	var questions = $( 'dt', '#faq' );

	questions
		.each( function( index, question ) {
			var $question = $( question ),
				$button   = $( '<a href="#" />' ),
				id        = $question.attr( 'id' );

			// If there is no ID, create our own.
			if ( ! id ) {
				id = '#' + encodeURIComponent( $question.text().toLowerCase() );
				$question.attr( 'id', id );
			}

			$button.attr( 'href', id ).on( 'click', function( event ) {
				event.preventDefault();
			} );

			$question.html( $button.text( $question.text() ) );
		} )
		.on( 'click', function( event ) {
			var $question = $( event.currentTarget );

			if ( 'keydown' === event.type && 13 !== event.which ) {
				return;
			}

			if ( ! $question.is( '.open' ) ) {
				$question.siblings( '.open' ).toggleClass( 'open' ).attr( 'aria-expanded', false ).next( 'dd' ).slideToggle( 200 );
			}

			$question.toggleClass( 'open' ).attr( 'aria-expanded', function( index, attribute ) {
				return 'true' !== attribute;
			} ).next( 'dd' ).slideToggle( 200 );

			if ( window.location.hash ) {
				window.scrollTo( 0, $question.offset().top );
			}
		} );

	if ( window.location.hash ) {
		questions.find( '[href="' + window.location.hash + '"]' ).trigger( 'click' );
	}
} )( jQuery );
