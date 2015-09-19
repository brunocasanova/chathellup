var task = require( './task' );

function outlog( o ){
	this.options = o;

	if( ! this.options ) this.options = {};

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

outlog.prototype.check = function (){
	this.startlabel = this.options.label || this.options.label == 'default' && '\x1b[31m' || '';
	this.endLabel = this.startlabel && '\x1b[0m' || '';

	this.title =
		this.options.subtitle && this.options.title && '[' + this.options.title.toUpperCase() + ']' ||
		! this.options.subtitle && ! this.options.title && '[CONSOLE]:' ||
		! this.options.subtitle && this.options.title && '[' + this.options.title.toUpperCase() + ']:' ||
		this.options.subtitle && ! this.options.title && '[CONSOLE]';

	this.sublabel = this.options.sublabel || this.options.sublabel == 'default' && '\x1b[31m' || '';
	this.subtitle = this.options.subtitle && this.sublabel + '[' + this.options.subtitle.toUpperCase() + ']:\x1b[0m'|| '';
	
	this.output = this.options.output || 'No output given...';
	this.exit = !! this.options.exit;
};

outlog.prototype.exitOut = function (){
	task.exitHandler.call( null, { exit: this.options.exit }, this.options );
};

outlog.prototype.log = function (){
	console.log( this.msg.join( '' ) );
};

module.exports = function ( o ){ new outlog( o ) };