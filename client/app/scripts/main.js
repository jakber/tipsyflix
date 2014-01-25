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
    'routers/main'
], function (Backbone, MainRouter) {
    window.appRouter = new MainRouter();
    Backbone.history.start();
});


