
var MouseEventsLayer = BaseSampleLayer.extend({
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
            event: cc.EventListener.MOUSE,
	        swallowTouches: true,						
	        ismousedown:false,
            onMouseDown: function (event) {	
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(event.getLocation());	
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                
			    //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {		
                    cc.log('Mouse Down: Inside the sprite');
                    this.ismousedown=true;
                }
                cc.log('Mouse Down: Outside the sprite');
                return false;
            },
            onMouseMove: function (event) {
                if(this.ismousedown)
                {
                    var target = event.getCurrentTarget();
                    target.setPosition(event.getLocation());
                }
            },
            onMouseUp: function (event) {
               cc.log('Mouse Up');
               this.ismousedown=false;
            }
        });
        
        //Added Event Listener To Sprite
        cc.eventManager.addListener(listener, this.sprite);
        return true;
    }
});

var MouseEventsScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new MouseEventsLayer());
        cc.director.runScene(this);
    }
});