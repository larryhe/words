/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/words',
	'views/word',
	'views/search',
	'text!templates/review.tmpl',
	'util',
    'bootstrap'
], function ($, _, Backbone, Words, WordView, SearchView, reviewTmpl, Util) {
	'use strict';

	var AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#wordapp',

		// Compile our stats template
		reviewTempl: _.template(reviewTmpl),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'click li #review-words':    'showReview',
			'click li #add':	        'showAdd',
			'click li #edit':	    'showEdit',
			'click li #setting':	    'showSetting',
			'click li #tnew':	    'tagnew',
			'click li #tmaster':	    'tagmaster',
			'click #review-words .left':	'prevWord',
			'click #review-words .right':	'nextWord'
		},

		// At initialization we bind to the relevant events on the `Words`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting Words that might be saved in *localStorage*.
		initialize: function () {
            this.$word = this.$('#review-words');
            this.$neww = this.$('#new-word');
            this.$editw = this.$('#edit-word');
            this.$setting = this.$('#setting');
			this.listenTo(Words, 'change:completed', this.filterOne);
			this.listenTo(Words, 'filter', this.filterAll);
			this.listenTo(Words, 'all', this.render);
			Words.fetch({url: '/dict/advanced-words.txt', dataType: 'text'});
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			if (Words.length) {
                var wordEntry = Words.current().attributes;
                wordEntry.idx = Words.idx + 1;
                wordEntry.total = Words.length;
                this.$word.html(this.reviewTempl(wordEntry));
			} else {
			}
			return this;
		},

		showAdd: function () {
            var searchBox = new SearchView({model: Words});
			this.$neww.html(searchBox.render().el);
			this.$('section.active').removeClass('active');
            this.$neww.addClass('active');
		},

        showReview: function() {
            console.log('show review');
        },

        showEdit: function() {
            console.log('showedit');
        },

        showSetting: function() {
            console.log('showsetting');
        },

        tagnew: function() {
            console.log('tagnew');
        },

        tagmaster: function() {
            console.log('tagmaster');
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
