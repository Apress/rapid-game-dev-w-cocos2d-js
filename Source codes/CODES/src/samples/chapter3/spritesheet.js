
var SpriteSheetLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
       
        this._super();

        var size = cc.winSize;
        
        this.sprite = new cc.Sprite(res.Sprite_Sheet,cc.rect(438,93,67,94));
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});

var SpriteSheetScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new SpriteSheetLayer());
        cc.director.runScene(this);
    }
});