/*global define*/
define([
	'jquery',
	'backbone',
	'collections/words',
	'common'
], function ($, Backbone, Words, Common) {
	'use strict';

	var Workspace = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},

		setFilter: function (param) {
			// Set the current filter to be used
			Common.WordFilter = param.trim() || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of the Word view items
			Words.trigger('filter');
		}
	});

	return Workspace;
});
