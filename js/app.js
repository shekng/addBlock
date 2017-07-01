'use strict';

//Configure require.js
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
    marionette: {
        deps: [
            'jquery',
            'underscore',
            'backbone',
            'underscore',
            'backbone.radio'
        ],
        exports: 'Mn'
    }
  },
  paths: {
      jquery: 'libs/jquery-2.0.3.min',
      underscore: 'libs/underscore-min',
      backbone: 'libs/backbone-min',
      text: 'libs/text',
      'backbone.radio': 'libs/backbone.radio',
      marionette: 'libs/backbone.marionette'
  }
});

//Start up our App
require([
    'backbone',
    'marionette',
    'backbone.radio',
    'view/cat',
    'view/block',
], 
function (Bb, Mn, Radio, CatMainView, BlockMainView) {
    var colBlocks = new Bb.Collection([{id:0, cat: "1", block: 'block1-1'}, 
                                      {id:1, cat:"2", block: 'block2-1'}, 
                                      {id:2, cat:"2", block: 'block2-2'},
                                      {id:3, cat:"3", block: 'block3-1'}]);
    
    var AppView = Mn.View.extend({
        el: "#divApp",
        template: false,
        ui: {
            //txt: ".txtName"  
        },
        events: {
            //"click .btn": "click",
        },
        regions: {
            main: "#divMain"
        },
        onRender: function() {       
            //this.showChildView("main", new CatMainView({collection: colBlocks }));
            this.showChildView("main", new BlockMainView({collection: colBlocks }));
        },
        onDestroy: function() {
        },      
    });
    
    var app = new AppView().render();
});