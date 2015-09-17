var sys = require( 'sys' );
var childProcess = require( 'child_process' );
var config = require( './config' );
var Promise = require( 'bluebird' );

module.exports = Promise.cast([
	[ 'LALALAKAKA', 'erro pa!!', '' ],
	[ 'MONGODB' ,'echo ' + config.entry + ' | sudo -S mongod > /dev/null &', '\x1b[34m' ],
	[ 'INSPECTOR' ,'node-inspector --web-port=8090 &', '\x1b[33m' ],
])
.map(function ( cmds ){
	return childProcess.exec( cmds[1], function ( error, stdout, stderr ){
		if( stdout ) console.log( '\x1b[31m[' + cmds[0] + '][STDOUT]:\x1b[0m output:\n' + stdout );

		if( stderr ) console.log( '\x1b[31m[' + cmds[0] + '][STDERR]:\x1b[0m', stderr );

		if( error ) process.exit( '[' + cmds[0] + ']' + error );

		console.log( cmds[2] + '[' + cmds[0] + ']:\x1b[0m initializing...' );
	});

})
.then(function (){
	console.log( '\n\x1b[36m[CHATHELLUP]:\x1b[0m Initializing app...', '' );
})
.then(function(){
	require( './lib/server/database' );
	module.exports = require( './lib' );
})
.catch(function ( err ){
	console.error( '\n\x1b[31m[SYSTEM]:\x1b[0m', err.stack );
});

process.on( 'exit', exitHandler.bind( null, { cleanup: true }) );
process.on( 'SIGINT', exitHandler.bind( null, { exit: true }) );
process.on( 'uncaughtException', exitHandler.bind( null, { exit: true }) );

function exitHandler( options, err ){
	var exitTmpl = '\n\x1b[36m[CHATHELLUP]\x1b[0m\x1b[31m[EXIT]:\x1b[0m';

	if( err ) console.log( exitTmpl, err );

	if( options.exit ) process.exit();

	if( options.cleanup ){
		childProcess.exec([
			'mongo --eval "db.getSiblingDB(\'admin\').shutdownServer()" > /dev/null;',
			'killall node;'
		].join( ' ' ), function ( error, stdout, stderr ){
			if( stdout ) console.log( '\x1b[31m[SYSTEM][STDOUT]:\x1b[0m output:\n' + stdout );

			if( stderr ) console.log( '\x1b[31m[SYSTEM][STDERR]:\x1b[0m', stderr );

			if( error ) process.exit( '[SYSTEM]' + error );
		});

		console.log( exitTmpl, 'Exited!\n' );
	}

}
