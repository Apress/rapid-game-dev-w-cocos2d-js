
var LINE_SPACE = 40;
var BaseSampleLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        return true;
    }
});

var lastChapter=null;

var MainMenuLayer = cc.LayerColor.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super(cc.color(255,205,210,255));
        this._itemMenu = new cc.Menu();

        this._topBanner=new cc.DrawNode();
        this._topBanner.drawRect(cc.p(0,cc.director.getWinSize().height),
        cc.p(cc.director.getWinSize().width,
        cc.director.getWinSize().height/1.3),
        cc.color(244,67,54,255));
        this.addChild(this._topBanner);

        this._topBanner1=new cc.DrawNode();
        this._topBanner1.drawRect(cc.p(0,cc.director.getWinSize().height),
        cc.p(cc.director.getWinSize().width,
        cc.director.getWinSize().height/1.04),
        cc.color(211,47,47,255),0);
        this.addChild(this._topBanner1);

        var titleList=[new cc.LabelTTF('Rapid Game Development', "Arial", 32),
        new cc.LabelTTF('Using', "Arial", 32),
        new cc.LabelTTF('Cocos2d-js', "Arial", 32)];

        for(var i=0;i<titleList.length;i++)
        {
            var title=titleList[i];
            title.setColor(cc.color(255,255,255,255));
            title.x=cc.director.getWinSize().width/2;
            title.y=cc.director.getWinSize().height/1.1 - (i*LINE_SPACE);
            this.addChild(title);
        }



        for (var i = 0, len = sampleList.length; i < len; i++) {
            var label = new cc.LabelTTF(sampleList[i].name+':'+sampleList[i].description, "Arial", 24);
            label.setColor(cc.color(0,0,0,255));
            var menuItem = new cc.MenuItemLabel(label, this.onMenuCallback, this);
            this._itemMenu.addChild(menuItem, i + 10000);
            menuItem.x = cc.director.getWinSize().width / 2;
            menuItem.y = (cc.director.getWinSize().height - (i + 6) * LINE_SPACE);
        }
        this._itemMenu.width = cc.director.getWinSize().width;
	    this._itemMenu.height = (sampleList.length + 1) * LINE_SPACE;
        this._itemMenu.x = 0;
	    this._itemMenu.y = 0;
        this.addChild(this._itemMenu);

        if ('touches' in cc.sys.capabilities)
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesMoved: function (touches, event) {
                    var target = event.getCurrentTarget();
                    var delta = touches[0].getDelta();
                    target.moveMenu(delta);
                    return true;
                }
            }, this);
        else if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseMove: function (event) {
                    if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
                        event.getCurrentTarget().moveMenu(event.getDelta());
                },
                onMouseScroll: function (event) {
                    var delta = cc.sys.isNative ? event.getScrollY() * 6 : -event.getScrollY();
                    event.getCurrentTarget().moveMenu({y : delta});
                    return true;
                }
            }, this);
        }

        return true;
    },
    onMenuCallback:function (sender) {

        var idx = sender.getLocalZOrder() - 10000;
        var sample = sampleList[idx];
        var res = sample.resource || [];
        cc.LoaderScene.preload(res, function () {
            var scene = new SubMenuScene();
            if (scene) {
                scene.runScene(sample);
            }
        }, this);
    },
    moveMenu:function(delta) {
        var newY = this._itemMenu.y + delta.y;
        if (newY < 0 )
            newY = 0;

        if( newY > ((sampleList.length + 1) * LINE_SPACE - cc.director.getWinSize().height))
            newY = ((sampleList.length + 1) * LINE_SPACE - cc.director.getWinSize().height);

	    this._itemMenu.y = newY;
    }
});

var SubMenuLayer = cc.LayerColor.extend({
    sprite:null,
    menuList:null,
    obj:null,
    ctor:function (obj) {
        //////////////////////////////
        // 1. super init first
        this.obj=obj;
        this._super(cc.color(255,205,210,255));
        this._itemMenu = new cc.Menu();
        this.menuList=obj.content;
        this._topBanner=new cc.DrawNode();
        this._topBanner.drawRect(cc.p(0,cc.director.getWinSize().height),
        cc.p(cc.director.getWinSize().width,
        cc.director.getWinSize().height/1.3),
        cc.color(244,67,54,255));
        this.addChild(this._topBanner);

        this._topBanner1=new cc.DrawNode();
        this._topBanner1.drawRect(cc.p(0,cc.director.getWinSize().height),
        cc.p(cc.director.getWinSize().width,
        cc.director.getWinSize().height/1.04),
        cc.color(211,47,47,255),0);
        this.addChild(this._topBanner1);
        var titles=[obj.name,obj.description];
        var titleList=[];
        if(titles)
        {
            for(var i in titles)
            {
                titleList.push(new cc.LabelTTF(titles[i], "Arial", 32))
            }
        }

        for(var i=0;i<titleList.length;i++)
        {
            var title=titleList[i];
            title.setColor(cc.color(255,255,255,255));
            title.x=cc.director.getWinSize().width/2;
            title.y=cc.director.getWinSize().height/1.1 - (i*LINE_SPACE);
            this.addChild(title);
        }

        for (var i = 0, len = this.menuList.length; i < len; i++) {
            var label = new cc.LabelTTF(this.menuList[i].title, "Arial", 24);
            label.setColor(cc.color(0,0,0,255));
            var menuItem = new cc.MenuItemLabel(label, this.onMenuCallback, this);
            this._itemMenu.addChild(menuItem, i + 10000);
            menuItem.x = cc.director.getWinSize().width / 2;
            menuItem.y = (cc.director.getWinSize().height - (i + 6) * LINE_SPACE);
        }
        this._itemMenu.width = cc.director.getWinSize().width;
	    this._itemMenu.height = (sampleList.length + 1) * LINE_SPACE;
        this._itemMenu.x = 0;
	    this._itemMenu.y = 0;
        this.addChild(this._itemMenu);

        if ('touches' in cc.sys.capabilities)
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesMoved: function (touches, event) {
                    var target = event.getCurrentTarget();
                    var delta = touches[0].getDelta();
                    target.moveMenu(delta);
                    return true;
                }
            }, this);
        else if ('mouse' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseMove: function (event) {
                    if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
                        event.getCurrentTarget().moveMenu(event.getDelta());
                },
                onMouseScroll: function (event) {
                    var delta = cc.sys.isNative ? event.getScrollY() * 6 : -event.getScrollY();
                    event.getCurrentTarget().moveMenu({y : delta});
                    return true;
                }
            }, this);
        }

        return true;
    },
    onMenuCallback:function (sender) {

        var idx = sender.getLocalZOrder() - 10000;
        var sample = this.menuList[idx];
        var res = sample.resource || [];
        lastChapter=this.obj;
        cc.LoaderScene.preload(res, function () {
            var scene = sample.runSample();
            if (scene) {
                scene.runThisSample();
            }
        }, this);
    },
    moveMenu:function(delta) {
        var newY = this._itemMenu.y + delta.y;
        if (newY < 0 )
            newY = 0;

        if( newY > ((this.menuList.length + 1) * LINE_SPACE - cc.director.getWinSize().height))
            newY = ((this.menuList.length + 1) * LINE_SPACE - cc.director.getWinSize().height);

	    this._itemMenu.y = newY;
    },
});

var BaseSampleScene = cc.Scene.extend({
    ctor:function (bPortrait) {
        this._super();
        this.init();

        var label = new cc.LabelTTF("Back", "Arial", 30);
        if(!lastChapter)
        {
            label.setColor(cc.color(0,0,0,255));
        }
        var menuItem = new cc.MenuItemLabel(label, this.onMainMenuCallback, this);

        var menu = new cc.Menu(menuItem);
        menu.x = 0;
        menu.y = 0;
        menuItem.x = cc.director.getWinSize().width - 50;
        menuItem.y = 25;

        if(!window.sideIndexBar){
            this.addChild(menu, 1);
        }
    },
    onMainMenuCallback:function () {
        if(lastChapter)
        {
            cc.LoaderScene.preload([], function () {
                var obj= lastChapter;
                lastChapter=null;
                var scene = new SubMenuScene();
                if (scene) {
                    scene.runScene(obj);

                }
            }, this);
        }
        else
        {
            var scene = new MainScene();
            var layer = new MainMenuLayer();
            scene.addChild(layer);
            var transition = new cc.TransitionProgressRadialCCW(0.5,scene);
            cc.director.runScene(transition);
        }
    },

    runThisSample:function () {
        // override me
    }

});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});

var SubMenuScene = BaseSampleScene.extend({
    runScene:function (obj) {
        this.addChild(new SubMenuLayer(obj));
        cc.director.runScene(this);
    }
});

var sampleList = [
    {
      name:'Chapter1',
      description:'Getting Started',
      content: [{
        title:"Hello World",
        linksrc:"src/chapter1/helloworld.js",
        runSample:function () {
            return new HelloWorldScene();
        }
      }]
    },
    {
      name:'Chapter2',
      description:'Deep Dive Into Sprites',
      content: [{
        title:"Initialize Sprite With Image",
        linksrc:"src/chapter2/spriteimage.js",
        runSample:function () {
            return new SpriteImageScene();
        }
      },
      {
        title:"Initialize Sprite with Sprite Sheet",
        linksrc:"src/chapter2/spritesheet.js",
        runSample:function () {
            return new SpriteSheetScene();
        }
      },
      {
        title:"Frame Animation",
        linksrc:"src/chapter2/spriteanimation.js",
        runSample:function () {
            return new SpriteAnimationScene();
        }
      },
      {
        title:"Frame Animation Using Plist Data",
        linksrc:"src/chapter2/plistanimation.js",
        runSample:function () {
            return new PListAnimationScene();
        }
      },
      {
        title:"Sprite Batch Node",
        linksrc:"src/chapter2/spritebatch.js",
        runSample:function () {
            return new SpriteBatchScene();
        }
      }]
    },
    {
      name:'Chapter3',
      description:'Handling Inputs And Events',
      content: [{
        title:"Touch Events",
        linksrc:"src/chapter3/touchevents.js",
        runSample:function () {
            return new TouchEventsScene();
        }
      },
      {
        title:"Mouse Events",
        linksrc:"src/chapter3/mouseevents.js",
        runSample:function () {
            return new MouseEventsScene();
        }
      },
      {
        title:"Keyboard Events",
        linksrc:"src/chapter3/keyboardevents.js",
        runSample:function () {
            return new KeyboardEventsScene();
        }
      }]
    },
    {
      name:'Chapter5',
      description:'Adding GUI',
      content: [{
        title:"Label",
        linksrc:"src/chapter5/labeldemo.js",
        runSample:function () {
            return new LabelDemoScene();
        }
      },
      {
        title:"Menu And MenuItem",
        linksrc:"src/chapter5/menudemo.js",
        runSample:function () {
            return new MenuDemoScene();
        }
      },
      {
        title:"Other GUI Elements",
        linksrc:"src/chapter5/otherguidemo.js",
        runSample:function () {
            return new OtherUIDemoScene();
        }
      }]
    },
    {
      name:'Chapter6',
      description:'Fun With Animation',
      content: [{
        title:"Actions",
        linksrc:"src/chapter6/actionsdemo.js",
        runSample:function () {
            return new ActionsDemoScene();
        }
      },
      {
        title:"Sequence",
        linksrc:"src/chapter6/sequencedemo.js",
        runSample:function () {
            return new SequenceDemoScene();
        }
      },
      {
        title:"Spawn",
        linksrc:"src/chapter6/spawndemo.js",
        runSample:function () {
            return new SpawnDemoScene();
        }
      },
      {
        title:"Stop Action",
        linksrc:"src/chapter6/stopactiondemo.js",
        runSample:function () {
            return new StopActionScene();
        }
      },
      {
        title:"Schedulers and Update",
        linksrc:"src/chapter6/schedulers.js",
        runSample:function () {
            return new SchedulersScene();
        }
      }
      ]
    },
    {
      name:'Chapter7',
      description:'Adding Physics',
      content: [{
        title:"Chipmunk Demo",
        linksrc:"src/chapter7/chipmungdemo.js",
        runSample:function () {
            return new ChipmungDemoScene();
        }
      },
      {
        title:"Pin Joint",
        linksrc:"src/chapter7/pinjoint.js",
        runSample:function () {
            return new PinJointScene();
        }
      },
      {
        title:"Slide Joint",
        linksrc:"src/chapter7/slidejoint.js",
        runSample:function () {
            return new SlideJointScene();
        }
      },
      {
        title:"Pivot Joint",
        linksrc:"src/chapter7/pivotjoint.js",
        runSample:function () {
            return new PivotJointScene();
        }
      },
      {
        title:"Groove Joint",
        linksrc:"src/chapter7/groovejoint.js",
        runSample:function () {
            return new GrooveJointScene();
        }
      },
      {
        title:"Damped Spring",
        linksrc:"src/chapter7/dampedspring.js",
        runSample:function () {
            return new DampedSpringScene();
        }
      },
      {
        title:"Damped Rotary Spring",
        linksrc:"src/chapter7/dampedrotaryspring.js",
        runSample:function () {
            return new DampedRotarySpringScene();
        }
      },
      {
        title:"Rotary Limit Joint",
        linksrc:"src/chapter7/rotarylimitjoint.js",
        runSample:function () {
            return new RotaryLimitJointScene();
        }
      },
      {
        title:"Simple Motor",
        linksrc:"src/chapter7/simplemotor.js",
        runSample:function () {
            return new SimpleMotorScene();
        }
      },
      {
        title:"Gear Joint",
        linksrc:"src/chapter7/gearjoint.js",
        runSample:function () {
            return new GearJointScene();
        }
      }]
    },
    {
      name:'Chapter8',
      description:'Miscellaneous Features',
      content: [{
        title:"Draw Node Demo",
        linksrc:"src/chapter7/chipmungdemo.js",
        runSample:function () {
            return new DrawNodeDemoScene();
        }
      },
      {
        title:"Accessing Localstorage",
        linksrc:"src/chapter8/localstorage.js",
        runSample:function () {
            return new LocalStorageScene();
        }
      },
      {
        title:"Schedule a function",
        linksrc:"src/chapter8/scheduler.js",
        runSample:function () {
            return new SchedulerScene();
        }
      },
      {
        title:"Accessing current language",
        linksrc:"src/chapter8/language.js",
        runSample:function () {
            return new LanguageScene();
        }
      },
      {
        title:"Motion Trail",
        linksrc:"src/chapter8/motiontrail.js",
        runSample:function () {
            return new MotionTrailScene();
        }
      }]
    },
];
