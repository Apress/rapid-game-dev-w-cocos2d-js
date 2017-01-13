var ActionsDemoLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
       
        this._super();

        var size = cc.winSize;
        
        this.sprite = new cc.Sprite(res.Sprite_Image);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        
        
        var action = cc.moveBy(2, cc.p(size.width - 40, size.height - 40));
        this.sprite.runAction(action);
        return true;
    }
});

var ActionsDemoScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new ActionsDemoLayer());
        cc.director.runScene(this);
    }
});