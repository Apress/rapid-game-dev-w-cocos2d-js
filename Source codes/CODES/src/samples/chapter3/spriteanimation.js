
var SpriteAnimationLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;
        //FrameData
        var walk01 = cc.rect(0,0,72,97);
        var walk02 = cc.rect(73,0,72,97);
        var walk03 = cc.rect(146,0,72,97);
        var walk04 = cc.rect(0,98,72,97);
        var walk05 = cc.rect(73,98,72,97);
        var walk06 = cc.rect(146,98,72,97);
        var walk07 = cc.rect(219,0,72,97);
        var walk08 = cc.rect(292,0,72,97);
        var walk09 = cc.rect(219,98,72,97);
        var walk10 = cc.rect(365,0,72,97);
        var walk11 = cc.rect(292,98,72,97);
        
        var frameDatas=[walk01,walk02,walk03,walk04,walk05,
        walk06,walk07,walk08,walk09,walk10,walk11];
        var texture = cc.textureCache.addImage(res.Sprite_Sheet);
        
        //Create SpriteFrame and AnimationFrame with Frame Data
        var animFrames=[];
        for(var index in frameDatas)
        {   
            var spriteFrame =  new cc.SpriteFrame(texture, frameDatas[index]);
            var animFrame = new cc.AnimationFrame();
            animFrame.initWithSpriteFrame(spriteFrame, 1, null);
            animFrames.push(animFrame);
        }
        
        //Create an empty sprite
        this.sprite = new cc.Sprite();
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        
        this.addChild(this.sprite, 0);
        
        var animation = cc.Animation.create(animFrames, 0.08);
        var animate   = cc.Animate.create(animation); 
        
        //Animate the sprite frame on the empty sprite
        this.sprite.runAction(animate.repeatForever()); 
        
        return true;
    }
});

var SpriteAnimationScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new SpriteAnimationLayer());
        cc.director.runScene(this);
    }
});