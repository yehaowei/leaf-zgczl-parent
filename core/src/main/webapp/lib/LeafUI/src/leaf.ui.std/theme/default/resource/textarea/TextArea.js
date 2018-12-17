/**
 * @class Leaf.TextArea
 * @extends Leaf.Field
 * <p>TextArea组件.
 * @author njq.niu@hand-china.com
 * @constructor
 * @param {Object} config 配置对象. 
 */
$L.TextArea = Ext.extend($L.Field,{
	constructor: function(config) {
        $L.TextArea.superclass.constructor.call(this, config);        
    },
    initComponent : function(config){
    	$L.TextArea.superclass.initComponent.call(this, config); 		
    },
    initEvents : function(){
    	$L.TextArea.superclass.initEvents.call(this);    	
    },
    initElements : function(){
    	this.el= this.wrap;
    },
    onKeyDown : function(e){}
//    ,setRawValue : function(v){
//        this.el.update(v === null || v === undefined ? '' : v);
//    }
//    ,getRawValue : function(){
//        var v = this.el.dom.innerHTML;
//        if(v === this.emptytext || v === undefined){
//            v = '';
//        }
//        return v;
//    }
})