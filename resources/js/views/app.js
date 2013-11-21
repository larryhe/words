/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/words',
	'views/words',
	'text!templates/words.html',
	'util'
], function ($, _, Backbone, Words, WordView, wordsTemplate, Util) {
	'use strict';

	var AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#wordapp',

		// Compile our stats template
		template: _.template(wordsTemplate),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'click #review-words .left':	'prevWord',
			'click #review-words .right':	'nextWord'
		},

		// At initialization we bind to the relevant events on the `Words`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting Words that might be saved in *localStorage*.
		initialize: function () {
			this.$main = this.$('#main');
            this.$word = $('#review-words .word-sec', this.$main);
			this.listenTo(Words, 'add', this.addOne);
			this.listenTo(Words, 'reset', this.addAll);
			this.listenTo(Words, 'change:completed', this.filterOne);
			this.listenTo(Words, 'filter', this.filterAll);
			this.listenTo(Words, 'all', this.render);

			Words.fetch({url: '/dict/advanced-words.txt', dataType: 'text'});
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			if (Words.length) {
				this.$main.show();
                this.$word.html(this.template(Words.current().attributes));
			} else {
				this.$main.hide();
			}
			return this;
		},

		// Add a single word item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (word) {
			var view = new WordView({ model: word });
			$('#word-list').append(view.render().el);
		},

		// Add all items in the **Words** collection at once.
		addAll: function () {
			this.$('#word-list').html('');
			Words.each(this.addOne, this);
		},

		filterOne: function (word) {
			word.trigger('visible');
		},

		filterAll: function () {
			Words.each(this.filterOne, this);
		},

		prevWord: function () {
            Words.prev();
            this.render();
		},

		nextWord: function () {
            Words.next();
            this.render();
		}
	});

	return AppView;
});
