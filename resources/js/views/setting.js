/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'models/config',
	'text!templates/setting.tmpl'
], function ($, _, Backbone, config, settingTmpl) {
	'use strict';

	var Setting = Backbone.View.extend({

        className: 'setting-container',

		template: _.template(settingTmpl),

		// The DOM events specific to an item.
		events: {
			'click span.badge':	'toggleState',
		},

		// The TodoView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Todo** and a **TodoView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
		},

		// Re-render the titles of the todo item.
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		toggleState: function (event) {
            var target = $(event.target);
            if(target.text() == 'NEW'){
                target.text('MASTERED');
            }else{
                target.text('NEW');
            }
            this.model.save({tag: target.text(), dict: config.get('active')},{url: '/node/update', dataType: 'text'});
		},

		// Switch this view into `"editing"` mode, displaying the input field.
		edit: function () {
			this.$el.addClass('editing');
			this.$input.focus();
		},

		search: function (e) {
            var text = this.$input.val(),
                word;
            if(text){
                word = this.model.where({word: text});
                console.log(word);
            }
		}

	});

	return Setting;
});
