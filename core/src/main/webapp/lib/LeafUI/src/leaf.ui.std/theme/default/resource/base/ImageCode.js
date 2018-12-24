/**
 * @class Leaf.ImageCode
 * @extends Leaf.Component
 * <p>图片验证码组件.
 * @author njq.niu@hand-china.com
 * @constructor 
 */
$L.ImageCode = Ext.extend($L.Component,{
    processListener: function(ou){
        $L.ImageCode.superclass.processListener.call(this,ou);
        this.wrap[ou]("click", this.onClick,  this);
    },
    onClick : function(){
        if(this.enable == true)
    	this.refresh();
    },
    setEnable : function(isEnable){
        if(isEnable == true){
            this.enable = true;
            this.refresh();
        }else{
            this.enable = false;
            this.wrap.dom.src = "";
        }
    },
    /**
     * 重新加载验证码
     * 
     */
    refresh : function(){
        this.wrap.dom.src = "imagecode?r="+Math.random();
    }
});