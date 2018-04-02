cc.Class({
    extends: cc.Component,

    properties: {
        ndParent: cc.Node,
        sp: cc.Sprite,
        spShadow: cc.Sprite,
        nd1: cc.Node,
        nd2: cc.Node,
    },

    onLoad: function() {
        this.gray = false;
        this.xSpeed = 200;
        this.ySpeed = 200;
        this.hw = this.sp.node.width * this.sp.node.anchorX;
        this.hh = this.sp.node.height * this.sp.node.anchorY;
        cc.log(this.sp.node.anchorY);

        this.nd1.on(cc.Node.EventType.TOUCH_START, function(event){
            cc.log("xxxxxxxxxxxxxxxx node touch start 1111");
            return true;
        }.bind(this));

        this.nd2.on(cc.Node.EventType.TOUCH_START, function(event){
            cc.log("xxxxxxxxxxxxxxxx node touch start 2222");
            return true;
        }.bind(this));
        this.nd2._touchListener.setSwallowTouches(false);
    },

	onTouchStart: function(event) {
        cc.log("xxxxxxxxxxxxxxxx node touch start");
        return true;
	},

	onTouchEnd: function(event) {
        cc.log("xxxxxxxxxxxxxxxx node touch end");
    },
    
    onClick: function(){
        cc.log("xxxxxxxxxxxxxxxx node on click");
        this.gray = !this.gray;
        this.sp._sgNode.setState(this.gray ? 1: 0);
    },

    update: function(dt) {
        var pos = this.sp.node.getPosition();
        if (pos.x < this.hw || pos.x > 960 - this.sp.node.width + this.hw) {
            this.xSpeed *= -1;
        }
        if (pos.y < this.hh || pos.y > 640 - this.sp.node.height + this.hh) {
            this.ySpeed *= -1;
        }
        var x = pos.x + this.xSpeed * dt;
        var y = pos.y + this.ySpeed * dt;
        this.sp.node.setPosition(x, y);
        this.spShadow.node.setPosition(x, y);
    },
});
