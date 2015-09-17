var sys = require( 'sys' );
var childProcess = require( 'child_process' );
var config = require( './config' );
var Promise = require( 'bluebird' );

var Log = function Log( o ){
	this.options = o;

	this.check();

	if( this.options.exit ) return this.exitOut();

	this.msg = [
		this.startlabel,
		this.title,
		this.endLabel,
		this.subtitle,
		' ',
		this.output
	];	

	this.log();
};

Log.prototype.check = function (){
	this.startlabel = this.options.label || this.options.label == 'default' && '' || '\x1b[31m';
	this.endLabel = this.startlabel && '\x1b[0m' || '';

	this.title =
		this.options.subtitle && this.options.title && '[' + this.options.title.toUpperCase() + ']' ||
		! this.options.subtitle && ! this.options.title && '[CONSOLE]:' ||
		! this.options.subtitle && this.options.title && '[' + this.options.title.toUpperCase() + ']:' ||
		this.options.subtitle && ! this.options.title && '[CONSOLE]';

	this.sublabel = this.options.sublabel || this.options.sublabel == 'default' && '\x1b[31m' || '';
	this.subtitle = this.options.subtitle && this.sublabel + '[' + this.options.subtitle.toUpperCase() + ']:\x1b[0m'|| '';
	
	this.output = this.options.output || 'No output given.';
	this.exit = !! this.options.exit;
};

Log.prototype.exitOut = function (){
	exitHandler.call( null, { exit: this.options.exit }, this.options );
};

Log.prototype.log = function (){
	console.log( this.msg.join( '' ) );
};

module.exports.start = Promise.cast([
	[ 'echo ' + config.entry + ' | sudo -S mongod > /dev/null &', 'MONGODB', '\x1b[34m' ],
	[ 'node-inspector --web-port=8090 &', 'INSPECTOR', '\x1b[33m' ],
])
.map(function ( cmds ){

	console.log('RUN');

	if( ! cmds || typeof cmds == 'undefined' && cmds.length < 1 ){
		return new Log({
			title: 'CHATHELLUP',
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
	if( stdout ){
		new Log({
			title: cmds[1],
			subtitle: 'STDOUT',
			label: cmds[2],
			output: stdout
		});
	}

	if( stderr ){
		new Log({
			title: 'CHATHELLUP',
			subtitle: 'STDERROR',
			label: '\n\x1b[36m',
			sublabel: '\x1b[31m',
			output: stderr,
			exit: ! error,
		});
	}

	if( error ){
		new Log({
			title: 'CHATHELLUP',
			subtitle: 'ERROR',
			label: '\x1b[36m',
			sublabel: '\x1b[31m',
			output: error,
			exit: true,
		});
	}
}

function exitHandler( options, err ){
	if( err ){
		err.exit = err.exit && false;
		new Log( err );
	}

	if( options.exit ) process.exit( 0 );

	if( options.cleanup ){
		childProcess.exec([
			'mongo --eval "db.getSiblingDB(\'admin\').shutdownServer()" > /dev/null;',
			'killall node;'
		].join( ' ' ), execErr() );

		return new Log({
			title: 'CHATHELLUP',
			subtitle: 'EXIT',
			label: '\n\x1b[36m',
			sublabel: '\x1b[31m',
			output: 'Exited!\n',
		});
	}
};

process.on( 'exit', exitHandler.bind( null, { cleanup: true }) );
process.on( 'SIGINT', exitHandler.bind( null, { exit: true }) );
process.on( 'uncaughtException', exitHandler.bind( null, { exit: true }) );
