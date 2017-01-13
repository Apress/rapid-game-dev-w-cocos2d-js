var LabelDemoLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;
        
        var colorLayer = new cc.LayerColor(cc.color(142,29,42));
        this.addChild(colorLayer)
        
        this.Label1 = new cc.LabelTTF('Default Font Label','', 32);
        this.Label1.attr({
            x: size.width / 2,
            y: size.height / 1.3
        });
        this.addChild(this.Label1);
        
        this.Label2 = new cc.LabelTTF('Custom Font Label','Abduction', 32);
        this.Label2.attr({
            x: size.width / 2,
            y: size.height / 1.5
        });
        this.addChild(this.Label2);
        
        this.Label3 = new cc.LabelTTF('Label With Stroke','Abduction', 32);
        this.Label3.attr({
            x: size.width / 2,
            y: size.height / 1.9
        });
        this.Label3.enableStroke(cc.color(0,0,0),10);
        this.addChild(this.Label3);
        
        this.Label4 = new cc.LabelTTF('Label With Shadow','Abduction', 32);
        this.Label4.attr({
            x: size.width / 2,
            y: size.height / 2.3
        });
        this.Label4.enableShadow(cc.color(0,0,0), 50, 50);
        this.addChild(this.Label4);
        
        this.Label5 = new cc.LabelBMFont("Bitmap Font", res.BM_Font);
        this.Label5.attr({
            x: size.width / 2,
            y: size.height / 2.9
        });
        this.addChild(this.Label5);
        
        return true;
    }
});

var LabelDemoScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new LabelDemoLayer());
        cc.director.runScene(this);
    }
});