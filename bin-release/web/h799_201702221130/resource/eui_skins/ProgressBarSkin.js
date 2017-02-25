var skins;
(function (skins) {
	var ProgressBarSkin=(function (_super) {
		__extends(ProgressBarSkin, _super);
		function ProgressBarSkin() {
			_super.call(this);
			
			this.minHeight = 18;
			this.minWidth = 30;
			this.elementsContent = [this.progressBg_i(),this.thumb_i(),this.labelDisplay_i()];
		}
		var _proto = ProgressBarSkin.prototype;
	
		_proto.progressBg_i = function () {
			var t = new eui.Image();
			this.progressBg = t;
			t.percentHeight = 100;
			t.scale9Grid = new egret.Rectangle(3,3,2,2);
			t.source = "bg_LVtiao";
			t.verticalCenter = 0;
			t.percentWidth = 100;
			return t;
		};
		_proto.thumb_i = function () {
			var t = new eui.Image();
			this.thumb = t;
			t.bottom = 2;
			t.left = 2;
			t.right = 2;
			t.scale9Grid = new egret.Rectangle(1,1,6,6);
			t.source = "jindutiao";
			t.top = 2;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.fontFamily = "黑体";
			t.horizontalCenter = 0;
			t.size = 15;
			t.textAlign = "center";
			t.textColor = 0x707070;
			t.verticalAlign = "middle";
			t.verticalCenter = 0;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["progressBg","thumb","labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ProgressBarSkin;
	})(eui.Skin);
})(skins || (skins = {}));