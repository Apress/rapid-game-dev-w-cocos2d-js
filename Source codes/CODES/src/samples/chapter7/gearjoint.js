
var GearJointLayer = BaseSampleLayer.extend({
    sprite:null,
    ctor:function () {
      this._super();
      this.initPhysics();
      this.setupDebugNode();
      this.addBottomWall();

      var bodyA = this.addPhysicsBox(cc.p(cc.winSize.width * 0.25, cc.winSize.height * 0.5));
      var bodyB = this.addPhysicsBox(cc.p(cc.winSize.width * 0.75, cc.winSize.height * 0.5));
      var bodyC = this.addPhysicsBox(cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.3));
      var staticBody=this.space.staticBody;

      this.space.addConstraint(new cp.PivotJoint(bodyA, staticBody,
        cc.p(cc.winSize.width * 0.25, cc.winSize.height * 0.5)));

      this.space.addConstraint(new cp.PivotJoint(bodyB, staticBody,
        cc.p(cc.winSize.width * 0.75, cc.winSize.height * 0.5)));

      this.space.addConstraint(new cp.PivotJoint(bodyC, staticBody,
          cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.3)));

      var simpleMotor = new cp.SimpleMotor(bodyA, bodyB, Math.PI);
      this.space.addConstraint(simpleMotor);

      var gearJoint = new cp.GearJoint(bodyB, bodyC, 0, 2);
      this.space.addConstraint(gearJoint);

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

    update:function (dt) {
      this.space.step(dt);
    },
    addBottomWall: function() {
      var bottomWall = new cp.SegmentShape(this.space.staticBody, new cp.v(0, 0), new cp.v(cc.winSize.width, 0), 5);
      bottomWall.setElasticity(1);
      bottomWall.setFriction(1);
      this.space.addStaticShape(bottomWall);
    },
    setupDebugNode : function()
    {
      this._debugNode = new cc.PhysicsDebugNode(this.space);
      this.addChild( this._debugNode );
    },

    addPhysicsBox: function(pos) {
      var width=50,height=50,mass=1;
      var phBodyBox = this.space.addBody(new cp.Body(mass, cp.momentForBox(mass, width,height)));
      phBodyBox.setPos(pos);

      var phShape = this.space.addShape(new cp.BoxShape(phBodyBox, width, height));
      phShape.setFriction(0);
      phShape.setElasticity(1);
      phShape.setCollisionType(1);

      return phBodyBox;
    }
});

var GearJointScene = BaseSampleScene.extend({
    runThisSample:function (num) {
      this.addChild(new GearJointLayer());
      cc.director.runScene(this);
    }
});
