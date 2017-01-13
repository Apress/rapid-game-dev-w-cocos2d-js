
var SpriteImageLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;
        
        this.sprite = new cc.Sprite(res.Sprite_Image);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});

var SpriteImageScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new SpriteImageLayer());
        cc.director.runScene(this);
    }
});