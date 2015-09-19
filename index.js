require( './task.js' ).start
.then(function (){

	outlog({
		title: 'CHATHELLUP',
		label: '\n\x1b[36m',
		output: 'Initializing app...'
	});

	if( env == 'DEV' ) outlog({
		title: 'CHATHELLUP',
		label: '\x1b[36m',
		output: 'running on [DEV] environment.'
	});

})
.then(function(){
	require( './lib/server/database' );
})
.then(function (){
	module.exports = require( './lib' );
})
.catch(function ( err ){

	outlog({
		title: 'CHATHELLUP',
		label: '\n\x1b[36m',

		subTitle: 'SYSTEM',
		subLabel: '\x1b[31m',

		output: err.stack,
	});

	process.exit();

});
