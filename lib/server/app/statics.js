var express = require( 'express' );
var app = require( './index' );

var favicon = require( 'serve-favicon' );

var EJS = require( 'ejs' );
var expressLayouts = require( 'express-ejs-layouts' );

var viewsPath = __dirname.replace( 'server/app', 'views/' );
var publicPath = __dirname.replace( 'server/app', 'public/' );
var bootstrapPath = __dirname.replace( 'lib/server/app', 'node_modules/bootstrap/' );

app.use( favicon( publicPath + 'icon/Iconsmind-Outline-Tree-22.ico' ) );

app.engine( '.html', EJS.__express );

app.set( 'view engine', 'ejs' );
app.set( 'views', viewsPath );

app.set( 'layout', viewsPath + 'layouts/index.html' );
app.use( expressLayouts );

app.use( '/public', express.static( publicPath ) );
app.use( '/bootstrap', express.static( bootstrapPath ) );
