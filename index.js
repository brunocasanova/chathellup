var task = require( './task.js' );

task.start
.then(function (){
	console.log( '\n\x1b[36m[CHATHELLUP]:\x1b[0m Initializing app...', '' );
})
.then(function(){
	require( './lib/server/database' );
})
.then(function (){
	module.exports = require( './lib' );
})
.catch(function ( err ){
	console.error( '\x1b[36m[CHATHELLUP]\x1b[0m\x1b[31m[SYSTEM]:\x1b[0m', err.stack );
	process.exit();
});
