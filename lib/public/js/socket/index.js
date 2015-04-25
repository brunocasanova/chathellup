console.log( 'Socket.io frontend loaded!' );

$( document ).ready(function() {

	var socket = io.connect();

	socket.on( 'connect', function ( data ){

		console.log( 'Socket frontend connect' );

		$( '.menu' ).html( '<button>Nickname change</button>' );

		socket.emit( 'join', 'User' + Math.floor( Math.random() * 10000 ) );

		$( '.menu button' ).click(function (){
		
			var nickname = prompt( 'What\'s your nickname' );

			if( nickname ) $( '.menu' ).html( 'Nickname: ' + nickname );

			socket.emit( 'join', nickname );
		});

	});

	socket.on( 'messages', function ( data ){
		console.log( 'Socket frontend messages' );

		if( data.length ){
			data = data.toString();
			data += '<br>';
			$( '#chat .text' ).append( data );
		}

	});

	$( 'form#chat-form' ).submit(function ( e ){
		e.preventDefault();

		console.log( 'Message submitted to socket' );

		var message = $( 'input#message' );

		socket.emit( 'messages', message.val() );

		message.val( '' );
	});

});
