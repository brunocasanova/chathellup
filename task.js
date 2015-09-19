var sys = require( 'sys' );
var childProcess = require( 'child_process' );
var config = require( './config' );
var Promise = require( 'bluebird' );

GLOBAL.outlog = require( './outlog' );
GLOBAL.appName = 'CHATHELLUP';
GLOBAL.env = process.argv[2];

module.exports.start = Promise.cast([
	[ 'echo ' + config.entry + ' | sudo -S mongod > /dev/null &', 'MONGODB', '\x1b[34m' ],
	[ 'node-inspector --web-port=8090 &', 'INSPECTOR', '\x1b[33m', true ],
])
.map(function ( cmds ){

	if( ! cmds || typeof cmds == 'undefined' && cmds.length < 1 ){
		return outlog({
			title: GLOBAL.appName,
			subtitle: 'ERROR',
			label: '\n\x1b[36m',
			sublabel: '\x1b[31m',
			output: 'ERROR! need more arguments to start!',
			exit: true,
		});
	}

	return childProcess.exec( cmds[0], function ( error, stdout, stderr ){
		if( ! cmds[3] ) execErr.call( null, error, stdout, stderr, cmds );
	} );

});

function execErr( error, stdout, stderr, cmds ){
	if( stdout ) outlog({
		title: cmds[1],
		subtitle: 'STDOUT',
		label: cmds[2],
		output: stdout
	});

	if( stderr ) outlog({
		title: GLOBAL.appName,
		subtitle: 'STDERROR',
		label: '\n\x1b[36m',
		sublabel: '\x1b[31m',
		output: stderr,
		exit: ! error,
	});

	if( error ) outlog({
		title: GLOBAL.appName,
		subtitle: 'ERROR',
		label: '\x1b[36m',
		sublabel: '\x1b[31m',
		output: error,
		exit: true,
	});
}

function exitHandler( options, err ){
	if( err ){
		err.exit = err.exit && false;
		outlog( err );
	}

	if( options.exit ) process.exit( 0 );

	if( options.cleanup ){
		childProcess.exec([
			'mongo --eval "db.getSiblingDB(\'admin\').shutdownServer()" > /dev/null;',
			'killall node;',
		].join( ' ' ), execErr() );

		return outlog({
			title: GLOBAL.appName,
			subtitle: 'EXIT',
			label: '\n\x1b[36m',
			sublabel: '\x1b[31m',
			output: 'Exited!\n',
		});
	}
};

process.stdin.resume();
process.stdin.setEncoding( 'utf8' );

process.on( 'exit', exitHandler.bind( null, { cleanup: true }) );
process.on( 'SIGINT', exitHandler.bind( null, { exit: true }) );
process.on( 'SIGTERM', exitHandler.bind( null, { exit: true }) );
process.on( 'uncaughtException', exitHandler.bind( null, { exit: true }) );

module.exports.exitHandler = exitHandler;
