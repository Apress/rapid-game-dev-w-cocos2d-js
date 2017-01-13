var MenuDemoLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;
        
        var colorLayer = new cc.LayerColor(cc.color(142,29,42));
        this.addChild(colorLayer)
        
        this.Menu=new cc.Menu();
        this.Menu.attr({
            x: 0,
            y: 0
        });
        
        //Menu item with label
        var label=new cc.LabelTTF('MenuItem with label',36);
        this.MenuItem1 = new cc.MenuItemLabel(label,'onMenuClicked',this);
        this.MenuItem1.attr({
            x: size.width / 2,
            y: size.height / 1.3
        });
        this.Menu.addChild(this.MenuItem1);
        
        //Menu item with image
        this.MenuItem2 = new cc.MenuItemImage(res.MenuItemImage_Normal,res.MenuItemImage_Selected,null,'onMenuClicked',this);
        this.MenuItem2.attr({
            x: size.width / 2,
            y: size.height / 1.8
        });
        this.Menu.addChild(this.MenuItem2);
        
       
        
        this.addChild(this.Menu);
        return true;
    },
    onMenuClicked:function(){
        
    }
});

var MenuDemoScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new MenuDemoLayer());
        cc.director.runScene(this);
    }
});