/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'handlebars.runtime': {
            exports: 'Handlebars'
        },
        'compiled-templates': {
            deps: [
                'handlebars.runtime'
            ],
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        socketio: '../bower_components/socket.io-client/dist/socket.io.min',
        'handlebars.runtime': '../bower_components/handlebars/handlebars.runtime',
    }
});

require([
    'backbone',
    'TipsyGame',
    'routers/main'
], function (Backbone,TipsyGame, MainRouter) {
    new MainRouter();
    Backbone.history.start();
    var game = new TipsyGame();
    game.start();
    game.register("jocke");
});


