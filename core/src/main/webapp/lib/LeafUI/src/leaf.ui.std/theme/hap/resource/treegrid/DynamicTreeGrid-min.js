$L.DynamicTreeGrid=Ext.extend($L.TreeGrid,{createTree:function(a){return a.showSkeleton?new $L.DynamicTree(a):$L.DynamicTreeGrid.superclass.createTree.call(this,a)},createTreeConfig:function(b,d,e,a,c){var b=$L.DynamicTreeGrid.superclass.createTreeConfig.call(this,b,d,e,a,c);if(!a){return b}b.createTreeNode=function(f){return new $L.DynamicTreeGrid.TreeNode(f)};return b},initTreeLisener:function(a,b){if(a){a.on("render",function(){this.processData();Ext.DomHelper.insertHtml("beforeEnd",this.lb.dom,'<div style="height:17px"></div>')},this);a.on("load",function(d){var c=this.unlockTree.getNodeById(d.id);c.isLoaded=true;c.expand()},this);a.on("expand",function(c,d){this.unlockTree.getNodeById(d.id).expand()},this);a.on("collapse",function(c,d){this.unlockTree.getNodeById(d.id).collapse()},this)}b.on("render",this.processData,this);if(a){b.on("expand",function(c,d){this.lockTree.getNodeById(d.id).expand()},this);b.on("collapse",function(c,d){this.lockTree.getNodeById(d.id).collapse()},this)}}});$L.DynamicTreeGrid.TreeNode=Ext.extend($L.DynamicTree.TreeNode,{createNode:function(a){return new $L.DynamicTreeGrid.TreeNode(a)},createCellEl:function(e){var d=this,b=d.getOwnerTree(),a=b.column,g=a.align,c=d.record,f=d.els[e+"_td"];d.els[e+"_text"]=Ext.DomHelper.insertHtml("afterBegin",d.els[e+"_td"],b.treegrid.createCell(a,c,false));f.dataindex=e;f.atype="grid-cell";f.recordid=c.id;if(g){f.style.textAlign=g}},paintText:function(){},render:function(){$L.DynamicTreeGrid.TreeNode.superclass.render.call(this);var a=this.getOwnerTree();this.setWidth(a.displayfield,a.width)}});$L.DynamicTreeGrid.revision="$Rev$";