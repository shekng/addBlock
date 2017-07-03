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
    var colBlocks = new Bb.Collection([
                                        {id:0, cat: "0", block: 'All'},
                                        {id:1, cat: "1", block: 'block1-1'}, 
                                      {id:2, cat:"2", block: 'block2-1'}, 
                                      {id:3, cat:"2", block: 'block2-2'},
                                      {id:4, cat:"3", block: 'block3-1'}]);
    
    var AppView = Mn.View.extend({
        el: "#divApp",
        template: false,
        ui: {
            wrapper: ".addblock_wrapper"  
        },
        events: {
            //"click .btn": "click",
        },
        regions: {
            list: "#divList",
            item: "#divItem"
        },
        initialize: function() {
            this.options.channel = Radio.channel("addBlock");
            this.options.channel.reply("addBlock:goto", this.goto, this);
            this.options.channel.reply("addBlock:goBack", this.goBack, this);
        },
        onRender: function() {       
            this.showChildView("list", new CatMainView({collection: colBlocks }));
            // remove the first model
            var colItems = colBlocks.clone()
            colItems.shift();
            this.showChildView("item", new BlockMainView({collection: colItems }));
        },
        onDestroy: function() {
        },   
        goto:function(oParam) { 
            this.ui.wrapper.addClass("slide_left_to_hide");
            if (oParam.model.get("cat") === "0") {
                this.getRegion("item").currentView.getRegion("list").currentView.removeFilter();
            }
            else {
                this.getRegion("item").currentView.getRegion("list").currentView.setFilter(
                    function (child, index, collection) {
                        return child.get('cat') === oParam.model.get("cat");
                    });
            }
            
            
            //this.showChildView("main", new CatMainView({collection: colBlocks }));
            //alert(oParam.model.get("block"))
            return {status: "success"};
        },
        goBack:function() {
            this.ui.wrapper.removeClass("slide_left_to_hide");
        }
    });
    
    var app = new AppView().render();
});