var LanguageLayer = BaseSampleLayer.extend({
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

        var language=cc.sys.language;

        //set the language string
        this.Label.setString('Current Locale: '+language);
        return true;
    }
});

var LanguageScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new LanguageLayer());
        cc.director.runScene(this);
    }
});
