define(['backbone', 'compiled-templates'], function(Backbone, Handlebars){
  var GameView = Backbone.View.extend({
    render: function () {
      $(this.el).html(new Waiting().render().el);
      var that = this;
      setTimeout(function() { $(that.el).html(new Play().render().el); }, 2000)
      return this;
    }
  });

  var Waiting = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.waiting({value:"scoreboard"}));
      return this;
    }
  });
  var Lose = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.lose({value:"scoreboard"}));
      return this;
    }
  });
  var Win = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.win({value:"scoreboard"}));
      return this;
    }
  });
  var Play = Backbone.View.extend({
    render: function () {
      $(this.el).html(Handlebars.templates.game_started({value:"scoreboard"}));
      return this;
    },
    events: {
    	"click button.play": "onEpic"
    },
    onEpic: function() {
    	this.count = this.count || 0;
    	this.count++;
    	var view = Win;
    	if (this.count % 2 == 0) view = Lose;
    	this.$el.html(new view().render().el);
    	var that = this;
    	setTimeout(function() { that.render(); }, 2000)
    }
  });



  return GameView;
});
