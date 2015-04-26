$( document ).ready(function() {

	var socket = io.connect( 'http://localhost:8080' );

	socket.on( 'connect', function (){
		
		$( '.list' ).html( 'Loading...' );

		var defaultName = 'Anonymous' + Math.floor( Math.random() * 10000 );

		socket.emit( 'connected', defaultName );

	});

	socket.on( 'connecteds', function ( connection ){
		var content = false;

		if( ! connection.alone ){
			for( var conn in connection.others ){
				content += conn.name + '<br>';
			}
		}

		$( '.list' ).html( content || 'The room is empty' );

	});

	/*
	socket.on( 'connect', function ( ){
		
		var defaultNickname = 'Anonymous' + Math.floor( Math.random() * 10000 )

		$( '.profile' ).html( '<button>Nickname change</button><br>Nickname: ' + defaultNickname + '<hr>' );

		socket.emit( 'join', defaultNickname );

		$( '.profile' ).click(function (){
		
			var nickname = prompt( 'What\'s your nickname' );

			if( nickname ) $( '.profile' ).html( 'Nickname: ' + nickname );

			socket.emit( 'join', nickname );
		});

	});

	socket.on( 'users', function ( users ){

		var result = list( users ),
			count = users.connectedCount,
			header = '<small>' + count > 0 && ( count - 1 ) || 0 + ' users - connected</small><br>';

		$( '.list' ).html( header + result || 'The room is empty' );

	});

	socket.on( 'user', function ( users ){

		var result = list( users ),
			count = users.connectedCount,
			header = '<small>' + count > 0 && ( count - 1 ) || 0 + ' users - connected</small><br>';

		$( '.list' ).html( header + result || 'The room is empty' );

	});

	function list( users ){
		var ii = 0;

		var connected = "",
			header = "";

		for( var i in users ){
			if( users[i] && typeof users[i] == 'object' && users[i].others.length ){
				ii += 1;
				ii = ii >= 0 && ii || 0;

				if( users[i].others[ ii ].name ){
					connected += '<br>' + users[i].others[ ii ].name;
				}

			}
		}

		return connected || 'The room is empty';
	}

	socket.on( 'messages', function ( data ){

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
	
	*/

});
