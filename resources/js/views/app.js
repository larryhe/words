/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/words',
	'views/words',
	'text!templates/stats.html',
	'common'
], function ($, _, Backbone, Words, WordView, statsTemplate, Common) {
	'use strict';

	var AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#wordapp',

		// Compile our stats template
		template: _.template(statsTemplate),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'keypress #new-word':		'createOnEnter',
			'click #clear-completed':	'clearCompleted',
			'click #toggle-all':		'toggleAllComplete'
		},

		// At initialization we bind to the relevant events on the `Words`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting Words that might be saved in *localStorage*.
		initialize: function () {
			//this.allCheckbox = this.$('#toggle-all')[0];
			this.$input = this.$('#new-word');
			this.$footer = this.$('#footer');
			this.$main = this.$('#main');

			this.listenTo(Words, 'add', this.addOne);
			this.listenTo(Words, 'reset', this.addAll);
			this.listenTo(Words, 'change:completed', this.filterOne);
			this.listenTo(Words, 'filter', this.filterAll);
			this.listenTo(Words, 'all', this.render);

			Words.fetch();
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			var completed = Words.completed().length;
			var remaining = Words.remaining().length;

			if (Words.length) {
				this.$main.show();
				this.$footer.show();

				this.$footer.html(this.template({
					completed: completed,
					remaining: remaining
				}));

				this.$('#filters li a')
					.removeClass('selected')
					.filter('[href="#/' + (Common.WordFilter || '') + '"]')
					.addClass('selected');
			} else {
				this.$main.hide();
				this.$footer.hide();
			}

			//this.allCheckbox.checked = !remaining;
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

		// Generate the attributes for a new Word item.
		newAttributes: function () {
			return {
				title: this.$input.val().trim(),
				order: Words.nextOrder(),
				completed: false
			};
		},

		// If you hit return in the main input field, create new **Word** model,
		// persisting it to *localStorage*.
		createOnEnter: function (e) {
			if (e.which !== Common.ENTER_KEY || !this.$input.val().trim()) {
				return;
			}

			Words.create(this.newAttributes());
			this.$input.val('');
		},

		// Clear all completed word items, destroying their models.
		clearCompleted: function () {
			_.invoke(Words.completed(), 'destroy');
			return false;
		},

		toggleAllComplete: function () {
			//var completed = this.allCheckbox.checked;
			Words.each(function (word) {
				word.save({
					'completed': completed
				});
			});
		}
	});

	return AppView;
});
