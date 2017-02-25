module Model {
/**
 *
 * @author T.J
 *
 */
export class ShockTools {
    public constructor() {
    }

    static MAP: number = 0;
    static SPRITE: number = 1;
    private mapPoss: Array<any> = [new egret.Point(0,3),new egret.Point(3,2),new egret.Point(-3,-2)];
    private spritePoss: Array<any> = [new egret.Point(5,0),new egret.Point(-5,0),new egret.Point(5,0)];
    private shockPoss: Array<any>;
    private shockLength: number = 0;
    private shockCount: number = 0;
    private target: egret.DisplayObject;
    private rx: number = 0;
    private ry: number = 0;
    private type: number = 0;
    private repeatCount: number = 0;
    private isRunning: boolean = false;

    public destroy(): void {
        this.stop();
        this.target = null;
    }
    
    /**
     * @language zh_CN
     * Shock
     * @param target 震动的对象
     * @param loop 震动次数
     * @param type 震动类型
     */
    public shock(target: egret.DisplayObject,loop?: number,type?: number): void {
        this.setTarget(target);
        this.setType(type);
        this.start(loop);
    }

    public start(num: number = 5): void {
        if(this.isRunning) {
            this.stop();
        }
        this.repeatCount = num;
        this.shockCount = 0;
        if(this.target) {
            this.isRunning = true;
            this.rx = this.target.x;
            this.ry = this.target.y;
            egret.Ticker.getInstance().register(this.onShockEnter,this);
        }
    }

    public stop(): void {
        this.isRunning = false;
        if(this.target) {
            this.target.x = this.rx;
            this.target.y = this.ry;
            egret.Ticker.getInstance().unregister(this.onShockEnter,this);
        }
    }

    public setTarget(target: egret.DisplayObject): void {
        this.target = target;
    }

    public setType(type: number = 0): void {
        this.type = type;
        if(this.type == ShockTools.MAP) {
            this.shockPoss = this.mapPoss.concat();
            this.shockLength = this.shockPoss.length;
        }
        else if(this.type == ShockTools.SPRITE) {
            this.shockPoss = this.spritePoss.concat();
            this.shockLength = this.shockPoss.length;
        }
    }

    private onShockEnter(e: Event): void {
        var maxCount: number = this.shockLength * this.repeatCount;
        if(this.shockCount >= maxCount) {
            this.stop();
            return;
        }
        var index: number = this.shockCount % this.shockLength;
        var pos: egret.Point = this.shockPoss[index];
        if(this.target) {
            this.target.x = this.rx + pos.x;
            this.target.y = this.ry + pos.y;
        }
        this.shockCount++;
    }
}
}