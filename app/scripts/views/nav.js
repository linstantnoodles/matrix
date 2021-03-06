"use strict";

define([
  "backbone",
  "underscore",
  "jquery",
  "handlebars",
  "models/file",
  "models/label",
  "models/session",
  "text!templates/nav-view.html"
], function(Backbone, _, $, Handlebars,
  fileModel, labelModel, session, headerTemplate) {

  session = session.getSession();

  var Header = Backbone.View.extend({

    el: "#main-nav",

    template: Handlebars.compile(headerTemplate),

    events: {
      "click .new-file": "newFile",
      "click .new-label": "newLabel",
      "click #create-label": "createLabel",
      "click .about": "updateAbout",
      "click .logout": "logout"
    },

    newFile: function() {
      var file = new fileModel();
      file.save({}, {
        success: function(model, response, options) {
          var modelId = model.get("id");
          window.open(session.getBaseUrl() + "/#file/" + modelId + "/edit");
        }
      });
    },

    updateNav: function(current) {
      $(".navbar-nav li")
        .removeClass("active")
        .filter(function() {
          return $(this).children().attr("class") == current;
        })
        .addClass("active");
    },

    updateAbout: function() {
      this.updateNav("about");
    },

    newLabel: function() {
      $("#new-label-modal").modal("show");
    },

    createLabel: function() {
      // Grab info, validate
      var modalEl = $("#new-label-modal");
      var title = $("#new-label-modal input[type=text]").val();
      var description = $("#new-label-modal textarea").val();
      var newLabel = new labelModel();
      newLabel.save({
        name: title,
        description: description
      }, {
        success: function() {
          modalEl.modal("hide");
        },
        error: function() {
          alert("label not saved");
        }
      });
    },

    logout: function() {
      session.logout({
        success: function() {
          window.location = session.getBaseUrl();
        },
        failure: function() {
          alert("failed to logout");
        }
      });
    },

    render: function(currPage) {
      this.$el.html(this.template({
        baseUrl: session.getBaseUrl(),
        isAuthenticated: session.isAuthenticated(),
        isEditPage: currPage === "edit"
      }));
      return this;
    }
  });

  return Header;
});

