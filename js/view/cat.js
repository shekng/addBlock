'use strict';

define(['jquery', 'underscore', 'backbone', 'marionette', 'text!tmpl/mainCatView.html'],
function($, _, Bb, Mn, templateHTML) {
    
    // Cat Main View
    var CatMainView = Mn.View.extend({
        template: _.template(templateHTML),
        ui: {
            txt: ".txtName"  
        },
        events: {
            "click .btn": "click",
        },
        regions: {
            list: ".js_list_region"
        },
        onRender: function() {       
            var oGroupByCat = this.collection.groupBy(function (val) {
                return val.get("cat");
            });
            
            var arrMap = _.map(oGroupByCat, function(val, key) {
                return { cat: key };
            })
            this.showChildView("list", new CatColView({collection: new Bb.Collection(arrMap) }));                                                    
        },
        onDestroy: function() {
        },
        click: function(event) {
            console.log("main - click!");
        },  
    });
    
    // Cat Item View
    var CatItemView = Mn.View.extend({        
        tagName: "li",
        template: _.template("<div><span><%=cat%><span></div>"),
        ui: {
            del: ".delItem"
        },
        triggers: {
            "click @ui.del": "delete:item"  
        },
        events: {
            "click @ui.del": "deleteModel"  
        },
        deleteModel: function() {
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

