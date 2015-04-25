console.log( '[Statics] initialized!' );

var express = require( 'express' );
var app = require( './app' );

var favicon = require( 'serve-favicon' );

var EJS = require( 'ejs' );
var expressLayouts = require( 'express-ejs-layouts' );

var publicPath = __dirname.replace( 'server', 'public/' );
var viewsPath = __dirname.replace( 'server', 'views/' );

app.use( favicon( publicPath + 'icon/Iconsmind-Outline-Tree-22.ico' ) );

app.engine( '.html', EJS.__express );

app.set( 'view engine', 'ejs' );
app.set( 'views', viewsPath );

app.set( 'layout', viewsPath + 'layouts/index.html' );
app.use( expressLayouts );

app.use( '/public', express.static( publicPath ) );
