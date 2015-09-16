var express = require( 'express' );
var app = require( './index' );

var bodyParser = require( 'body-parser' );

var cookie = require( 'cookie' );
var cookieParser = require( 'cookie-parser' );

var session = module.exports = require( 'express-session' );
var sessionStore = new session.MemoryStore();

app.use( bodyParser.json() );

app.use( bodyParser.urlencoded({
	extended: true,
}) );

var COOKIE_SECRET = 'secret';
var COOKIE_NAME = 'sid';

var config = session({
	name: COOKIE_NAME,
    store: sessionStore,
    secret: COOKIE_SECRET,
    saveUninitialized: true,
    resave: true,

    cookie: {
        path: '/',
		expires: new Date( Date.now() + 60 * 100000 ),
        httpOnly: true,
        secure: false,
        maxAge: 60 * 10000,
    },
});

app.use( cookieParser( COOKIE_SECRET ) );

app.use( config );

module.exports = config;
