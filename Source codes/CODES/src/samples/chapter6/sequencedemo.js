var SequenceDemoLayer = BaseSampleLayer.extend({
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
        
        var funct=function(){
            console.log('Action ended');
        }
        var action1 = cc.moveTo(2, cc.p(size.width*0.2 , size.height*0.2));
        var action2 = new cc.RotateBy(2, 360);
        var seq = new cc.Sequence(action1,cc.callFunc(funct, this),action2,cc.callFunc(funct, this));
        this.sprite.runAction(seq.repeatForever());
        return true;
    }
});

var SequenceDemoScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new SequenceDemoLayer());
        cc.director.runScene(this);
    }
});