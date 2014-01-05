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
			'change select':	'resetDict',
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

		resetDict: function (event) {
            var target = $(event.target);
            if(target.hasClass('dict')){
                config.set({active: target.val()});
            }else if(target.hasClass('mode')){
                config.set({mode: target.val()});
            }else{
                config.set({order: target.val()});
            }
		}

	});

	return Setting;
});
