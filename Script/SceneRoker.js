cc.Class({
    extends: cc.Component,

    properties: {
        spPlayer: cc.Sprite,
        spRoker: cc.Sprite,
        spRokerCenter: cc.Sprite,
        moveSpeed: {
            type: cc.Float,
            default: 1
        },
        maxRadius: {
            type: cc.Float,
            default: 100
        }
    },

    onLoad: function () {
        this.oriRokerPos = this.spRoker.node.getPosition();
        this.oriRokerCenterPos = this.spRokerCenter.node.getPosition();

        this.spRoker.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.spRoker.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.spRoker.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.spRoker.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },

    onTouchStart: function(event) {
        var touchPos = event.getLocation();
        var pos = this.spRoker.node.parent.convertToNodeSpaceAR(touchPos);
        var dir = this.getDirection(pos);
        this.moveDir = this.getDirection(pos);
        this.updateRokerPos(pos);
    },

    onTouchMove: function(event) {
        var touchPos = event.getLocation();
        var pos = this.spRoker.node.parent.convertToNodeSpaceAR(touchPos);
        this.moveDir = this.getDirection(pos);
        this.updateRokerPos(pos);
    },

    onTouchEnd: function(event) {
        this.spRokerCenter.node.setPosition(this.oriRokerCenterPos);
        this.spRoker.node.setPosition(this.oriRokerPos);
        this.moveDir = null;
    },

    onTouchCancel: function(event) {
        this.spRokerCenter.node.setPosition(this.oriRokerCenterPos);
        this.spRoker.node.setPosition(this.oriRokerPos);
        this.moveDir = null;
    },

    getDirection: function(pos) {
        var oriPos = this.spRoker.node.getPosition();
        var rad = Math.atan2(pos.y - oriPos.y, pos.x - oriPos.x);// [-PI, PI]
        if ((rad >= -Math.PI / 8 && rad < 0) || (rad >= 0 && rad < Math.PI / 8)) {
            return cc.v2(1, 0);// 右
        } else if (rad >= Math.PI / 8 && rad < 3 * Math.PI / 8) {
            return cc.v2(1, 1);// 右上
        } else if (rad >= 3 * Math.PI / 8 && rad < 5 * Math.PI / 8) {
            return cc.v2(0, 1);// 上
        } else if (rad >= 5 * Math.PI / 8 && rad < 7 * Math.PI / 8) {
            return cc.v2(-1, 1);// 左上
        } else if ((rad >= 7 * Math.PI / 8 && rad < Math.PI) || (rad >= -Math.PI && rad < -7 * Math.PI / 8)) {
            return cc.v2(-1, 0);// 左
        } else if (rad >= -7 * Math.PI / 8 && rad < -5 * Math.PI / 8) {
            return cc.v2(-1, -1);// 左下
        } else if (rad >= -5 * Math.PI / 8 && rad < -3 * Math.PI / 8) {
            return cc.v2(0, -1);// 下
        } else {
            return cc.v2(1, -1);// 右下
        }
    },

    updateRokerPos: function(pos) {
        this.spRokerCenter.node.setPosition(pos);
        var oriPos = this.spRoker.node.getPosition();
        var subVec = cc.v2(pos.x - oriPos.x, pos.y - oriPos.y);
        var len = subVec.mag();
        if (len > this.maxRadius) {
            var rate = this.maxRadius / len;
			var x = pos.x + (oriPos.x - pos.x) * rate;
            var y = pos.y + (oriPos.y - pos.y) * rate;
            this.spRoker.node.setPosition(x, y);
        }
    },

    updatePlayerPos: function(dir) {
        var size = cc.director.getWinSize();

        var x = this.spPlayer.node.x + dir.x * this.moveSpeed;
        var maxX = size.width * 0.5 - this.spPlayer.node.width * 0.5;
        var x = x > 0 ? Math.min(x, maxX) : Math.max(x, -maxX);

        var y = this.spPlayer.node.y + dir.y * this.moveSpeed;
        var maxY = size.height * 0.5 - this.spPlayer.node.height * 0.5;
        var y = y > 0 ? Math.min(y, maxY) : Math.max(y, -maxY);

        this.spPlayer.node.setPosition(x, y);
    },

    update: function(dt) {
        if (this.moveDir) {
            this.updatePlayerPos(this.moveDir);
        }
    },
});
