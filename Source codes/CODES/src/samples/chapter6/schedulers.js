var SchedulersLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {

        this._super();

        var size = cc.winSize;

        this.sprite = new cc.Sprite(res.Sprite_Image);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.seed=10;
        this.addChild(this.sprite, 0);
        this.scheduleUpdate();

    },
    update:function(dt) {
      if(this.sprite.getPositionX()>cc.winSize.width){
        this.seed=-10;
      } else if(this.sprite.getPositionX()<0) {
        this.seed=10;
      }
      this.sprite.setPositionX(this.sprite.getPositionX()+this.seed);
    }
});

var SchedulersScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new SchedulersLayer());
        cc.director.runScene(this);
    }
});
