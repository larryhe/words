/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/word.tmpl',
	'common'
], function ($, _, Backbone, wordsTemplate, Common) {
	'use strict';

	var wordView = Backbone.View.extend({

		tagName:  'div',

        className: 'word-entry',

		template: _.template(wordsTemplate),

		// The DOM events specific to an item.
		events: {
			'click .more':	'addExplanation',
			'click .submit':	'createWord',
			'click .cancel':		'close'
		},

		// The Word listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Word** and a **Word** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function () {
			this.listenTo(this.model, 'change:explains', this.render);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		// Re-render the titles of the todo item.
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		toggleVisible: function () {
			this.$el.toggleClass('hidden',  this.isHidden());
		},

        createWord: function() {
            var explains = [];
            var self = this;
            this.$('textarea').each(function(){
                var val = self.$(this).val();
                if(val){
                    explains.push(val);
                }
            })
            this.model.save({word: this.$('#inputWord').val(),
                            phonetic: this.$('#inputPhonetics').val(), 
                            explains: explains}, {url: '/node/add'});
        },

		// Close the `"editing"` mode, saving changes to the todo.
		close: function () {
			var value = this.$input.val().trim();

			if (value) {
				this.model.save({ title: value });
			} else {
				this.clear();
			}

			this.$el.removeClass('editing');
		},

		addExplanation: function () {
			$('<textarea>').addClass('form-control').prop('rows', 3).insertAfter(this.$('.explains textarea:last'));
		}
	});

	return wordView;
});
