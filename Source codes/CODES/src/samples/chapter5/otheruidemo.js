var OtherUIDemoLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;
        
        var colorLayer = new cc.LayerColor(cc.color(142,29,42));
        this.addChild(colorLayer)
        
        this.uiButton = new ccui.Button(res.ButtonImage,res.ButtonImage_Selected);
        this.uiButton.attr({
           x:size.width/2,
           y:size.height/1.3     
        });
        this.addChild(this.uiButton);
        
        this.uiCheckBox = new ccui.CheckBox(res.CheckBox_Normal,res.CheckBox_Selected);
        this.uiCheckBox.attr({
           x:size.width/2,
           y:size.height/2     
        });
        this.addChild(this.uiCheckBox);
        
        return true;
    }
});

var OtherUIDemoScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new OtherUIDemoLayer());
        cc.director.runScene(this);
    }
});