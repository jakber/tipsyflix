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
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        socketio: '../bower_components/socket.io-client/dist/socket.io.min'
    }
});

require([
    'backbone',
    'TipsyGame'
], function (Backbone,TipsyGame) {
    Backbone.history.start();
    var game = new TipsyGame();
    game.start();
    game.register("jocke");
    console.log('Hello from Backbone!');
});


