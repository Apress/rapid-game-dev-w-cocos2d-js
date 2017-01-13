var SchedulerLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;

        this.Label = new cc.LabelTTF('','', 32);
        this.Label.attr({
            x: size.width / 2,
            y: size.height / 2
        });

        this.addChild(this.Label);

        this.timer=0;
        this.schedule(this.onUpdate,1);

        return true;
    },
    onUpdate:function(){
      this.Label.setString((this.timer++)+' sec');
    }
});

var SchedulerScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new SchedulerLayer());
        cc.director.runScene(this);
    }
});
