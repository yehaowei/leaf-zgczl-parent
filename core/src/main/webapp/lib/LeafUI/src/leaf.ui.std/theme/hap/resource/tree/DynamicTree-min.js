$L.DynamicTree=Ext.extend($L.Tree,{initEvents:function(){$L.DynamicTree.superclass.initEvents.call(this);this.addEvents("load")},createTreeNode:function(a){return new $L.DynamicTree.TreeNode(a)}});$L.DynamicTree.TreeNode=Ext.extend($L.Tree.TreeNode,{createNode:function(a){return new $L.DynamicTree.TreeNode(a)},expand:function(){if(this.isRoot()||(this.childNodes.length>0&&this.isLoaded)){if(!this.isRoot()){this.record.set(this.getOwnerTree().expandfield,"Y",true)}this.isExpand=true;this.paintChildren();this.els.child.style.display="block";this.paintIconImg();this.paintClipIcoImg();this.refreshDom()}else{if(!this.isLoaded&&this.getOwnerTree().showSkeleton){var a=this.getOwnerTree();var c=a.dataset;if(this.data.record.isNew){this.isLoaded=true;this.els.icon.className="node-icon icon-node";this.paintClipIcoImg()}else{this.els.icon.className="node-icon icon-loading";var b=c.queryurl+(c.queryurl.indexOf("?")==-1?"?":"&")+"_fetchall=true";$L.request({url:b,para:this.data.record.data,success:function(h){this.isLoaded=true;if(!h.result.record){h.result.record=[]}var f=[].concat(h.result.record);var d=Number.MAX_VALUE;f.sort(function(j,i){return parseFloat(j[a.sequencefield]||d)-parseFloat(i[a.sequencefield]||d)});for(var g=0;g<f.length;g++){var e=c.create(f[g]);e.commit()}$L.DynamicTree.TreeNode.superclass.expand.call(this)},scope:this})}}}},isLeaf:function(){return this.isLoaded?this.childNodes.length===0:false}});