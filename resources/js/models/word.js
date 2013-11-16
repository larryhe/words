/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var WordModel = Backbone.Model.extend({
		// Default attributes for the word
		// and ensure that each word created has `word` and `phonetic` keys.
		defaults: {
			word: '',
            phonetic: '',
			meaning: []
		},

		// Toggle the `completed` state of this word item.
		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		}
	});

	return WordModel;
});
