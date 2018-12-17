/**
 * @class Leaf.DynamicElement
 * @extends Leaf.Component
 * <p>窗口组件.
 * @author njq.niu@hand-china.com
 * @constructor
 * @param {Object} config 配置对象. 
 */
$L.DynamicElement = Ext.extend($L.Component,{
    constructor: function(id) {
        this.cmps = {};
        $L.DynamicElement.superclass.constructor.call(this,{id:id});
    },
    initComponent : function(config){
        $L.DynamicElement.superclass.initComponent.call(this, config);
        var sf = this;
        sf.wrap.cmps = sf.cmps;
        if(sf.url){
            sf.load(sf.url,config.params)
        }
    },
    initEvents : function(){
        $L.DynamicElement.superclass.initEvents.call(this);
        this.addEvents(
        /**
         * @event unload
         * 卸载完毕.
         */
        'unload',
        /**
         * @event load
         * 加载完毕.
         */
        'load');        
    },
    clearBody : function(){
        for(var key in this.cmps){
            var cmp = this.cmps[key];
            if(cmp.destroy){
                try{
                    cmp.destroy();
                }catch(e){
                    alert('DynamicElement卸载失败: ' + e)
                }
            }
        }
    },
    /**
     * 卸载.
     * 
     */
    unload : function(){
        this.clearBody();
        this.fireEvent('unload', this);
    },
    /**
     * 加载.
     * 
     * @param {String} url  加载的url
     * @param {Object} params  加载的参数
     */
    load : function(url,params){
        this.clearBody();     
        Ext.Ajax.request({
            url: url,
            params:params||{},
            success: this.onLoad.createDelegate(this)
        });     
    },
    onLoad : function(response, options){
        var html = response.responseText;
        var res
        try {
            res = Ext.decode(response.responseText);
        }catch(e){}
        if(res && res.success == false){
            if(res.error){
                if(res.error.code  && res.error.code == 'session_expired' || res.error.code == 'login_required'){
                    if($L.manager.fireEvent('timeout', $L.manager))
                    $L.showErrorMessage(_lang['ajax.error'],  _lang['session.expired']);
                }else{
                    $L.manager.fireEvent('ajaxfailed', $L.manager, options.url,options.para,res);
                    var st = res.error.stackTrace;
                    st = (st) ? st.replaceAll('\r\n','</br>') : '';
                    if(res.error.message) {
                        var h = (st=='') ? 150 : 250;
                        $L.showErrorMessage(_lang['window.error'], res.error.message+'</br>'+st,null,400,h);
                    }else{
                        $L.showErrorMessage(_lang['window.error'], st,null,400,250);
                    } 
                }
            }
            return;
        }
        var sf = this;
        sf.wrap.update(html,true,function(){
            sf.fireEvent('load',sf)
        },sf.wrap);
    },
    destroy : function(){
    	var wrap = this.wrap;
        $L.DynamicElement.superclass.destroy.call(this);
    	this.clearBody();
    	wrap.remove();
    }
});