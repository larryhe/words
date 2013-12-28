/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/words',
	'models/config',
    'views/review',
	'views/word',
	'views/search',
	'views/setting',
	'text!templates/footer.tmpl',
	'util',
    'bootstrap'
], function ($, _, Backbone, Words,config,ReviewView, WordView, SearchView,SettingView, footerTmpl, Util) {
	'use strict';

	var AppView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#wordapp',

		// Compile our stats template
		footerTmpl: _.template(footerTmpl),

		// Delegated events for creating new items, and clearing completed ones.
		events: {
			'click li #add':	        'showAdd',
			'click #new-word .submit':	        'createWord',
			'click li #edit':	    'showEdit',
			'click #edit-word .submit':	        'updateWord',
			'click li #setting':	    'showSetting',
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
            this.$setting = this.$('#settings');
			this.listenTo(config, 'change', this.loadWords);
			this.listenTo(Words, 'sync', this.render);
			this.listenTo(Words, 'newWord', this.newWord);
			config.load();
		},

        loadWords: function() {
            Words.loadWords(config.get('active'));
        },

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			if (Words.length) {
                var review = new ReviewView({model: Words.current()});
                this.$word.empty();
                this.$word.append(review.render().el);
                this.$word.append(this.footerTmpl({idx: Words.idx, total: Words.length}));
			}
			return this;
		},

		showAdd: function () {
            var searchBox = new SearchView({model: Words});
			this.$neww.html(searchBox.render().el);
		},

        showEdit: function() {
            this.wordView = new WordView({model: Words.current()});
            this.$editw.html(this.wordView.render().el);
        },

        showSetting: function() {
            if(!this.settingView){
                this.settingView = new SettingView({model: config});
                this.$setting.html(this.settingView.render().el);
            }
        },

		filterOne: function (word) {
			word.trigger('visible');
		},

		newWord: function (word) {
            this.wordView = new WordView({model: Words.newWord(word)});
            this.$neww.html(this.wordView.render().el);
		},
        createWord: function() {
            var self = this;
            var wordEntry = this.wordView.getValue();
            wordEntry.dict = config.get('active');
            var word = Words.create(wordEntry, {url: '/node/add', dataType: 'text', success: function(res){
                self.showAdd();
            }});
        },

        updateWord: function() {
            var wordEntry = this.wordView.getValue();
            var word = this.wordView.model;
            wordEntry.dict = config.get('active');
            word.save(wordEntry, {url: '/node/update', dataType: 'text', success: function(res){
                $('ul.nav a#review').tab('show');
            }});
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
