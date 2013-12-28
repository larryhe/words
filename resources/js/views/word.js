/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/word.tmpl',
    'spin',
	'common'
], function ($, _, Backbone, tmpl, Spin, Common) {
	'use strict';

	var wordView = Backbone.View.extend({

		tagName:  'div',

        className: 'word-entry',

		template: _.template(tmpl),

		// The DOM events specific to an item.
		events: {
			'click .more':	'addExplanation',
			'click .cancel':		'close'
		},

		// The Word listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Word** and a **Word** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'sync', this.wordSaved);
		},

		// Re-render the titles of the todo item.
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		wordSaved: function () {
			console.log('word saved');
		},

        getValue: function() {
            var explains = [];
            var self = this;
            this.$('textarea').each(function(){
                var val = $.trim(self.$(this).val());
                if(val){
                    explains.push(val);
                }
            })
            return {word: this.$('#inputWord').val(),
                    phonetic: this.$('#inputPhonetics').val(), 
                    explains: explains};
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
