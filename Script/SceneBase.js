// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.loader.loadRes("Texture/back", cc.SpriteFrame, function(err, spfr){
            if (err) {
                cc.error(err);
                return;
            }

            var node = new cc.Node();
            node.parent = this.node;
            var widget = node.addComponent(cc.Widget);
            widget.isAlignTop = true;
            widget.top = 10;
            widget.isAlignRight = true;
            widget.right = 10;
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = spfr;
            var btn = node.addComponent(cc.Button);
            btn.node.on("click", this.onClickBack, this);
         }.bind(this));
    },

    // update (dt) {},

    onClickBack: function() {
        cc.director.loadScene("SceneMain");
    }
});
