'use strict';

define(['jquery', 'underscore', 'backbone', 'marionette', 'backbone.radio', 'text!tmpl/mainBlockView.html'],
function($, _, Bb, Mn, Radio, templateHTML) {
    
    // Cat Main View
    var CatMainView = Mn.View.extend({
        template: _.template(templateHTML),
        ui: {
            back: ".js_back"  
        },
        events: {
            "click @ui.back": "gotoCat",
        },
        regions: {
            list: ".js_list_region"
        },
        onRender: function() {       
            this.showChildView("list", new CatColView({collection: this.collection }));                                                    
        },
        onDestroy: function() {
        },
        gotoCat: function(event) {
            var channelAddBlock = Radio.channel("addBlock");
            var oReturn = channelAddBlock.request("addBlock:goBack", {model: this.model});
        },  
    });
    
    // Cat Item View
    var CatItemView = Mn.View.extend({        
        tagName: "li",
        template: _.template("<div><span class='item'><%=block%><span></div>"),
        ui: {
            item: ".item"
        },
        events: {
            "click @ui.item": "clickItem"  
        },
        clickItem: function() {
        },
        onRender: function() {
        },
        onDestroy: function() {
        }
    });
    
    // Cat Collection View
    var CatColView = Mn.CollectionView.extend({
        tagName: "ul",
        childView: CatItemView,        
        onRender: function() {
        },
        onDestroy: function() {
        }
    });
        
    return CatMainView;
});

