var DrawNodeDemoLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
       
        this._super();

        var size = cc.winSize;
        
        this.draw=new cc.DrawNode();
        this.addChild(this.draw);
        
        //drawCircle
        this.draw.drawCircle(cc.p(size.width / 2, size.height / 2), 100, 0, 10, false, 6, cc.color(0, 255, 0, 255));
        this.draw.drawCircle(cc.p(size.width / 2, size.height / 2), 50, cc.degreesToRadians(90), 50, true, 2, cc.color(0, 255, 255, 255));
        
        return true;
    }
});

var DrawNodeDemoScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new DrawNodeDemoLayer());
        cc.director.runScene(this);
    }
});