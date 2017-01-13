var LocalStorageLayer = BaseSampleLayer.extend({
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

        var localstorage=cc.sys.localStorage;

        //Store a key/value in localstorge
        localstorage.setItem('key1','Text from localstorage');

        var text=localStorage.getItem('key1');

        //Retrive value using key in localStorage
        this.Label.setString(text);

        return true;
    }
});

var LocalStorageScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new LocalStorageLayer());
        cc.director.runScene(this);
    }
});
