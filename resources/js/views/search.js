/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/search.tmpl'
], function ($, _, Backbone, searchTmpl) {
	'use strict';

	var SearchView = Backbone.View.extend({

		tagName:  'div',
        
        className: 'search form-group',

		template: _.template(searchTmpl),

		// The DOM events specific to an item.
		events: {
			'click button':	'search',
			'keypress input':	'search'
		},

		// The TodoView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Todo** and a **TodoView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		// Re-render the titles of the todo item.
		render: function () {
			this.$el.html(this.template());
			return this;
		},

		toggleVisible: function () {
			this.$el.toggleClass('hidden',  this.isHidden());
		},

		// Switch this view into `"editing"` mode, displaying the input field.
		edit: function () {
			this.$el.addClass('editing');
			this.$input.focus();
		},

		search: function (e) {
            var text = this.$('input').val(),
                word;
            if(text){
                word = this.model.where({word: text});
                if(word.length > 0){
                    var $help = this.$('.search_result');
                    text = $help.html();
                    $help.html(text.replace('{0}', word[0].get('word')));
                    $help.show();
                }else{
                    trigger('newWord');
                }
            }
		}

	});

	return SearchView;
});
