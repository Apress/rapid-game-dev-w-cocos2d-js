var MotionTrailLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
      this._super();

      var size = cc.winSize;

      this.sprite = new cc.Sprite(res.Sprite_Image);
      this.sprite.attr({
          x: size.width / 2,
          y: 0
      });
      this.addChild(this.sprite, 2);

      var action1 = cc.moveTo(5, cc.p(size.width / 2, size.height));
      var action2= action1.reverse();
      var seq1 = new cc.Sequence(action1,action2);
      this.sprite.runAction(seq1.repeatForever());

      this.tail = new cc.MotionStreak(2, 3, 50, cc.color.WHITE, res.Tail);
      this.tail.attr({
          x: size.width / 2,
          y: 0
      });
      this.addChild(this.tail,1);

      var seq2 = seq1.clone();
      this.tail.runAction(seq2.repeatForever());

      return true;
    }
});

var MotionTrailScene = BaseSampleScene.extend({
    runThisSample:function (num) {
      this.addChild(new MotionTrailLayer());
      cc.director.runScene(this);
    }
});
