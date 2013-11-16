/*global define*/
define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/word'
], function (_, Backbone, Store, Word) {
	'use strict';

	var WordsCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: Word,

		// Save all of the Word items under the `"Word"` namespace.
		localStorage: new Store('words-backbone'),

		// Filter down the list of all word items that are finished.
		completed: function () {
			return this.filter(function (word) {
				return word.get('completed');
			});
		},

		// Filter down the list to only word items that are still not finished.
		remaining: function () {
			return this.without.apply(this, this.completed());
		},

		// We keep the word in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function () {
			if (!this.length) {
				return 1;
			}
			return this.last().get('order') + 1;
		},

		// word are sorted by their original insertion order.
		comparator: function (word) {
			return word.get('order');
		}
	});

	return new WordsCollection();
});
