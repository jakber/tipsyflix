define(['backbone', 'compiled-templates'], function(Backbone, Handlebars){
  var HomeView = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.home({value:"home", games:this.games}));
      return this;
    }
  });

  return HomeView;
});
