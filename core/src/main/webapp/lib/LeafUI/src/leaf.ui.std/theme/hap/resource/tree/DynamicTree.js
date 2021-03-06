/**
 * @class Leaf.DynamicTree
 * @extends Leaf.Tree
 * <p>动态树形组件.
 * @author njq.niu@hand-china.com
 * @constructor
 * @param {Object} config 配置对象. 
 */
$L.DynamicTree = Ext.extend($L.Tree,{
    initEvents:function(){
        $L.DynamicTree.superclass.initEvents.call(this);
        this.addEvents(
        /**
         * @event load
         * tree load事件.
         */
        'load');
    },
    createTreeNode : function(item){
        return new $L.DynamicTree.TreeNode(item);
    }
})
/**
 * @class Leaf.DynamicTree.TreeNode
 * @extends Leaf.Tree.TreeNode
 * <p>动态树节点对象.
 * @author njq.niu@hand-china.com
 * @constructor 
 */
$L.DynamicTree.TreeNode = Ext.extend($L.Tree.TreeNode,{
    createNode : function(item){
        return new $L.DynamicTree.TreeNode(item);
    }, 
    expand : function(){
        if(this.isRoot() || (this.childNodes.length>0 &&　this.isLoaded)){
            if(!this.isRoot())
            this.record.set(this.getOwnerTree().expandfield,"Y",true);
            this.isExpand=true;
            this.paintChildren();
            this.els['child'].style.display='block';
            this.paintIconImg();
            this.paintClipIcoImg();
            this.refreshDom();
        } else if(!this.isLoaded && this.getOwnerTree().showSkeleton){
            var tree = this.getOwnerTree();
            var ds = tree.dataset;
            if(this.data.record.isNew){
                this.isLoaded = true;
                this.els['icon'].className = 'node-icon icon-node';
                this.paintClipIcoImg();
            }else {
                this.els['icon'].className = 'node-icon icon-loading';
                //改成ds的query方法
                var url = ds.queryurl +(ds.queryurl.indexOf('?') == -1?'?':'&') + '_fetchall=true';
                $L.request({
                    url : url,
                    para : this.data.record.data,
                    success : function(res) {
                        this.isLoaded = true;
                        if(!res.result.record) res.result.record = [];
                        var records = [].concat(res.result.record);
//                        if(records.length==0){
//                            this.els['icon'].className = 'node-icon icon-node';
//                            this.paintClipIcoImg();
//                        }
                        var m = Number.MAX_VALUE;
                        records.sort(function(a, b){
                            return parseFloat(a[tree.sequencefield]||m) - parseFloat(b[tree.sequencefield]||m);
                        });
                        for(var i=0;i<records.length;i++){
                            var record = ds.create(records[i]);    
                            record.commit();
                        }
                        $L.DynamicTree.TreeNode.superclass.expand.call(this);
                    },
                    scope : this
                });
            }
        }
        
    },
    isLeaf : function(){
        return this.isLoaded ? this.childNodes.length===0 : false
    }
});