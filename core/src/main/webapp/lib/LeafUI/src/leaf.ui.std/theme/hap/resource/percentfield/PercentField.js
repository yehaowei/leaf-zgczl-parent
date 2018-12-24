/**
 * @class Leaf.PercentField
 * @extends Leaf.NumberField
 * <p>百分数输入组件.</p>
 * @author huazhen.wu@hand-china.com
 * @constructor
 * @param {Object} config 配置对象. 
 */
$L.PercentField = Ext.extend($L.NumberField,{
    formatValue : function(v){
    	if(Ext.isEmpty(v))return '';
        return $L.PercentField.superclass.formatValue.call(this,$L.FixMath.mul(v,100));
    },
    processValue : function(v){
    	if(Ext.isEmpty(v))return '';
        return $L.FixMath.div($L.PercentField.superclass.processValue.call(this,v),100);
    }
});