$( document ).ready(function() {
	
	var socket = io.connect( 'http://localhost:3000/general' );
	var $doc = $( document );

	var $title = $( 'title' );
	var $nicknameForm = $( '#login-form' );
	var $nickname = $( '#nickname' );
	var $password = $( '#password' );
	var $remember = $( '#remember' );

	var $display = $( '#nickname-display');
	var $list = $( '#nickname-list');

	var $chatForm = $( '#chat-form' );
	var $chatText = $( '#chat .text' );
	var $message = $( '#inputMessage' );

	var $typing = $( '#submit-typing' );
	$typing.html( ' ' );

	socket.emit( 'connect', true );
	
	$chatForm.submit(function ( e ){
		e.preventDefault();

		socket.emit( 'message', {
			message: $message.val(),
		});

		$message.val( '' );
	});

	$chatForm.keypress(function ( event ){
		socket.emit( 'typing', 'typing' );
	});

	socket.on( 'presences', function ( data ){
		var html = [],
			alone = ! data.nicknames.length;

		html.push( '<hr>' );
		html.push( '<strong>' );

		if( ! alone ){
			html.push( data.nicknames.length );
			html.push( ' connected:' );
		}

		else{
			html.push( 'Empty room' );
		}

		html.push( '</strong>' );

		if( ! alone ){

			html.push( '<br>' );

			html.push( '<ul>' );

			for( var i in data.nicknames ){
				html.push( '<li style="color:' );
				html.push( data[ data.nicknames[ i ] ].color );
				html.push( ';">' );
				html.push( data[ data.nicknames[ i ] ].nickname );
				html.push( '</li>' );
			}

			html.push( '</ul>' );

		}

		$list.html( html.join( '' ) );
	});

	socket.on( 'messages', function ( data ){
		if( ! Object.keys( data ).length ) throw new Error( 'No data from server socket provided!' );

		var html = [
			'<div class row>',
				'<div class="twelve columns">',
					'<span style="color: ', data.color || 'gray', ';">',
						data.nickname,
					':</span>', ' ',
					'<span>', data.message, '</span>', ' ',
					'<small style="color:#999; font-size:12px; text-align: right;">',
						'at', ' ', data.created_at,
					'</small>',
				'</div>',
			'</div>',
		];

		$chatText.animate({ scrollTop: $doc.height() });
		$chatText.append( html.join( '' ) );
	});

	socket.on( 'typing', function ( data ){
		if( ! Object.keys( data ).length ) throw new Error( 'No data from server socket provided!' );

		var html = [
			' <small style="color:#999;">',
				data.nickname,
				' is typing...',
			'</small>',
		];

		$typing.html( html.join( '' ) );

		$typing.delay( 1100 ).queue(function ( clear ) {
			$( this ).html( ' ' );
			clear();
		});
	});

	socket.on( 'disconnect', function ( data ){
		if( ! Object.keys( data ).length ) throw new Error( 'No data from server socket provided!' );

		var html = [
			'<span style="color: ', data.color, ';">',
				data.nickname, ' ',
				'disconnected',
			'</span>',
			' <small style="color:#999; font-size:12px;">',
				'at ', data.created_at,
			'</small>',
			'<br>',
		];

		$chatText.append( html.join( '' ) );

	});

	function hideChat(){
		$display.hide();
		$list.hide();
		$chatForm.hide();
		$chatText.hide();
	}

	function showChat( data ){
		$nicknameForm.hide();
		$display.show();
		$display.html( '<strong>Nickname: </strong><span class="nickname" style="color:' + data.color + ';">' + data.nickname );
		$list.show();
		$chatForm.show();
		$chatText.show();
		
		$chatText.html( 'ROOM: Chatup! <em style="color:#999; font-size:12px;">Logged at: ' + data.created_at + '</em><hr>' );

		$title.html( 'CHUp | ' + data.nickname );
	}

});

/*
	$nicknameForm.submit(function ( e ){
		e.preventDefault();

		var post = {
			nickname: $nickname.val(),
			password: $password.val(),
			remember: $remember.is( ':checked' ),
		};

		// Set this with cookies ...and with some milk too :D

		if( ! post.nickname || ! post.password ){
			$nickname.val( '' );
			$password.val( '' );
			return;
		}

		$.post( "http://localhost:3000/login", {

				nickname: data.nickname,
				password: data.password,

			}, function ( data ){        
				
			if( ! data ){
				$nickname.val( '' );
				$password.val( '' );
			}

			else{
				showChat( data );
			}

		});

	});
	*/