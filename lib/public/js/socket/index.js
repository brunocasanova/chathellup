$( document ).ready(function() {

	var socket = io.connect();

	var $title = $( 'title');

	var $nicknameForm = $( '#nickname-form' );
	var $nickname = $( 'input#nickname' );
	var $nicknameError = $( '.nickname-error' );

	var $display = $( '.display');
	var $list = $( '.list');

	var $chatForm = $( '#chat-form' );
	var $chatText = $( '#chat .text' );
	var $message = $( 'input#message' );
	
	$nicknameError.hide();
	$display.hide();
	$list.hide();
	$chatForm.hide();
	$chatText.hide();

	$nicknameForm.submit(function ( e ){
		e.preventDefault();

		socket.emit( 'nickname', $nickname.val(), function ( data ){

			if( ! data ){
				$nicknameError.show();
			}

			else{
				$nicknameError.hide();
				$nicknameForm.hide();
				$display.show();
				$display.html( '<strong>Nickname: </strong>' + data );
				$list.show();
				$chatForm.show();
				$chatText.show();
				
				$chatText.html( '<em style="color: #999;">Online: You can chat now...</em><hr>' );

				$title.append( ' | ' + data );
			}

			$nickname.val( '' );

		});

	});

	$chatForm.submit(function ( e ){
		e.preventDefault();

		socket.emit( 'messages', $message.val() );
		$message.val( '' );
	});

	socket.on( 'connections', function ( connections ){
		var html = "";	

		html += '<ul>';

		for( var i in connections ){
			html += '<li>' + connections[i] + '</li>';
		}

		html += '</ul>';

		var empty = ! connections.length;

		$list.html( ! empty && '<hr><strong>Connected users:</strong><br>' + '<span>' + html + '</span>' );

	});

	socket.on( 'messages', function ( data ){

		if( data.length ){
			data += '<br>';

			$chatText.animate({
				scrollTop: $( document ).height()
			});

			$chatText.append( data );
		}

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
	
	*/

});
