var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/**
 * @按键控制说明.
 * @back键：退出.
 * @menu键：切换菜单区域.
 * @
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @主题是否加载完成.
         */
        _this.isThemeLoadEnd = false;
        /**
         * @资源是否加载完成.
         */
        _this.isResourceLoadEnd = false;
        /**
         * @登陆完毕.
         */
        _this.isLoginReady = false;
        /**
         * @动态数据准备完毕.
         */
        _this.isDyDataReady = false;
        /**
         * @静态数据准备完毕.
         */
        _this.isStDataReady = false;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        Main.singleton = this;
        this.keyEventTool = new Model.KeyEventTool(); //注册按键事件.
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/"); //加载资源配置.
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage); //加载皮肤配置.
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    /**
     * @主题文件加载完成,开始预加载
     * @Loading of theme configuration file is complete, start to pre-load the
     */
    Main.prototype.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.createLogoScene();
    };
    /**
     * @创建资源加载以及logo场景.
     */
    Main.prototype.createLogoScene = function () {
        var _this = this;
        this.logoVM = new ViewModel.LogoVM(this, function () {
            console.log("Test: Logo and loading scene init finish ! ");
        });
        var tw = egret.Tween.get(this.logoVM.logoGroup); //Logo淡入动画.
        tw.to({ alpha: 1 }, 500).call(function () {
            _this.logoVM.loadingBarItem.visible = true;
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, _this.onResourceLoadComplete, _this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, _this.onResourceLoadError, _this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, _this.onResourceProgress, _this);
            RES.loadGroup("preload");
        });
    };
    /**
     * @preload资源组加载完成
     * @preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        var _this = this;
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.isResourceLoadEnd = true;
            this.logoVM.loadingBarItem.visible = false;
            var tw = egret.Tween.get(this.logoVM.logoGroup);
            tw.to({ alpha: 0 }, 500).call(function () {
                _this.removeChild(_this.logoVM);
                _this.sendLogin(); //创建logo场景同时发送登陆请求.
                _this.createScene();
            });
        }
    };
    /**
     * @资源组加载出错
     * @Resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * @preload资源组加载进度．
     * @loading process of preload resource
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.logoVM.loadingBarItem.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * @创建场景界面
     * @Create scene interface
     * @登陆完成即可发送请求获取动态数据和静态数据.
     */
    Main.prototype.sendLogin = function () {
        this.isLoginReady = true; //登陆请求成功回调，重置状态.
        this.sendDyData();
        this.sendStData();
    };
    /**
     * @发送动态数据.
     */
    Main.prototype.sendDyData = function () {
        Model.WebService.updateDyData(function (_data) {
            Model.WebValue.dataDyModel = _data;
            if (Model.WebServiceBase.isDebug)
                console.log("zhujun: update dy data interface call back successed !　");
        }, function () {
            if (Model.WebServiceBase.isDebug)
                console.log("zhujun: update dy data interface call back failed ! ");
        });
    };
    /**
     * @发送静态数据.
     */
    Main.prototype.sendStData = function () {
        Model.WebService.updateStData(function (_data) {
            Model.WebValue.dataStModel = _data;
            if (Model.WebServiceBase.isDebug)
                console.log("zhujun: update st data interface call back successed ! ");
        }, function () {
            if (Model.WebServiceBase.isDebug)
                console.log("zhujujn: update st data interface call back failed ! ");
        });
    };
    /**
     * @创建游戏场景.
     */
    Main.prototype.createScene = function () {
        Model.PlayerLocalService.initAllData(); //创建场景之前先初始化数据.
        Model.AudioService.Shared(); //实例化声音控件
        this.mainMenuVM = new ViewModel.MainMenuVM(this, function () {
            if (Model.WebServiceBase.isDebug) {
                console.log("zhujun: main menu vm call back successed !　");
            }
        });
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
