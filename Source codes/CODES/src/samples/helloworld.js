
var HelloWorldLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        
        var size = cc.winSize;
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});

var HelloWorldScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new HelloWorldLayer());
        cc.director.runScene(this);
    }
});