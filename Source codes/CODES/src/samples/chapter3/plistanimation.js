
var PListAnimationLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;
       
        cc.spriteFrameCache.addSpriteFrames(res.Sprite_Sheet1_P, res.Sprite_Sheet1);
        //Create SpriteFrame and AnimationFrame with Frame Data
        var animFrames=[];
        for(var i=1;i<12;i++)
        {   
            var str = "p1_walk" + (i < 10 ? ("0" + i) : i) + ".png";
            var spriteFrame=cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(spriteFrame);
        }
        
        //Create an empty sprite
        this.sprite = new cc.Sprite();
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        
        this.addChild(this.sprite, 0);
        
        var animation = new cc.Animation(animFrames, 0.08);
        this.sprite.runAction(cc.animate(animation).repeatForever());
        
        return true;
    }
});

var PListAnimationScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new PListAnimationLayer());
        cc.director.runScene(this);
    }
});