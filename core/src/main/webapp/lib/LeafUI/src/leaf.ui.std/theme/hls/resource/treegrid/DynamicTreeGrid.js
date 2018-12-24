/**
 * @class Leaf.DynamicTreeGrid
 * @extends Leaf.TreeGrid
 * <p>树形表格组件.
 * @author njq.niu@hand-china.com
 * @constructor
 * @param {Object} config 配置对象. 
 */
$L.DynamicTreeGrid = Ext.extend($L.TreeGrid, {
    createTree : function(cfg){
        return cfg.showSkeleton ? new $L.DynamicTree(cfg) : $L.DynamicTreeGrid.superclass.createTree.call(this, cfg);    
    },
	createTreeConfig : function(config, columns, id, showSkeleton, grid) {
        var config = $L.DynamicTreeGrid.superclass.createTreeConfig.call(this, config,columns,id,showSkeleton,grid);
        if(!showSkeleton) return config;
		config['createTreeNode']= function(item) {
			return new $L.DynamicTreeGrid.TreeNode(item);
		}
        return config;
	},
    initTreeLisener : function(lockTree,unlockTree){
        if(lockTree){
            lockTree.on('render', function() {
                this.processData();
                Ext.DomHelper.insertHtml("beforeEnd", this.lb.dom,'<div style="height:17px"></div>');
            }, this)
            lockTree.on('load', function(node) {
                var unode = this.unlockTree.getNodeById(node.id)
                unode.isLoaded = true;
                unode.expand();
            }, this);
            lockTree.on('expand', function(tree, node) {
                this.unlockTree.getNodeById(node.id).expand();
            }, this);
            lockTree.on('collapse', function(tree, node) {
                this.unlockTree.getNodeById(node.id).collapse();
            }, this);
        }
        unlockTree.on('render', this.processData, this);
        if(lockTree){
            unlockTree.on('expand', function(tree, node) {
                this.lockTree.getNodeById(node.id).expand();
            }, this);
            unlockTree.on('collapse', function(tree, node) {
                this.lockTree.getNodeById(node.id).collapse();
            }, this);
        }
    }
});
$L.DynamicTreeGrid.TreeNode = Ext.extend($L.DynamicTree.TreeNode, {
	createNode : function(item) {
		return new $L.DynamicTreeGrid.TreeNode(item);
	},
	createCellEl : function(df) {
		var sf = this,tree = sf.getOwnerTree(),
			tc = tree.column,
			align = tc.align,
			r = sf.record,
			td = sf.els[df + '_td'];
		sf.els[df + '_text'] = Ext.DomHelper.insertHtml("afterBegin", sf.els[df + '_td'], tree.treegrid.createCell(tc, r, false));
		td['dataindex'] = df;
		td['atype'] = 'grid-cell';
		td['recordid'] = r.id;
		if (align)
			td.style.textAlign = align;
	},
	paintText : function() {
	},
	render : function() {
		$L.DynamicTreeGrid.TreeNode.superclass.render.call(this);
		var tree = this.getOwnerTree();
		this.setWidth(tree.displayfield, tree.width);
	}
});
$L.DynamicTreeGrid.revision='$Rev: 8415 $';