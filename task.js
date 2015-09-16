var sys = require( 'sys' );
var childProcess = require( 'child_process' );
var config = require( './config' );
var Promise = require( 'bluebird' );

module.exports = Promise.cast([
	[ 'MONGODB' ,'echo ' + config.pass + ' | sudo -S mongod > /dev/null &', '\x1b[34m' ],
	[ 'INSPECTOR' ,'node-inspector --web-port=8090 &', '\x1b[33m' ],
])
.map(function ( cmds ){
	console.log( cmds[2] + '[' + cmds[0] + ']:\x1b[0m initializing...' );

	return childProcess.exec( cmds[1] );
})
.then(function(){
	console.log( '\n\x1b[36m[CHATHELLUP]:\x1b[0m Initializing app...', '' );
	require( './lib/server/database' );
	module.exports = require( './lib' );
});

process.on( 'exit', exitHandler.bind( null, { cleanup: true }) );
process.on( 'SIGINT', exitHandler.bind( null, { exit: true }) );
process.on( 'uncaughtException', exitHandler.bind( null, { exit: true }) );

function exitHandler( options, err ){
	var exitTmpl = '\n\x1b[36m[CHATHELLUP]\x1b[0m\x1b[31m[EXIT]:\x1b[0m';

	if( err ) {
		console.log( exitTmpl, 'ERROR:', err.stack );
	}

	if( options.exit ) process.exit();

	if( options.cleanup ){
		childProcess.exec([
			'mongo --eval "db.getSiblingDB(\'admin\').shutdownServer()" > /dev/null;',
			'killall node;'
		].join( ' ' ));

		console.log( exitTmpl, 'successfull!\n' );
	}

}
