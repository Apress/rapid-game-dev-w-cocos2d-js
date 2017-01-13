var g_groundHeight = 57;
var g_runnerStartX = 80;

var WALLS_WIDTH = 5;
var WALLS_ELASTICITY = 1;
var WALLS_FRICTION = 1;

var ChipmungDemoLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        this.initPhysics();
        this.setupDebugNode();
        this.addWallsAndGround();
        this.addPhysicsCircle();
        this.addPhysicsBox();
        this.addCollisionCallBack();
        
        this.scheduleUpdate();
        return true;
    },
    initPhysics:function() {
        
        //initiate space
        this.space = new cp.Space();

        //setup the  Gravity
        this.space.gravity = cp.v(0, -800); //Earth gravity
        this.space.iterations = 30;
        this.space.sleepTimeThreshold = Infinity;
        this.space.collisionSlop = Infinity;
    },
    addCollisionCallBack:function(){
        // 0 and 1 are tag for box and circle
        this.space.addCollisionHandler(0, 1, function(){
            cc.log('Box and Circle collaiding !');
            return true;
        }, null, null, null);
    },
    update:function (dt) {
        this.space.step(dt);
    },
    addWallsAndGround: function() {
        var leftWall = new cp.SegmentShape(this.space.staticBody, new cp.v(0, 0), new cp.v(0, 1000000), WALLS_WIDTH);
        leftWall.setElasticity(WALLS_ELASTICITY);
        leftWall.setFriction(WALLS_FRICTION);
        this.space.addStaticShape(leftWall);

        var rightWall = new cp.SegmentShape(this.space.staticBody, new cp.v(cc.winSize.width, 1000000), new cp.v(cc.winSize.width, 0), WALLS_WIDTH);
        rightWall.setElasticity(WALLS_ELASTICITY);
        rightWall.setFriction(WALLS_FRICTION);
        this.space.addStaticShape(rightWall);
        
        var bottomWall = new cp.SegmentShape(this.space.staticBody, new cp.v(0, 0), new cp.v(cc.winSize.width, 0), WALLS_WIDTH);
        bottomWall.setElasticity(WALLS_ELASTICITY);
        bottomWall.setFriction(WALLS_FRICTION);
        this.space.addStaticShape(bottomWall);

        var upperWall = new cp.SegmentShape(this.space.staticBody, new cp.v(0, cc.winSize.height), new cp.v(cc.winSize.width, cc.winSize.height), WALLS_WIDTH);
        upperWall.setElasticity(WALLS_ELASTICITY);
        upperWall.setFriction(WALLS_FRICTION);
        this.space.addStaticShape(upperWall);
        
    },
    setupDebugNode : function()
    {
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this.addChild( this._debugNode );
    },
    addPhysicsCircle: function() {
      var width=50,height=50,mass=1;
      
      this.phBodyCircle = this.space.addBody(new cp.Body(mass, cp.momentForCircle(mass,0,width*0.5,cc.p(0,0))));
      this.phBodyCircle.setPos(cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.3));
      
      //#4
      var phShape = this.space.addShape(new cp.CircleShape(this.phBodyCircle, width, cc.p(0, 0)));
      phShape.setFriction(0);
      phShape.setElasticity(1);
      phShape.setCollisionType(0);
    },
    
    addPhysicsBox: function() {
      var width=50,height=50,mass=1;
      this.phBodyBox = this.space.addBody(new cp.Body(mass, cp.momentForBox(mass, width,height)));
      this.phBodyBox.setPos(cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.1));
      
      //#4
      var phShape = this.space.addShape(new cp.BoxShape(this.phBodyBox, width, height));
      phShape.setFriction(0);
      phShape.setElasticity(1);
      phShape.setCollisionType(1);
    }
});

var ChipmungDemoScene = BaseSampleScene.extend({
    runThisSample:function (num) {
        this.addChild(new ChipmungDemoLayer());
        cc.director.runScene(this);
    }
});