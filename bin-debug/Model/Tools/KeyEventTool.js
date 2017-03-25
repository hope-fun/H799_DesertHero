//不同设备的键值->查询出统一的键名->根据统一的键名进行业务操作.
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author zhu_jun.
 * @by 2016.10.20.
 * @modify 2017.02.02.
 */
var Model;
(function (Model) {
    var HW = {
        OK: 13,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        PAGEUP: 33,
        PAGEDOWN: 34,
        BACK: 8,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        DEL: 1131
    };
    var ZTE = {
        OK: 13,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        PAGEUP: 301,
        PAGEDOWN: 302,
        BACK: 126,
        LEFT: 271,
        UP: 269,
        RIGHT: 272,
        DOWN: 270,
        VolumeQuiet: 261,
        VolumeUp: 259,
        VolumeDown: 260
    };
    var YX = {
        OK: 273,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        PAGEUP: 120,
        PAGEDOWN: 121,
        BACK: 122,
        LEFT: 29,
        UP: 28,
        RIGHT: 30,
        DOWN: 31,
        F4: 99,
        EXIT: 114
    };
    var DaHua = {
        OK: 273,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        PAGEUP: 372,
        PAGEDOWN: 373,
        BACK: 340,
        LEFT: 3,
        UP: 1,
        RIGHT: 4,
        DOWN: 2,
        EXIT: 339
    };
    var JiuZhou = {
        OK: 13,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        BACK: 283,
        BACKMAIN: 513,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };
    var ChangHong = {
        OK: 13,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        BACK: 27,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        PAGEUP: 33,
        PAGEDOWN: 34
    };
    var GzAndroid = {
        OK: 13,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        BACK: 8,
        RETURN: 640,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        PAGEUP: 33,
        PAGEDOWN: 34
    };
    var GZGD = {
        BACK: 640,
        RETURN: 113,
        BACKMAIN: 114
    };
    var XMBC = {
        BACK: 340,
        RETURN_1: 270,
        RETURN_2: 283,
        RETURN_3: 8,
        BACKMAIN: 513
    };
    /**
     * @湖北广电.
     */
    var HBGD = {
        BACK: 4,
        UP: 19,
        DOWN: 20,
        LEFT: 21,
        RIGHT: 22,
        OK: 23
    };
    var PC = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        OK: 13,
        BACK: 8
    };
    /**
     * @方向枚举定义.
     */
    var Direction;
    (function (Direction) {
        Direction[Direction["LEFT"] = 1] = "LEFT";
        Direction[Direction["RIGHT"] = 2] = "RIGHT";
        Direction[Direction["UP"] = 3] = "UP";
        Direction[Direction["DOWN"] = 4] = "DOWN";
    })(Direction = Model.Direction || (Model.Direction = {}));
    var KeyEventTool = (function () {
        function KeyEventTool() {
            // this = new KeyEventTool();
            document.onkeyup = this.keyUpEvent; //注册按键抬起事件.
            document.onkeydown = this.keyDownEvent; //注册按键按下事件.
        }
        /**
         * @获取按下的键值.
         */
        KeyEventTool.getKeyCode = function (evt) {
            // if (isDebug) console.log("zhujun: get key code is " + evt.keyCode + " evt which is " + evt.which);
            evt = evt != null && evt != undefined ? evt : window.event;
            var keyCode = evt.which != null && evt.which != undefined && evt.which != 0 ? evt.which : evt.keyCode;
            return keyCode;
        };
        /**
         * @根据键值,获得按键名称.
         */
        KeyEventTool.getKeyCodeName = function (keyCode) {
            for (var key in HW) {
                if (HW[key] == keyCode) {
                    return key;
                }
            }
            for (var key in ZTE) {
                if (ZTE[key] == keyCode) {
                    return key;
                }
            }
            for (var key in YX) {
                if (YX[key] == keyCode) {
                    return key;
                }
            }
            for (var key in DaHua) {
                if (DaHua[key] == keyCode) {
                    return key;
                }
            }
            for (var key in JiuZhou) {
                if (JiuZhou[key] == keyCode) {
                    return key;
                }
            }
            for (var key in ChangHong) {
                if (ChangHong[key] == keyCode) {
                    return key;
                }
            }
            for (var key in GzAndroid) {
                if (GzAndroid[key] == keyCode) {
                    return key;
                }
            }
            for (var key in GZGD) {
                if (GZGD[key] == keyCode) {
                    return key;
                }
            }
            for (var key in XMBC) {
                if (XMBC[key] == keyCode) {
                    return key;
                }
            }
            for (var key in HBGD) {
                if (HBGD[key] == keyCode) {
                    return key;
                }
            }
            for (var key in PC) {
                if (PC[key] == keyCode) {
                    return key;
                }
            }
            return "";
        };
        /**
         * @按键抬起事件.
         */
        KeyEventTool.prototype.keyUpEvent = function (evt) {
            // if (isDebug) console.log("zhujun: key up Event! ");
            var keyCode = KeyEventTool.getKeyCode(evt);
            var keyName = KeyEventTool.getKeyCodeName(keyCode);
            switch (keyName) {
                case "UP":
                    KeyEventTool.keyDownStatus.up = false; //仅供位移事件使用，业务那边会监听状态.
                    if (KeyEventTool.onDirectionUp != null)
                        KeyEventTool.onDirectionUp(Direction.UP);
                    break;
                case "DOWN":
                    KeyEventTool.keyDownStatus.down = false;
                    if (KeyEventTool.onDirectionUp != null)
                        KeyEventTool.onDirectionUp(Direction.DOWN);
                    break;
                case "LEFT":
                    KeyEventTool.keyDownStatus.left = false;
                    if (KeyEventTool.onDirectionUp != null)
                        KeyEventTool.onDirectionUp(Direction.LEFT);
                    break;
                case "RIGHT":
                    KeyEventTool.keyDownStatus.right = false;
                    if (KeyEventTool.onDirectionUp != null)
                        KeyEventTool.onDirectionUp(Direction.RIGHT);
                    break;
                case "OK":
                    console.log("OK key is up ! ");
                    KeyEventTool.keyDownStatus.oK = false;
                    break;
                case "BACK":
                    console.log("BACK key is up ! ");
                    KeyEventTool.keyDownStatus.back = false;
                    break;
                default:
                    break;
            }
        };
        /**
         * @按键按下事件.
         */
        KeyEventTool.prototype.keyDownEvent = function (evt) {
            var keyCode = KeyEventTool.getKeyCode(evt);
            var keyName = KeyEventTool.getKeyCodeName(keyCode);
            // console.log("zhujun: evt " + evt.keyCode + " keyCode " + keyCode + " keyName " + keyName);
            switch (keyName) {
                case "UP":
                    // console.log("!KeyEventTool.directionStatus.up " + !KeyEventTool.keyDownStatus.up);
                    if (KeyEventTool.onDirectionDown != null && !KeyEventTool.keyDownStatus.up)
                        KeyEventTool.onDirectionDown(Direction.UP);
                    KeyEventTool.keyDownStatus.up = true;
                    break;
                case "DOWN":
                    if (KeyEventTool.onDirectionDown != null && !KeyEventTool.keyDownStatus.down)
                        KeyEventTool.onDirectionDown(Direction.DOWN);
                    KeyEventTool.keyDownStatus.down = true;
                    break;
                case "LEFT":
                    if (KeyEventTool.onDirectionDown != null && !KeyEventTool.keyDownStatus.left)
                        KeyEventTool.onDirectionDown(Direction.LEFT);
                    KeyEventTool.keyDownStatus.left = true;
                    break;
                case "RIGHT":
                    if (KeyEventTool.onDirectionDown != null && !KeyEventTool.keyDownStatus.right)
                        KeyEventTool.onDirectionDown(Direction.RIGHT);
                    KeyEventTool.keyDownStatus.right = true;
                    break;
                case "OK":
                    // console.log(KeyEventTool.onOK != null);
                    // console.log(KeyEventTool.keyDownStatus.oK);
                    if (KeyEventTool.onOK != null && !KeyEventTool.keyDownStatus.oK) {
                        KeyEventTool.onOK();
                    }
                    KeyEventTool.keyDownStatus.oK = true;
                    break;
                case "BACK":
                    if (KeyEventTool.onBack != null && !KeyEventTool.keyDownStatus.back) {
                        KeyEventTool.onBack();
                    }
                    KeyEventTool.keyDownStatus.back = true;
                    break;
                case "RETURN":
                    break;
                case "BACKMAIN":
                    break;
                case "RETURN_1":
                    break;
                case "RETURN_2":
                    break;
                case "RETURN_3":
                    break;
                case "ZERO":
                    break;
                case "ONE":
                    break;
                case "TWO":
                    break;
                case "THREE":
                    break;
                case "FOUR":
                    break;
                case "FIVE":
                    break;
                case "SIX":
                    break;
                case "SEVEN":
                    break;
                case "EIGHT":
                    break;
                case "NINE":
                    break;
                default:
                    break;
            }
        };
        return KeyEventTool;
    }());
    /**
     * @OK键事件.
     */
    KeyEventTool.onOK = null;
    /**
     * @方向按下事件.
     */
    KeyEventTool.onDirectionDown = null;
    /**
     * @方向键抬起事件.
     */
    KeyEventTool.onDirectionUp = null;
    /**
     * @
     */
    // public static onMenu: Function = null;
    /**
     * @返回键事件.
     */
    KeyEventTool.onBack = null;
    /**
     * @各按键按下状态.
     * @按键按下为true.
     * @按键连按开关.
     */
    KeyEventTool.keyDownStatus = {
        left: false,
        right: false,
        up: false,
        down: false,
        oK: false,
        back: false
    };
    Model.KeyEventTool = KeyEventTool;
    __reflect(KeyEventTool.prototype, "Model.KeyEventTool");
})(Model || (Model = {}));
//# sourceMappingURL=KeyEventTool.js.map