
var SpriteBatchLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {

        this._super();

        var size = cc.winSize;

        this.sprite1 = new cc.Sprite(res.Sprite_Sheet,cc.rect(438,93,67,94));
        this.sprite1.attr({
            x: size.width / 2,
            y: size.height / 1.5
        });

        this.sprite2 = new cc.Sprite(res.Sprite_Sheet,cc.rect(73,0,72,97));
        this.sprite2.attr({
            x: size.width / 2,
            y: size.height / 2
        });

        this.sprite3 = new cc.Sprite(res.Sprite_Sheet,cc.rect(219,0,72,97));
        this.sprite3.attr({
            x: size.width / 2,
            y: size.height / 3
        });

        this.sprite4 = new cc.Sprite(res.Sprite_Sheet,cc.rect(365,0,72,97));
        this.sprite4.attr({
            x: size.width / 2,
            y: size.height / 5
        });
        this.spritebatch=new cc.SpriteBatchNode(res.Sprite_Sheet);

        this.spritebatch.addChild(this.sprite1, 0);
        this.spritebatch.addChild(this.sprite2, 0);
        this.spritebatch.addChild(this.sprite3, 0);
        this.spritebatch.addChild(this.sprite4, 0);

        this.addChild(this.spritebatch);

        return true;
    }
});

var SpriteBatchScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new SpriteBatchLayer());
        cc.director.runScene(this);
    }
});
