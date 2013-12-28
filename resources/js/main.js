/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
    baseUrl: 'js',
	paths: {
		jquery: 'lib/jquery/jquery',
		underscore: 'lib/underscore/underscore',
		backbone: 'lib/backbone/backbone',
		bootstrap: 'lib/bootstrap/bootstrap',
        spin: 'lib/spin',
		text: 'lib/requirejs-text/text'
	},
	shim: {
		underscore: {
			exports: '_'
		},
        bootstrap: {
            deps: ['jquery']
        },
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	}
});

require([
	'backbone',
	'views/app',
	'routers/router'
], function (Backbone, AppView, Workspace) {
	/*jshint nonew:false*/
	// Initialize routing and start Backbone.history()
	new Workspace();
	Backbone.history.start();

	// Initialize the application view
	new AppView();
});
