
var TouchEventsLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
        this._super();

        var size = cc.winSize;
        
        this.sprite = new cc.Sprite(res.Sprite_Image);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        this.sprite.tag='TouchTarget';
        
        //Creating Event Listener Object
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
	        swallowTouches: true,						
	        
            onTouchBegan: function (touch, event) {	
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());	
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                
			    //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {		
                    cc.log('Touch began: Inside the sprite');
                    //True has been returned to initiate the OnTouchMove   
                    return true;
                }
                cc.log('Touch began: Outside the sprite');
                return false;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                target.setPosition(touch.getLocation());
            },
            onTouchEnded: function (touch, event) {
               cc.log('Touch end');
            }
        });
        
        //Added Event Listener To Sprite
        cc.eventManager.addListener(listener, this.sprite);
        return true;
    }
});

var TouchEventsScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new TouchEventsLayer());
        cc.director.runScene(this);
    }
});