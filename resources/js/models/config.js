/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var config = Backbone.Model.extend({
		// Default attributes for the word
		// and ensure that each word created has `word` and `phonetic` keys.
		defaults: {
			active: '',
            dict: [],
            mode: 'mixed',
            order: 'desc'
		},
        load: function() {
            this.fetch({url: '/node/dicts'});
        },
        parse: function(response) {
            return {active: response[0], dict: response};
        }
	});

	return new config();
});
