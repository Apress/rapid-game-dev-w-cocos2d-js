
var KeyboardEventsLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;
        var KeyCode={
            LEFT:37,
            UP:38,
            RIGHT:39,
            DOWN:40
        };
        var MoveOffSet=20;
        this.sprite = new cc.Sprite(res.Sprite_Image);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        this.sprite.tag='TouchTarget';
        
        //Creating Event Listener Object
        var listener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,
	        swallowTouches: true,						
            onKeyPressed: function (keyCode,event) {
               var target = event.getCurrentTarget();
               var position=target.getPosition();
               switch(keyCode)
               {
                   case KeyCode.LEFT:
                   position.x-=MoveOffSet;
                   break;
                   
                   case KeyCode.RIGHT:
                   position.x+=MoveOffSet;
                   break;
                   
                   case KeyCode.UP:
                   position.y+=MoveOffSet;
                   break;
                   
                   case KeyCode.DOWN:
                   position.y-=MoveOffSet;
                   break;
               }
               target.setPosition(position);
            },
            onKeyReleased: function (event) {
               cc.log('Mouse Up');
            }
        });
        
        //Added Event Listener To Sprite
        cc.eventManager.addListener(listener, this.sprite);
        return true;
    }
});

var KeyboardEventsScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new KeyboardEventsLayer());
        cc.director.runScene(this);
    }
});