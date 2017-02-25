var skins;
(function (skins) {
	var ItemRendererSkin=(function (_super) {
		__extends(ItemRendererSkin, _super);
		function ItemRendererSkin() {
			_super.call(this);
			
			this.minHeight = 50;
			this.minWidth = 100;
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","button_on")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","alpha",0.5)
					])
			];
			
			eui.Binding.bindProperty(this, ["hostComponent","data","label"], this.labelDisplay,"text");
		}
		var _proto = ItemRendererSkin.prototype;
	
		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.scale9Grid = new egret.Rectangle(14,14,4,4);
			t.source = "button_off";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.bottom = 8;
			t.fontFamily = "黑体";
			t.left = 8;
			t.right = 8;
			t.size = 20;
			t.textAlign = "center";
			t.textColor = 0xFFFFFF;
			t.top = 8;
			t.verticalAlign = "middle";
			return t;
		};
		Object.defineProperty(_proto, "skinParts", {
			get: function () {
				return ["labelDisplay"];
			},
			enumerable: true,
			configurable: true
		});
		return ItemRendererSkin;
	})(eui.Skin);
})(skins || (skins = {}));