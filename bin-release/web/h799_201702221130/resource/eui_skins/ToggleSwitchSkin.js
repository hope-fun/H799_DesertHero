var skins;
(function (skins) {
	var ToggleSwitchSkin=(function (_super) {
		__extends(ToggleSwitchSkin, _super);
		function ToggleSwitchSkin() {
			_super.call(this);
			
			this.height = 58;
			this.width = 161;
			this.elementsContent = [this._Image1_i(),this._Image2_i()];
			this.states = [
				new eui.State ("up",
					[
						new eui.SetProperty("_Image1","source","bg_yinxiaoguan")
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","bg_yinxiaoguan")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","bg_yinxiaoguan")
					])
				,
				new eui.State ("upAndSelected",
					[
						new eui.SetProperty("_Image2","horizontalCenter",48)
					])
				,
				new eui.State ("downAndSelected",
					[
						new eui.SetProperty("_Image2","horizontalCenter",48)
					])
				,
				new eui.State ("disabledAndSelected",
					[
						new eui.SetProperty("_Image2","horizontalCenter",48)
					])
			];
		}
		var _proto = ToggleSwitchSkin.prototype;
	
		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.bottom = 0;
			t.left = 0;
			t.right = 0;
			t.scale9Grid = new egret.Rectangle(14,14,3,2);
			t.source = "bg_yinxiaokai";
			t.top = 0;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			this._Image2 = t;
			t.bottom = 4;
			t.left = 4;
			t.right = 105;
			t.scale9Grid = new egret.Rectangle(14,14,3,3);
			t.source = "button_yinxiao";
			t.top = 4;
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return [];
			},
			enumerable: true,
			configurable: true
		});
		return ToggleSwitchSkin;
	})(eui.Skin);
})(skins || (skins = {}));