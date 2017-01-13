var StopActionLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
       
        this._super();

        var size = cc.winSize;
        this.size=size;
        
        this.Menu=new cc.Menu();
        this.Menu.attr({
            x: 0,
            y: 0
        });
        
        //Menu item with label
        this.label=new cc.LabelTTF('Stop Action','',56);
        this.MenuItem1 = new cc.MenuItemLabel(this.label,'onMenuClicked',this);
        this.MenuItem1.attr({
            x: size.width / 2,
            y: size.height / 1.3
        });
        this.Menu.addChild(this.MenuItem1);
        this.addChild(this.Menu);
        
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
        var action2 = cc.moveTo(2, cc.p(size.width/2 , size.height/2));
        this.seq = new cc.Spawn([action1,action2]);
        this.sprite.runAction(this.seq.repeatForever());
        this.isplaying=true;
        return true;
    },
    onMenuClicked:function(){
        if(this.isplaying)
        {
            this.sprite.stopAction(this.seq);
            this.label.setString('Play Action');
            this.isplaying=false;
        }
        else
        {
             this.sprite.runAction(this.seq.repeatForever());
             this.label.setString('Stop Action');
             this.isplaying=true;
        }
        this.sprite.attr({
            x: this.size.width / 2,
            y: this.size.height / 2
        });
    }
});

var StopActionScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new StopActionLayer());
        cc.director.runScene(this);
        
    }
});