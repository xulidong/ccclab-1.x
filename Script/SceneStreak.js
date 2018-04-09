var SceneBase = require("SceneBase");

cc.Class({
    extends: SceneBase,

    properties: {
        sp: cc.Sprite,
    },

    onLoad: function() {
        this.xSpeed = 200;
        this.ySpeed = 200;
        this.hw = this.sp.node.width * this.sp.node.anchorX;
        this.hh = this.sp.node.height * this.sp.node.anchorY;
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
    },
});
