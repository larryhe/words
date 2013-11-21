/*global define*/
define([
	'underscore',
	'backbone',
    'util',
	'models/word'
], function (_, Backbone, Util, Word) {
	'use strict';

	var WordsCollection = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: Word,
        //index of current page default is 0
        idx: 0,
		// Filter down the list to only word items that are still not finished.
		next: function () {
		    this.idx = (this.idx + 1) % this.length;
		},
		prev: function () {
			if (this.idx == 0) {
				this.idx = this.length -1;
			}else{
                this.idx--;
            }
		},
        current: function() {
            return this.at(this.idx);
        },
        parse: function(response) {
            return Util.splitWords(response);
        },
		// word are sorted by their original insertion order.
		comparator: function (word) {
			return word.get('order');
		}
	});

	return new WordsCollection();
});
