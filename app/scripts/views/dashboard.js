"use strict";

define([
  "backbone",
  "underscore",
  "handlebars",
  "markdown",
  "mousetrap",
  "select2",
  "jquery",
  "text!templates/dashboard-view.html",
  "models/file",
  "models/label",
  "collections/label-list",
  "collections/file-list",
  "views/file-list",
  "views/dashboard-sidebar"
], function(Backbone, _, Handlebars, Markdown, Mousetrap,
  Select2, $, dashboardTemplate, fileModel,
  labelModel, labelList, fileList, fileListView,
  labelListView) {

  var Dashboard = Backbone.View.extend({

    el: "#content",

    template: Handlebars.compile(dashboardTemplate),

    events: {
      "click #dashboard-sidebar a": "updateFilelist"
    },

    updateActiveLink: function(newLink) {
      var currLabelEl = this.$(".nav li.active");
      currLabelEl.removeClass("active");
      console.log(currLabelEl);
      newLink.addClass("active");
    },

    updateFilelist: function(e) {
      var headerLabelEl = this.$("#header-label");
      var currLinkEl = this.$(e.target);
      this.updateActiveLink(currLinkEl.parent());
      // Update header
      headerLabelEl.html(currLinkEl.html());
      var linkText = currLinkEl.text();
      var selectedLabel = this.labelCollection.findWhere({
        "name": linkText
      });
      if (linkText === 'All' || !selectedLabel) {
        this.fileCollection.fetchAll();
        return;
      }
      this.fileCollection.fetchByLabel({
        label_id: selectedLabel.get("id")
      });
    },

    render: function() {
      this.$el.html(this.template());
      this.labelCollection = new labelList();
      this.fileCollection = new fileList();
      (new fileListView({collection: this.fileCollection})).render();
      (new labelListView({collection: this.labelCollection})).render();
      return this;
    }
  });

  return Dashboard;
});

