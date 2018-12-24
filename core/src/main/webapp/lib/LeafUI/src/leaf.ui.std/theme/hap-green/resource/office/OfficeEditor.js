/**
 * @class Leaf.OfficeEditor
 * @extends Leaf.Component
 * <p>Office编辑组件.
 * @author njq.niu@hand-china.com
 * @constructor
 * @param {Object} config 配置对象. 
 */
$L.OfficeEditor = Ext.extend($L.Component,{
    ExcelSpreadsheet:"Excel.Sheet",
    ExcelChart:"Excel.Chart",
    PowerPoint:"PowerPoint.Show",
    Project:"MSProject.Project",
    VisioDrawing:"Visio.Drawing",
    WordDocument:"Word.Document",
    initComponent : function(config){
        var sf = this;
        $L.OfficeEditor.superclass.initComponent.call(sf, config);
        sf.editor = window[sf.id];
        sf.docType = config.docType||sf.WordDocument;
        sf.saveUrl = config.saveUrl;
        if(config.docUrl) {
            this.processParmater(config.docUrl)
            $L.onReady(function(){
                   sf.open(config.docUrl,config.readOnly,sf.docType);
            });
        }
    },
    processListener: function(ou){
        $L.OfficeEditor.superclass.processListener.call(this,ou);
    },
    initEvents : function(){
        $L.OfficeEditor.superclass.initEvents.call(this);
        
    },
    /**
     * 新建文档
     * @param {String} type
     */
    createNew : function(type){
        this.editor.CreateNew(type||this.docType);
    },
    /**
     * 打开文档
     * @param {String} url
     * @param {boolean} readOnly
     * @param {String} type
     */
    open : function(url,readOnly,type){
        url = window.location.protocol + '//' + window.location.host + "/" + url;
        this.editor.Open(url,readOnly,type||this.docType);
    },
    processParmater:function(url){
        var li = url.indexOf('?')
        if(li!=-1){
            var para = Ext.urlDecode(url.substring(li+1,url.length));
            this.attachment_id = para['attachment_id'];
        }
    },
    save : function(url){
        try{
            var url = url||this.saveUrl;
            url = window.location.protocol + '//' + window.location.host + "/" + url;
            this.editor.HttpInit();
            if(this.attachment_id) this.editor.HttpAddPostString("attachment_id", this.attachment_id);
            this.editor.HttpAddPostCurrFile("File", "test.docx");
            this.editor.HttpPost(url);
        }catch(e){
            alert(e)
        }
    }
})