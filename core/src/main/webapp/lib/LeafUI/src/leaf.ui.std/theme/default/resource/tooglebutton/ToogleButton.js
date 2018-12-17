/**
 * @class Leaf.ToogleButton
 * @extends Leaf.Component
 * <p>ToogleButton.
 * @author njq.niu@hand-china.com
 * @constructor
 * @param {Object} config 配置对象. 
 */
$L.ToogleButton = Ext.extend($L.Component,{
	disableCss:'item-btn-disabled',
	disabled:false,
    toogled:false,
    plusText:'&#xe6e3;',
    minusText:'&#xe6c4;',
	initComponent : function(config){
    	$L.ToogleButton.superclass.initComponent.call(this, config);
    	if(this.disabled == true)this.disable();
        var sf = this;
        $L.onReady(function(){
            sf.initToogleEl();
        });
        
    },
    processListener: function(ou){
    	$L.ToogleButton.superclass.processListener.call(this,ou);
    	this.wrap[ou]("click", this.onClick,  this);
    },
    initEvents : function(){
    	$L.ToogleButton.superclass.initEvents.call(this);
    	this.addEvents(
    	/**
         * @event click
         * 鼠标点击事件.
         * @param {Leaf.Button} button 按钮对象.
         * @param {EventObject} e 键盘事件对象.
         */
    	'click');
    },
    destroy : function(){
		$L.ToogleButton.superclass.destroy.call(this);
    	delete this.wrap;
    },
	blur : function(){
    	if(this.disabled) return;
    	this.el.dom.blur();
    },
    disable: function(){
    	this.disabled = true;
    	this.wrap.addClass(this.disableCss);
    },
    enable: function(){
    	this.disabled = false;
    	this.wrap.removeClass(this.disableCss);
    },
    initToogleEl: function(){
        if(this.toogleid){
            var el = Ext.get(this.toogleid);
            if(el){
                el.setStyle('display',this.toogled ? 'block' : 'none')
            }
        }
    },
    onClick: function(e){
    	if(!this.disabled){
        	e.stopEvent();
            this.toogled = !this.toogled;
            this.setText(this.toogled ? this.minusText : this.plusText);
            this.initToogleEl();
        	this.fireEvent("click", this,this.toogled, e);
    	}
    },
    setText : function(text){
    	this.wrap.update(text);
    }
});