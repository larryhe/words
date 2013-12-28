/*global define*/
define([
	'underscore',
	'models/config',
	'backbone'
], function (_, config, Backbone) {
	'use strict';

	var WordModel = Backbone.Model.extend({
		// Default attributes for the word
		// and ensure that each word created has `word` and `phonetic` keys.
		defaults: {
			word: '',
            phonetic: '',
            tag: 'NEW',
			explains: []
		},

        addExplanation: function() {
            var explains = this.get('explains');
        },

        add: function(obj) {
            obj.dict = config.get('active');
            this.save(obj, {url: '/node/add'});
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
