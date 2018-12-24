/**
 * @class Leaf.Label
 * @extends Leaf.Component
 * <p>Label组件.
 * @author njq.niu@hand-china.com
 * @constructor 
 */
$L.Label = Ext.extend($L.Component,{
    onUpdate : function(ds, record, name, value){
    	if(this.binder.ds == ds && this.binder.name == name){
	    	this.updateLabel(record,name,value);
    	}
    },
    /**
     * 绘制Label
     * @param {Leaf.Record} record record对象
     */
    render : function(record){
    	this.record = record;
    	if(this.record) {
			var value = this.record.get(this.binder.name);
			this.updateLabel(this.record,this.binder.name,value);
    	}
    },
    updateLabel: function(record,name,value){
        var rder = $L.getRenderer(this.renderer);
	    if(rder!=null){
    		value = rder.call(window,value,record, name);
	    }
	    this.wrap.update(value);
    }
});