(function(){
	var count=0;
var DRAG_ITEM,
	DRAG_TYPE,
	THEME,
	CURRENT_MENU_VIEW,
	isIE = Ext.isIE,
	isNewIE = Ext.isIE9 || Ext.isIE10 || Ext.isIE11,
	action = false,
	Tip = function(){
		var wrap,
			ready = false,
			isShow = false;
		return {
			init : function(){
				if(!ready){
					ready = true;
					wrap = new Ext.Template('<div class="editor-tip"></div>').insertFirst(Ext.getBody(),{},true);
				}
			},
			show : function(x,y){
				wrap.moveTo(x-this.width()/2,y-this.height()/2).show(!isShow);
				isShow = true;
				return this;
			},
			hide : function(){
				if(isShow){
					wrap.hide({
						callback : function(){
							wrap.moveTo(-10000,-10000);
						}
					});
					isShow = false;
				}
				return this;
			},
			log : function(html){
				wrap.update(html);
				return this;
			},
			width : function(){
				return wrap.getWidth();
			},
			height : function(){
				return wrap.getHeight();
			}
		}
	}(),
	Abstract = Ext.extend(Ext.util.Observable,{
		constructor : function(config){
			var sf = this;
			sf.defaultWidth = 400;
			sf.defaultHeight = 200;
			sf.defaultMinWidth = 150;
			sf.defaultMinHeight = 75;
			sf.isFocus = false;
			Ext.apply(sf,config);
			sf.width = sf.width || sf.defaultWidth;
			sf.height = sf.height || sf.defaultHeight;
			sf.minwidth = sf.minwidth || sf.defaultMinWidth;
			sf.minheight = sf.minheight || sf.defaultMinHeight;
			sf.initComponent(config);
		},
		bind : function(ds){
			this.dataset = ds;
		},
		focus : function(){
			this.wrap.focus();
		},
		blur : function(){
			this.wrap.blur();
		},
		setWidth : function(w){
			var sf = this;
			if(w == sf.width)return;
			sf.width = w;
			sf.wrap.setWidth(w);
			sf.fireEvent('resize',sf);
		},
		getWidth : function(){
			return this.width;
		},
		setMinWidth : function(w){
			var sf = this;
			if(w == sf.minwidth)return;
			sf.minwidth = w;
			if(w > sf.width)
				sf.setWidth(w);
		},
		getMinWidth : function(){
			return this.minwidth;
		},
		setHeight : function(h){
			var sf = this;
			if(h == sf.height)return;
			sf.height = h;
			sf.wrap.setHeight(h);
			sf.fireEvent('resize',sf);
		},
		getHeight : function(){
			return this.height;
		},
		setMinHeight : function(h){
			var sf = this;
			if(h == sf.minheight)return;
			sf.minheight = h;
			if(h > sf.height)
				sf.setHeight(h);
		},
		getMinHeight : function(){
			return this.minheight;
		}
	}),
	Observable = Ext.extend(Abstract,{
		constructor : function(config){
			var sf = this;
			Abstract.prototype.constructor.call(sf,config);
        	sf.initEvents();
        	if(sf.listeners){
	            sf.on(sf.listeners);
	        }
			if(sf.width < sf.getMinWidth()){
				sf.setWidth(sf.getMinWidth());
			}
		},
		initEvents : function(){
	    	this.addEvents(
	    	'resize');
	    	this.processListener('on');
	    },
		processListener : function(ou){
			var sf = this;
			sf.wrap[ou]('focus',sf.onFocus,sf)
				[ou]('blur',sf.onBlur,sf)
				[ou]('click',sf.onClick,sf)
				[ou]('dblclick',sf.onDblClick,sf)
				[ou]('mousedown',sf.onMouseDown,sf)
				[ou]('keydown',sf.onKeyDown,sf);
		},
		onFocus : function(){
			var sf = this;
			if(!sf.isFocus){
				sf.isFocus = true;
				sf.wrap.addClass('editor-focus')
					.on('mousemove',sf.onMouseMove,sf);
			}
		},
		onBlur : function(){
			var sf = this;
			if(sf.isFocus){
				sf.isFocus = false;
				sf.wrap.removeClass('editor-focus')
					.un('mousemove',sf.onMouseMove,sf);
			}
		},
		onMouseMove : function(e){},
		onMouseDown : function(e){
			if(!this.isFocus){
				this.focus();
				e.stopEvent();
			}
		},
		onKeyDown : function(e){
			e.keyCode == 18 &&
				e.stopEvent();
		},
		onDblClick : function(e){},
		onClick : function(e){}
	}),
	dragOverEvent = new Ext.util.Event(),
	dropEvent = new Ext.util.Event(),
	pub={
		Box : function(){
			var startX,endX,
				resizeIndex = -1,
				dropIndex = -1,
				splitComplete = false,
				columnX,
				wrapTplt = [
					'<div tabIndex="0" hideFocus class="layout-table box-editor can-drop editor-wrap empty-box" style="width:{width}px">',
						'<div class="screen-editor-spliter" hideFocus="true"></div>',
						'<div class="editor-outline"></div>',
						'<table cellpadding="0" cellspacing="0" border="0">',
							'<tr>',
							'</tr>',
						'</table>',
					'</div>'
				],
				tdTpl = '<td unselectable="on"  class="box-td-cell {cls}" style="padding:6px"><div unselectable="on" class="box-column-outline"></div></td>',
				proxyTpl = '<div unselectable="on" class="screen-editor-proxy box-proxy editor-wrap"></div>',
				_BoxColumn = Ext.extend(Abstract,{
					initComponent : function(config){
						var sf = this;
						sf.refreshBox();
						sf.proxy = new Ext.Template(proxyTpl).append(sf.wrap,{
							},true).setWidth(sf.width - sf.totalMarginWidth)//.setHeight(sf.height - sf.totalMarginHeight)
						sf.children = [];
					},
					refreshBox : function(){
						var sf = this,
							wrap = sf.wrap,
							table = wrap.parent('table');
						sf.totalMarginWidth = wrap.getPadding('lr') + wrap.getBorderWidth('lr')+table.getBorderWidth('lr'),
						sf.totalMarginHeight = wrap.getPadding('tb') + table.getBorderWidth('tb');
					},
					create : function(type){
						var sf = this,
							owner = sf.owner,
							proxy = sf.proxy,
							tr = proxy.parent('tr'),
							body = tr.parent('table').dom,
							td;
						if(tr = tr.next()){
							td = Ext.get(tr.query('>td')[dropIndex]);
						}else{
							tr = body.insertRow(-1);
							Ext.each(owner.columns,function(col,index,columns){
								var _td = new Ext.Template(tdTpl).append(tr,{
									cls : index == columns.length-1?'box-last-cell':''
								},index == dropIndex);
								if(index == dropIndex){
									td = _td;
								}
							});
						}
						var wrap = proxy.parent('td'),
							obj = new pub[type]({
							wrap:wrap,
							width:wrap.getWidth(true),
							listeners : {
								resize : sf.onChildResize,
								scope:sf
							}
							//height:wrap.getHeight(true)
						});
						proxy.appendTo(td);
						obj.bind(owner.dataset);
						sf.pushChild(obj);
						obj.focus();
						proxy.removeClass('proxy-show');
					},
					pushChild : function(child){
						var sf = this,
							children = sf.children,
							preChild = children[children.length - 1];
						children.push(child);
						if(preChild){
							child.previousSibling = preChild;
							preChild.nextSibling = child;
						}
//						child.column = sf;
//						child.on('resize',sf.onChildResize,sf);
					},
					onChildResize : function(child){
						var sf = this,
							width = child.getWidth(),
							colwidth = sf.getWidth(),
							dt = width+sf.totalMarginWidth - colwidth,
							owner = sf.owner;
						if(dt>0){
							sf.setWidth(colwidth+dt);
							owner.setWidth(owner.getWidth()+dt,true);
						}
					},
					setWidth : function(w){
						var sf = this;
						if(sf.width == w)return;
						if(w < sf.getMinWidth())return;
						sf.width = w;
						sf.proxy.setWidth(w - sf.totalMarginWidth);
					},
					getMinWidth : function(){
						var sf = this,
							minWidth = sf.minwidth;
						Ext.each(sf.children,function(child){
							minWidth = Math.max(child.getWidth(),minWidth);
						});
						return minWidth + sf.totalMarginWidth;
					}
				});
			return Ext.extend(Observable,{
				initComponent : function(config){
					var sf = this,
						wrap = sf.wrap = new Ext.Template(wrapTplt).append(sf.wrap,{
						width:sf.width
					},true);
					sf.isEmpty = true;
					sf.columns = [];
					sf.body = wrap.child('table');
					sf.spliter = wrap.child('.screen-editor-spliter');
					sf.createColumn(sf.width);
				},
				processListener : function(ou){
					var sf = this;
					Observable.prototype.processListener.call(sf,ou);
					dragOverEvent[ou=='on'?'addListener':'removeListener'](sf.onDragOver,sf);
					dropEvent[ou=='on'?'addListener':'removeListener'](sf.onDrop,sf);
				},
				findProxy : function(t){
					var proxy = null;
					if(this.wrap.contains(t)&& (t.is('.screen-editor-proxy')||(t=(t.is('.box-column-outline')?t.next('.screen-editor-proxy'):t.child('.screen-editor-proxy'))))){
						dropIndex = -1;
						Ext.each(this.columns,function(col,index){
							if(col.proxy == t){
								proxy = t;
								dropIndex = index;
								return false;
							}
						});
					}
					return proxy;
				},
				onDragOver : function(e,t){
					t = Ext.get(t);
					var sf = this,
						proxy = sf.findProxy(t);
					if(proxy){
						if(sf.currentProxy){
							sf.currentProxy.removeClass('proxy-show');
						}
						proxy.addClass('proxy-show');
						sf.currentProxy = proxy;
						sf.canCreate = true;
					}else if(sf.canCreate){
						sf.currentProxy.removeClass('proxy-show');
						sf.currentProxy = null;
						sf.canCreate = false;
					}
				},
				onDrop : function(e,t){
					var sf = this;
					if(sf.canCreate){
						var col = sf.columns[dropIndex];
						col.create(DRAG_TYPE);
						sf.canCreate = false;
						if(sf.isEmpty){
							sf.wrap.removeClass('empty-box');
							sf.isEmpty = false;
						}
					}
				},
				createColumn : function(width,index){
					index = index||0;
					var sf = this,td,
						col = sf.columns[index];
					if(col){
						var colwidth = col.getWidth();
						col.setWidth(width);
						width = colwidth - width;
					}
					sf.body.select('>tbody>tr').each(function(tr,trs,i){
						if(col){
							var wrap = Ext.get(tr.query('>td')[index]),
								el = new Ext.Template(tdTpl).insertAfter(wrap,{
							},true);
							if(!col.nextSibling){
								wrap.removeClass('box-last-cell');
								el.addClass('box-last-cell');
								col.refreshBox();
							}
						}else{
							var el = new Ext.Template(tdTpl).append(tr,{
								cls : 'box-last-cell'
							},i == 0);
						}
						if(i == 0){
							td = el;
						}
					});
					sf.addColumn(new _BoxColumn({
						width : width,
						wrap : td,
						owner : sf
					}),index);
				},
				addColumn : function(col,index){
					var sf = this,
						pre = sf.columns[index];
					if(pre){
						sf.columns.splice(index+1,0,col);
						if(pre.nextSibling){
							pre.nextSibling.previousSibling = col;
						}
						col.previousSibling = pre;
						pre.nextSibling = col;
					}else{
						sf.columns.push(col);
					}
				},
				resizeColumn : function(width,index){
					var sf = this,
						col = sf.columns[index],
						next = sf.columns[index+1],
						dt = col.width - width;
					if(next){
						try{
							col.setWidth(width);
							next.setWidth(next.getWidth() + dt);
						}catch(e){}
					}else{
						sf.setWidth(sf.width - dt)
					}
				},
				getMinWidth : function(){
					var sf = this,
						minwidth = 0;
					Ext.each(sf.columns,function(col){
						minwidth += col.getMinWidth();
					});
					return minwidth;
				},
				setWidth : function(w,no){
					var sf = this,
						dt = sf.width - w;
					if(dt == 0)return;
					var col = sf.columns[sf.columns.length - 1];
					if(!no){
						col.setWidth(col.getWidth()-dt);
					}
					Observable.prototype.setWidth.call(sf,w);
					
				},
				onBlur : function(){
					var sf = this;
					if(sf.isFocus){
						sf.isFocus = false;
						sf.wrap.removeClass(['can-split','can-col-resize','editor-focus']);
					}
				},
				onDblClick : function(e){
					var sf = this;
					if(sf.wrap.hasClass('can-col-resize')){
						var col = sf.columns[resizeIndex],						
							next = sf.columns[resizeIndex + 1];
						next &&
							sf.resizeColumn(Math.round((col.width+next.width)/2),resizeIndex);
					}
				},
				onMouseDown : function(e){
					var sf = this,
						wrap = sf.wrap;
					if(sf.isFocus){
						e.stopEvent();
						if(wrap.hasClass('can-split'))
							sf.onSplitStart(e);
						else if(wrap.hasClass('can-col-resize'))
							sf.onColumnResizeStart(e);
					}
					Observable.prototype.onMouseDown.call(this,e);
				},
				onMouseMove : function(e){
					var sf = this;
					sf.isFocus && !action && sf.wrap[sf.canSplit(e)?'addClass':'removeClass']('can-split')
							[sf.canColumnResize(e)?'addClass':'removeClass']('can-col-resize')
				},
				onColumnResizeStart : function(e){
					if(resizeIndex == -1) return;
					var sf = this,
						wrap = sf.wrap,
						x = e.xy[0],
						xy = wrap.getXY(),
						wrapH = wrap.getHeight(),
						y = xy[1];
					columnX = 0;
					Ext.each(sf.columns,function(col,index){
						if(index == resizeIndex){
							return false;
						}else{
							columnX += col.getWidth();
						}
					});	
					endX = startX = x - xy[0] + 1; 
					sf.spliter
						.setXY([x,y])
						.setHeight(wrapH);
					Ext.getBody().on('mousemove',sf.onColumnResizeMove,sf)
						.on('mouseup',sf.onColumnResizeEnd,sf);
					action = true;
				},
				onColumnResizeMove : function(e){
					var sf = this,
						xy = sf.wrap.getXY(),
						_x = xy[0],
						col = sf.columns[resizeIndex],
						next = sf.columns[resizeIndex+1],
						colminwidth = col.getMinWidth();
					endX = e.xy[0] - _x + 1; 
					if(e.ctrlKey || e.altKey){
						endX-=endX%((e.ctrlKey?5:1)*(e.altKey?10:1));
					}
					if(endX < columnX + colminwidth){
						endX = columnX + colminwidth;
					}
					if(next){
						colminwidth = next.getMinWidth();
						if(endX > columnX + col.width + next.width - colminwidth){
							endX = columnX + col.width + next.width - colminwidth;
						}
					}
					sf.spliter.setX(endX + _x - 1);
					Tip.log('X:'+endX).show(xy[0]+endX,xy[1]+sf.height/2);
				},
				onColumnResizeEnd : function(e){
					var sf = this;
					if(endX != startX){
						sf.resize(endX);
					}
					sf.spliter.setXY([-10000,-10000]);
					Ext.getBody().un('mousemove',sf.onColumnResizeMove,sf)
						.un('mouseup',sf.onColumnResizeEnd,sf);
					action = false;
					Tip.hide();
				},
				onSplitStart : function(e){
					var sf = this,
						wrap = sf.wrap,
						x = e.xy[0],
						xy = wrap.getXY(),
						y = xy[1],
						height = e.xy[1] - y;
					startX = x - xy[0] + 1; 
					sf.spliter.setXY([x,y]).setHeight(height);
					Ext.getBody().on('mousemove',sf.onSplitMove,sf)
						.on('mouseup',sf.onSplitEnd,sf);
					action = true;
				},
				onSplitMove : function(e){
					var wrap = this.wrap,
						height = e.xy[1] - wrap.getXY()[1],
						wrapH = wrap.getHeight();
					if(splitComplete = height >= wrapH){
						height = wrapH;
					}
					this.spliter.setHeight(height);
				},
				onSplitEnd : function(e){
					var  sf = this;
					Ext.getBody().un('mousemove',sf.onSplitMove,sf)
						.un('mouseup',sf.onSplitEnd,sf);
					if(splitComplete){
						sf.split(startX);
					}
					sf.spliter
						.setXY([-10000,-10000])
					action = false;
					splitComplete = false;
				},
				resize : function(x){
					var sf = this;
					Ext.each(sf.columns,function(col,index){
						if(index == resizeIndex){
							sf.resizeColumn(x,index);
							return false;
						}else{
							x-=col.width;
						}
					});
				},
				split : function(x){
					var sf = this;
					Ext.each(sf.columns,function(col,index){
						if(col.width > x){
							sf.createColumn(x,index);
							return false;
						}else{
							x-=col.width;
						}
					});
				},
				canSplit : function(e){
					var sf = this,
						columns = sf.columns,
						wrap = sf.wrap,
						w = wrap.getWidth(),
						xy = wrap.getXY(),
						x = e.xy[0] - xy[0],
						ret = false,
						first = columns[0];
					if(x > first.getMinWidth()){
						w=0;
						Ext.each(columns,function(col,index){
							w += col.width;
							var next = columns[index + 1];
							if(x < w - col.minwidth - col.totalMarginWidth){
								ret = true;
								return false;
							}else if(next && x > w + next.getMinWidth()){
								ret = true;
							}else{
								return ret = false;
							}
						});
					}
					return ret;
				},
				canColumnResize : function(e){
			        var sf = this,
			        	v = 0,      
			            xy = sf.wrap.getXY(),
						x = e.xy[0] - xy[0],
						ret = false;
			        resizeIndex = -1;
			        Ext.each(sf.columns,function(col,index){
			            v += col.width;
			            if(x < v+5 && x > v-5){
			                ret = true;
			                resizeIndex = index;
			                return false;
			            }
			        });
			        return ret;
			    }
			});
		}(),
		Grid : function(){
			var defaultColumnMinWidth = 30,
				navbarHeight = 26,
				splitComplete = false,
				resizeIndex = -1,
				dropIndex = -1,
				dropInLock = false,
				highlightLeft,
				highlightRight,
		 		tempdiv = Ext.get(document.createElement('div')),
		 		wrapTpl = [
					'<div tabIndex="0" hideFocus class="grid-editor editor-wrap can-not-drop" style="width:{width}px">',
						'<div class="screen-editor-spliter" hideFocus="true"></div>',
						'<div class="editor-outline"></div>',
						'<table class="item-grid-wrap" cellpadding="0" cellspacing="0" border="0">',
							'{toolbar}',
							'<tr>',
								'<td class="layout-td-cell">',
									'<div class="item-grid" style="height:{height}px">',
										'<DIV class="grid-la" unselectable="on" style="width:0;display:none">',
											'<DIV class="grid-lh" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;text-align:left;height:25px;">',
												'<table cellspacing="0" atype="grid.lht" cellpadding="0" border="0">',
													'<tr class="grid-hl">',
													'</tr>',
													'<tr height="25">',
													'</tr>',
												'</table>',
											'</DIV>',
										'</DIV>',
										'<DIV class="grid-ua" unselectable="on" style="width:{unlockwidth}px;">',
											'<DIV class="grid-uh" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;text-align:left;height:25px;">',
												'<table cellspacing="0" atype="grid.uht" cellpadding="0" border="0">',
													'<tr class="grid-hl">',
														'<th atype="fixed-cell" width="34"> </th>',
													'</tr>',
													'<tr height="25">',
													'</tr>',
												'</table>',
											'</DIV>',
										'</DIV>',
										'<DIV style="clear:both;"></DIV>',
									'</div>',
								'</td>',
							'</tr>',
							'<tr>',
								'<td>',
									'<div class="item-toolbar grid-navbar">',
										'<div class="navbar-{theme}"></div>',
									'</div>',
								'</td>',
							'</tr>',
						'</table>',
					'</div>'
				],
				headTpl = '<th style="width:{width}px"></th>',
				promptTpl = '<td unselectable="on" class="grid-hc" atype="grid.head"><div unselectable="on">&#160;</div></td>'
				editorTpl = '<div class="grid-editor-input item-tf item-wrap"><input class="item-textField" autocomplete="off" type="input" tabIndex="-1"></input></div>';
			return Ext.extend(Observable,{
				initComponent : function(config){
					var sf = this,
						wrap = sf.wrap = new Ext.Template(wrapTpl).append(sf.wrap,{
							width:sf.width,
							height:sf.height - 2 - navbarHeight,
							unlockwidth:sf.width - 2,
							theme:THEME
						},true),
						wb = sf.wb = wrap.child('.item-grid'),
        				editor = sf.editor = new Ext.Template(editorTpl).insertAfter(wrap,{},true);
					sf.ua = wb.child('.grid-ua');
					sf.uh = wb.child('.grid-uh');
					sf.la = wb.child('.grid-la');
					sf.lh = wb.child('.grid-lh');
        			sf.spliter = wrap.child('.screen-editor-spliter');
        			sf.outline = wrap.child('.editor-outline');
        			editor.el = editor.child('input').on('focus',sf.focusEditor,sf);
					sf.lockcolumns = [];
					sf.unlockcolumns = [];
					sf.lockwidth = sf.unlockwidth = 0;
				},
				createColumn : function(width){
					var sf = this,
						uhl = sf.uh.child('.grid-hl'),
						col;
					sf.unlockcolumns.push(col={
						width:width,
						hl : new Ext.Template(headTpl).append(uhl,{
							width:width
						},true),
						promptEl : new Ext.Template(promptTpl).append(uhl.next(),{},true),
						prompt : '',
						lock : false
					});
					uhl.child('[atype=fixed-cell]').appendTo(uhl);
					sf.syncColumnSize();
					sf.showEditor(col);
				},
				removeColumn : function(col,deep){
					var sf = this,
						lock = col.lock,
						columns = lock?sf.lockcolumns:sf.unlockcolumns,
				 		index = columns.indexOf(col);
			        index != -1 &&
			            columns.splice(index, 1);
			        if(deep){
			        	col.promptEl.remove();
				        col.hl.remove();
			        }else{
				        col.promptEl.appendTo(tempdiv);
				        col.hl.appendTo(tempdiv);
			        }
			        sf.syncColumnSize(lock);
			        return index;
				},
				addColumn : function(col,index){
					var sf = this,
						lock = col.lock,
						columns = lock?sf.lockcolumns:sf.unlockcolumns,
						hl = sf[lock?'lh':'uh'].child('.grid-hl'),
						promptEl = hl.next(),
						length = hl.query('>[atype!=fixed-cell]').length;
					columns.splice(index, 0 , col);
			        sf.syncColumnSize(lock);
			        if(index == length||index ==-1||Ext.isEmpty(index)){
			        	col.hl.appendTo(hl);
						col.promptEl.appendTo(promptEl);
						if(!lock){
							var uhl = sf.uh.child('.grid-hl');
							uhl.child('[atype=fixed-cell]').appendTo(uhl);
						}
			        }else{
			        	col.hl.insertBefore(hl.select('>*').item(index));
						col.promptEl.insertBefore(promptEl.select('>*').item(index));
			        }
				},
				syncColumnSize : function(islock){
					var sf = this,w = 0;
					if(islock){
						Ext.each(sf.lockcolumns,function(col){
							w+=col.width;
						});
						if(w == 0){
							sf.la.setWidth(0).setStyle({display:'none'});
						}else{
							sf.la.setWidth(++w);
						}
						sf.lockwidth = w
						sf.ua.setWidth(sf.width - w - 2);
					}else{
						Ext.each(sf.unlockcolumns,function(col){
							w+=col.width;
						});
						sf.unlockwidth = w;
					}
					sf.uh.setWidth(Math.max(sf.width - sf.lockwidth - 2,sf.unlockwidth))
						.child('[atype=grid.uht]')
						.setWidth(sf.unlockwidth+34);
				},
				getColumns : function(){
					return this.lockcolumns.concat(this.unlockcolumns);
				},
				showEditor : function(col){
					var sf = this;
					sf.bindEditor(col);
					sf.editor.el.on('keydown',sf.onEditorKeyDown,sf)
						.on('blur',sf.hideEditor,sf).focus();
				},
				showEditorBy : function(isShift){
					var sf = this,
						columns = sf.getColumns(),
						col = sf.editor.column;
					sf.updatePrompt(col);
					(col = columns[columns.indexOf(col)+(isShift?-1:1)])?
						sf.bindEditor(col):sf.hideEditor();
				},
				bindEditor : function(col){
					if(!col)return;
					var sf = this,
						el = col.promptEl,
						ed = sf.editor;
					sf.focusColumn(col);
					ed.el.dom.value = col.prompt;
					(ed.setXY(el.getXY())
						.setWidth(el.getWidth())).column = col;
				},
				focusEditor : function(){
					this.wrap.addClass('editor-focus');
				},
				hideEditor : function(){
					var sf = this,
						ed = sf.editor,
						col = ed.column;
					sf.updatePrompt(col);
					ed.setXY([-1000,-1000]);
					ed.el.un('keydown',sf.onEditorKeyDown,sf)
						.un('blur',sf.hideEditor,sf).blur();
					!sf.isFocus && sf.wrap.removeClass('editor-focus');
				},
				updatePrompt : function(col){
					col.promptEl.child('div').update(col.prompt = this.editor.el.dom.value);
				},
				focusColumn : function(col){
					var sf = this,
			            ua = sf.ua,
			            sleft = ua.getScroll().left,
			            ll = 0, tw = 0, lw = 0 , lr;
			        Ext.each(sf.getColumns(),function(c){
			            if(c == col) {
			                tw = c.width;
			            }
			            if(c.hidden !== true){
			                if(c.lock === true){
			                    lw += c.width;
			                }else{
			                    if(tw==0) ll += c.width;
			                }
			            }
			        });
			        lr = ll + tw;
			        if(ll<sleft){
			            ua.scrollTo('left',ll);
			        }else if((lr-sleft)>(sf.width-lw)){
			            ua.scrollTo('left',lr  - sf.width + lw + (ua.dom.scrollHeight > ua.dom.clientHeight? 16 : 0));
			        }
				},
				setWidth : function(w){
					var sf = this;
        			if(sf.width == w) return;
					Observable.prototype.setWidth.call(sf,w);
					sf.syncColumnSize(true);
				},
				setHeight : function(h){
					var sf = this;
        			if(sf.height == h) return;
        			sf.height = h;
        			sf.wb.setHeight(h-2-navbarHeight);
				},
				getMinWidth : function(){
					var sf = this;
					return sf.lockwidth+Observable.prototype.getMinWidth.call(sf);
				},
				highlightColumn : function(columns,index){
					this.unhighlightColumn();	
					highlightLeft = columns[index-1];
					highlightRight = columns[index];
					highlightLeft && highlightLeft.promptEl.addClass('grid-highligh-hc');
					highlightRight && highlightRight.promptEl.addClass('grid-highligh-r-hc');
				},
				unhighlightColumn : function(){
					highlightLeft && highlightLeft.promptEl.removeClass('grid-highligh-hc');
					highlightRight && highlightRight.promptEl.removeClass('grid-highligh-r-hc');
					highlightLeft = highlightRight = null;
				},
				onEditorKeyDown : function(e){
					var sf = this,keyCode = e.keyCode;
					if(keyCode == 9 || keyCode == 13){
						sf.showEditorBy(e.shiftKey);
						e.stopEvent();
					}
				},
				onEditorBlur : function(e,t){
			        var sf = this,ced = sf.editor.el;
			        if(ced != Ext.get(t)) {  
			            sf.hideEditor();
			        }
			    },
				onClick : function(e,t){
					t = Ext.get(t);
					if(t.hasClass('grid-hc')||(t = t.parent('.grid-hc'))){
						var sf = this;
						Ext.each(sf.getColumns(),function(col){
							if(col.promptEl == t){
								sf.showEditor(col);
								return false;
							}
						})
					}
				},
				onMouseDown : function(e,t){
					var sf = this,
						wrap = sf.wrap;
					if(sf.wrap.hasClass('editor-focus')){
						e.stopEvent();
						t = Ext.fly(t);
						if(wrap.hasClass('can-resize'))
							sf.onResizeStart(e);
						else if(wrap.hasClass('can-split'))
							sf.onSplitStart(e);
						else if(wrap.hasClass('can-col-resize'))
							sf.onColumnResizeStart(e);
						else if(t.is('.grid-hc')||(t = t.parent('.grid-hc')))
							sf.onColumnDragStart(e,t);
					}
					Observable.prototype.onMouseDown.call(this,e);
				},
				onMouseMove : function(e){
					var sf = this,wrap = sf.wrap;
					sf.isFocus && !action && (sf.canResize(e)?wrap.addClass('can-resize'):wrap.removeClass('can-resize')[sf.canSplit(e)?'addClass':'removeClass']('can-split')
							[sf.canColumnResize(e)?'addClass':'removeClass']('can-col-resize'));
				},
				onBlur : function(){
					var sf = this;
					if(sf.isFocus){
						sf.isFocus = false;
						sf.wrap.removeClass(['can-split','can-col-resize','editor-focus','can-resize']);
					}
				},
				onResizeStart : function(e){
					var sf = this;
					action = e.xy;
					sf.outline.setStyle({
						zIndex : 1,
						width : sf.width+'px',
						height : sf.height+'px'
					});
					Ext.getBody().on('mousemove',sf.onResizeMove,sf)
						.on('mouseup',sf.onResizeEnd,sf);
				},
				onResizeMove : function(e){
					var sf = this,
						wrap = sf.wrap,
						xy = wrap.getXY(),
						dx = e.xy[0] - action[0],
						dy = e.xy[1] - action[1],
						w = Math.max(sf.width+dx,sf.getMinWidth()),
						h = Math.max(sf.height+dy,sf.getMinHeight());
					if(e.ctrlKey || e.altKey){
						w-=w%((e.ctrlKey?5:1)*(e.altKey?10:1));
						h-=h%((e.ctrlKey?5:1)*(e.altKey?10:1));
					}
					sf.outline.setStyle({
						width : w+'px',
						height : h+'px'
					});
					Tip.log('W:'+w+' H:'+h).show(xy[0]+w/2,xy[1]+h+Tip.height());
				},
				onResizeEnd : function(e){
					var sf = this,
						ol = sf.outline.dom.style;
					sf.setWidth(parseInt(ol.width));
					sf.setHeight(parseInt(ol.height));
					ol.cssText="";
					action = false;
					Tip.hide();
					Ext.getBody().un('mousemove',sf.onResizeMove,sf)
						.un('mouseup',sf.onResizeEnd,sf);
				},
				onColumnDragStart : function(e,t){
					var sf = this;
					action = e.xy;
					DRAG_ITEM = sf.getColumns()[sf.wb.select('.grid-hc').indexOf(t)];
					Ext.getBody().on('mousemove',sf.onColumnDragMove,sf)
						.on('mouseup',sf.onColumnDragEnd,sf);
				},
				onColumnDragMove : function(e){
					var sf = this,
						wrap = sf.wrap;
					if(e.xy[0] != action[0] && e.xy[1] != action[1]){//chrome bug fixed
						Ext.getBody().addClass('screen-editor-grid-no-drop');
						if(sf.canDrop(e)){
							wrap.addClass('grid-can-drop')
								.removeClass('grid-can-not-drop');
							sf.highlightColumn(dropInLock?sf.lockcolumns:sf.unlockcolumns,dropIndex);
						}else{
							sf.unhighlightColumn();
							wrap.addClass('grid-can-not-drop');
						}
					}
				},
				onColumnDragEnd : function(e,t){
					var sf = this;
					dropIndex != -1 && sf.drop();
					action = false;
					DRAG_ITEM = null;
					dropIndex = -1;
					sf.wrap.removeClass(['grid-can-drop','grid-can-not-drop']);
					sf.unhighlightColumn();
					Ext.getBody().removeClass('screen-editor-grid-no-drop').un('mousemove',sf.onColumnDragMove,sf)
						.un('mouseup',sf.onColumnDragEnd,sf);
				},
				drop : function(){
					var sf = this,
						index = sf.removeColumn(DRAG_ITEM);
					if(DRAG_ITEM.lock == dropInLock && index<dropIndex){
						dropIndex--;
					}
					DRAG_ITEM.lock = dropInLock;
					sf.addColumn(DRAG_ITEM,dropIndex);
				},
				onSplitStart : function(e){
					var sf = this,
						wrap = sf.wrap,
						x = e.xy[0],
						xy = wrap.getXY(),
						y = xy[1],
						height = e.xy[1] - y;
					startX = x - xy[0] + 1; 
					sf.spliter.setXY([x,y]).setHeight(height);
					Ext.getBody().on('mousemove',sf.onSplitMove,sf)
						.on('mouseup',sf.onSplitEnd,sf);
					action = true;
				},
				onSplitMove : function(e){
					var wrap = this.wrap,
						height = e.xy[1] - wrap.getXY()[1],
						wrapH = wrap.getHeight();
					if(splitComplete = height >= wrapH){
						height = wrapH;
					}
					this.spliter.setHeight(height);
				},
				onSplitEnd : function(e){
					var  sf = this;
					Ext.getBody().un('mousemove',sf.onSplitMove,sf)
						.un('mouseup',sf.onSplitEnd,sf);
					splitComplete &&
						sf.split(startX);
					sf.spliter.setXY([-10000,-10000]);
					action = splitComplete = false;
				},
				onColumnResizeStart : function(e){
					if(resizeIndex == -1) return;
					var sf = this,
						wb = sf.wb,
						x = e.xy[0],
						xy = wb.getXY(),
						wrapH = wb.getHeight(),
						y = xy[1];
					columnX = 0;
					Ext.each(sf.getColumns(),function(col,index){
						if(index == resizeIndex){
							return false;
						}else{
							columnX += col.width;
						}
					});	
					endX = startX = x - xy[0] + 1; 
					sf.spliter
						.setXY([x,y])
						.setHeight(wrapH);
					Ext.getBody().on('mousemove',sf.onColumnResizeMove,sf)
						.on('mouseup',sf.onColumnResizeEnd,sf);
					action = true;
				},
				onColumnResizeMove : function(e){
					var sf = this,
						wb = sf.wb,
						xy = wb.getXY(),
						_x = xy[0],
						columns = sf.getColumns(),
						col = columns[resizeIndex];
					endX = e.xy[0] - _x + 1; 
					if(e.ctrlKey || e.altKey){
						endX-=endX%((e.ctrlKey?5:1)*(e.altKey?10:1));
					}
					if(endX < columnX + defaultColumnMinWidth){
						endX = columnX + defaultColumnMinWidth;
					}
					sf.spliter.setX(endX + _x - 1);
					Tip.log('W:'+(endX+sf.ua.getScroll().left)).show(endX + _x - 1,xy[1]+wb.getHeight()/2);
				},
				onColumnResizeEnd : function(e){
					var sf = this;
					if(endX != startX){
						sf.resizeColumn(endX + sf.ua.getScroll().left);
					}
					sf.spliter.setXY([-10000,-10000]);
					Ext.getBody().un('mousemove',sf.onColumnResizeMove,sf)
						.un('mouseup',sf.onColumnResizeEnd,sf);
					action = false;
					Tip.hide();
				},
				resizeColumn : function(x){
					var sf = this;
					Ext.each(sf.getColumns(),function(col,index){
						if(index == resizeIndex){
							col.hl.setWidth(col.width = x);
							sf.syncColumnSize(col.lock);
							return false;
						}else{
							x-=col.width;
						}
					});
				},
				split : function(x){
					var sf = this,
						w = 0;
					Ext.each(sf.getColumns(),function(col,index){
						w+=col.width;
					});
					sf.createColumn(x - w);
				},
				showLockArea : function(){
					var sf=this;
					sf.lockcolumns.push(DRAG_ITEM);
					sf.la.setStyle({display:''});
					sf.syncColumnSize(true);
					sf.lockcolumns=[];
					sf.isShowLockArea = true;
				},
				hideLockArea : function(){
					var sf=this;
					if(sf.isShowLockArea){
						sf.la.setStyle({display:'none'});
						sf.syncColumnSize(true);
						sf.isShowLockArea = false;
					}
				},
				canResize : function(e){
					var sf = this,
						xy = e.xy,
						_xy = sf.wrap.getXY();
					if(xy[0]-_xy[0]>sf.width-15 &&xy[1]-_xy[1]>sf.height-15)
						return true;
					return false;
				},
				canDrop : function(e){
					var sf = this,
						wrap = sf.wrap,
						x = e.xy[0] - wrap.getXY()[0]
						columns = sf.getColumns(),
						lockcolumns = sf.lockcolumns,
						dragIndex = columns.indexOf(DRAG_ITEM),
						ret = false;
						w = 0;
					dropIndex = -1;
					if(x < 0){
						if(!lockcolumns.length){
							sf.showLockArea();
						}else if(DRAG_ITEM == columns[0]){
							return ret;
						}
						dropIndex = 0;
						dropInLock = true;
						ret  = true;
					}else{
						if(!lockcolumns.length){
							sf.hideLockArea();
						}
						dropInLock = x<sf.lockwidth;
						Ext.each(columns,function(col,index){
							w += col.width/2;
							if(x < w){
								dropIndex = index;
								ret  = true;
								return false;
							}
							w += col.width/2;
						});
						if(!ret){
							dropIndex = columns.length;
							ret = true;
						}
						if(DRAG_ITEM.lock == dropInLock && ( dragIndex == dropIndex || dragIndex == dropIndex-1)){
							ret = false;
							dropIndex = -1;
						}
						if(ret){
							if(dropIndex<lockcolumns.length){
								dropInLock = true;
							}else if(dropIndex>lockcolumns.length||!dropInLock){
								dropIndex-=lockcolumns.length;
								dropInLock = false;
							}
						}
					}
					return ret;
				},
				canSplit : function(e){
					var sf = this,
						wrap = sf.wrap,
						w = wrap.getWidth(),
						x = e.xy[0] - wrap.getXY()[0],
						ret = false;
					if(x > defaultColumnMinWidth){
						ret = true;
						w=0;
						Ext.each(sf.getColumns(),function(col,index){
							w += col.width;
							if(x > w + defaultColumnMinWidth){
								ret = true;
							}else{
								return ret = false;
							}
						});
					}
					return ret;
				},
				canColumnResize : function(e){
					var sf = this,
						t = e.target;
					if(!sf.uh.contains(t)&&!sf.lh.contains(t))return false;
					var v = -sf.ua.getScroll().left,      
			            xy = sf.wb.getXY(),
						x = e.xy[0] - xy[0],
						ret = false;
			        resizeIndex = -1;
			        Ext.each(sf.getColumns(),function(col,index){
			            v += col.width;
			            if(x < v+5 && x > v-5){
			                ret = true;
			                resizeIndex = index;
			                return false;
			            }
			        });
			        return ret;
				}
			});
		}(),
		Tab : function(){
			var wrapTpl = ['<TABLE cellSpacing="0" cellPadding="0" border="0" class="item-tab" style="width:{width}px;height:{height}px;">',
				'<TBODY>',
					'<TR>',
						'<TD>',
						'<DIV atype="scroll-left" class="tab-scroll tab-scroll-left scroll-disabled" style="display:${display}"></DIV>',
						'<DIV class="item-tab-strip" style="overflow:hidden;width:${headwidth}px">',
							'<DIV atype="tab.strips" style="width:${stripswidth}px;height:26px;border-bottom:1px solid #cccccc">${strips}</DIV>',
						'</DIV>',
						'<DIV atype="scroll-right" class="tab-scroll tab-scroll-right" style="display:${display}"></DIV>',
						'</TD>',
					'</TR>',
					'<TR>',
						'<TD>',
							'<div class="item-tab-body" style="width:${bodywidth}px;height:${bodyheight}px;">',
							'</div>',
						'</TD>',
					'</TR>',
				'</TBODY>',
			'</TABLE>'];
			return Ext.extend(Observable,{
				initComponent : function(config){
					var sf = this,
						wrap = sf.wrap = new Ext.Template(wrapTpl).append(sf.wrap,{
							width:sf.width,
							height:sf.height
						},true);
				}
			});
		}()
	};
$L.ScreenEditor = Ext.extend($L.Component, {
	constructor : function(config){
		var sf = this;
		THEME = config.theme;
		sf.children = [];
		Tip.init();
		$L.ScreenEditor.superclass.constructor.call(sf, config);
		sf.resolutionslider.setValue(sf.screenresolution);
	},
	initComponent : function(config) {
		var sf = this;
		$L.ScreenEditor.superclass.initComponent.call(sf, config);
		sf.editorItemList = sf.wrap.child('.screen-editor-item-list');
		sf.screenBody = (sf.screenWrap = sf.wrap.child('.screen-editor-screen-wrap')).child('.screen-body');
		sf.proxy = sf.wrap.child('.screen-editor-proxy');
		sf.menubar = sf.wrap.child('.editor-menubar');
		Ext.isIE && Ext.getBody().addClass('old-ie');
		sf.resolutionslider = $(sf.id+'_slider');
	},
	processListener : function(ou){
		var sf = this;
		$L.ScreenEditor.superclass.processListener.call(sf, ou);
		sf.resolutionslider[ou]('change',sf.onResolutionChange,sf);
		sf.editorItemList[ou]('mousedown',sf.onItemListMouseDown,sf);
		sf.menubar[ou]('click',sf.onMenuClick,sf);
		dragOverEvent[ou=='on'?'addListener':'removeListener'](sf.onDragOver,sf);
		dropEvent[ou=='on'?'addListener':'removeListener'](sf.onDrop,sf);
	},
	initEvents : function(){
    	this.addEvents(
    	/**
         * @event drop
         * 组件放入事件.
         * @param {Component} this 当前组件.
         * @param {EventObject} e 鼠标事件对象.
         */
    	'drop');
    	this.processListener('on');
    },
    onMenuClick : function(e,t){
    	t = Ext.fly(t);
    	if(t.hasClass('ico-menu-collapse')){
		   	CURRENT_MENU_VIEW.setStyle({
    			display:''
    		})
    		.parent('.editor-menu-button')
    		.removeClass('selected');
    	}else if((t.hasClass('editor-menu-button')||(t=t.parent('.editor-menu-button')))&&!t.hasClass('selected')){
    		CURRENT_MENU_VIEW && CURRENT_MENU_VIEW.setStyle({
    			display:''
    		})
    		.parent('.editor-menu-button')
    		.removeClass('selected');
    		if(CURRENT_MENU_VIEW = t.child('.editor-menu-view')){
	    		t.addClass('selected');
	    		CURRENT_MENU_VIEW.setStyle({
	    			display:'block'
	    		});
    		}
    	}
    },
    onResolutionChange : function(slider,v){
    	this.setScreenSize(v);
    },
    onDragOver : function(e,t){
    	var sf = this;
		t = Ext.get(t);
		if(t.is('.can-drop')||t == sf.proxy||t == sf.proxy.parent('td')||sf.proxy.contains(t)){
			if(!sf.canCreate){
				sf.proxy.addClass('proxy-show');
				sf.canCreate = true;
			}
		}else if(sf.canCreate){
			sf.proxy.removeClass('proxy-show');
			sf.canCreate = false;
		}
    },
    onDrop : function(e,t){
    	var sf = this;
		if(sf.canCreate){
			sf.create(DRAG_TYPE);
			sf.canCreate = false;
		}
    },
	onItemListMouseDown : function(e,t){
		var sf = this;
		t = DRAG_ITEM = Ext.get(t);
		if(t.is('.screen-editor-item')){
			DRAG_TYPE = t.getAttributeNS('','atype');
			Ext.fly(document).on('mouseup',sf.onItemListMouseUp,sf)
				.on('mousemove',sf.onItemListMouseMove,sf);
			Ext.getBody().addClass('screen-editor-item-no-drop');
		}
	},
	onItemListMouseMove : function(e,t){
		dragOverEvent.fire(e,t);
	},
	onItemListMouseUp : function(e,t){
		var sf = this;
		dropEvent.fire(e,t);
		Ext.fly(document).un('mouseup',sf.onItemListMouseUp,sf)
			.un('mousemove',sf.onItemListMouseMove,sf);
		Ext.getBody().removeClass('screen-editor-item-no-drop');
		DRAG_ITEM = DRAG_TYPE = null;
	},
	create : function(type){
		var sf = this,
			body = sf.screenBody.dom,
			proxy = sf.proxy,
			td = Ext.get(body.insertRow(body.rows.length-1).insertCell(-1)),
			obj = new pub[type]({
				wrap:td,
				width:proxy.getWidth()
			});
		td.setStyle({padding:'3px'});
		obj.bind(sf.dataset);
		sf.pushChild(obj);
		obj.focus();
		sf.proxy.removeClass('proxy-show');
	},
	pushChild : function(child){
		var children = this.children,
			preChild = children[children.length - 1];
		children.push(child);
		if(preChild){
			child.previousSibling = preChild;
			preChild.nextSibling = child;
		}
	},
	setScreenSize : function(size){
		var wh = size.split('*');
		this.screenWrap.setStyle({
			width : wh[0] - 20 + 'px',
			height : wh[1] - 10 + 'px'
		});
	}
});
$L.SliderBar = Ext.extend($L.Component, {
	initComponent : function(config){
		var sf = this;
		$L.SliderBar.superclass.initComponent.call(sf, config);
		var wrap = sf.wrap,
			opt = sf.options;
		sf.calib = wrap.child('.slider-bar-calib');
		sf.itemlist = wrap.child('.slider-bar-items');
		sf.tria = wrap.child('.slider-tria');
		sf.slider = wrap.child('.slider');
		if(opt) {
            sf.setOptions(opt);
		}else{
            sf.clearOptions();
		}
	},
	processListener : function(ou){
		var sf = this;
		$L.SliderBar.superclass.processListener.call(sf, ou);
		sf.wrap[ou]('mousedown',sf.onMouseDown,sf)
	},
	processDataSet: function(ou){
		var sf = this,
			ds = sf.optionDataSet,
			loadFn = sf.render;
		if(ds){
            ds[ou]('load', loadFn, sf);
            ds[ou]('query', loadFn, sf);
           	ds[ou]('add', loadFn, sf);
            ds[ou]('update', loadFn, sf);
            ds[ou]('remove', loadFn, sf);
            ds[ou]('clear', loadFn, sf);
            ds[ou]('reject', loadFn, sf);
		}
	},
	onMouseDown : function(e,t){
		var sf = this;
		t = Ext.fly(t);
		if(t.hasClass('slider')){
			sf.onSliderDown();
		}else if(t.hasClass('slider-bar-calib')||t.parent('.slider-bar-calib')){
			sf.onSliderMove(e);
		}
	},
	onSliderDown : function(){
		var sf = this;
		sf.slider.addClass('selected');
		Ext.getBody().on('mousemove',sf.onSliderMove,sf)
			.on('mouseup',sf.onSliderUp,sf);
	},
	onSliderMove : function(e){
		var sf = this,
			ds = sf.optionDataSet;
		if(ds){
			var records = ds.getAll();
			sf.setValue(records[Math.min(Math.max(0, Math.round((e.xy[1] - sf.wrap.getY()-12)/24)),records.length - 1)].get(sf.valuefield));
		}
	},
	onSliderUp : function(){
		var sf = this;
		sf.slider.removeClass('selected');
		Ext.getBody().un('mousemove',sf.onSliderMove,sf)
			.un('mouseup',sf.onSliderUp,sf);
	},
	setOptions : function(name){
		var sf = this,
			ds = typeof(name)==='string'?$(name) : name;
		if(sf.optionDataSet != ds){
			sf.processDataSet('un');
			sf.optionDataSet = ds;
			sf.processDataSet('on');
			sf.render();
			if(!Ext.isEmpty(sf.value)) sf.setValue(sf.value, true);
		}
	},
	clearOptions : function(){
		var sf = this;
		sf.processDataSet('un');
		sf.optionDataSet = null;
		sf.clear();
	},
	clear : function(){
		var sf = this;
		sf.calib.update('');
		sf.itemlist.update('');
	},
	render : function(){
		var sf= this,
			ds = sf.optionDataSet,
			records = ds.getAll(),
			length = records.length,
			displayfield = sf.displayfield;
		sf.calib.update(Array(length).join('<li></li>'));
		sf.itemlist.update(records.map(function(r,index){
			return '<li'+(function(){
				switch(index){
					case 0:
					case length-1:
					case Math.round((length-1)/2):return ' class="strong">';
					default:return '>';
				}	
			})()+r.get(displayfield)+'</li>';
		}).join(''));
		sf.tria.setStyle({
			'border-bottom-width':24*length - 24 + 'px'
		});
	},
	positionSlider : function(index){
		var sf = this;
		if(sf.selectIndex){
			sf.itemlist.select('li:nth-child('+(sf.selectIndex+1)+')').removeClass('selected');
		}
		sf.selectIndex = index;
		sf.itemlist.select('li:nth-child('+(index+1)+')').addClass('selected');
		sf.slider.setStyle({
			top:24*index+'px'
		});
	},
	setValue : function(v,silent){
		if(this.value == v)return;
		var sf = this,
			ds = sf.optionDataSet;
		$L.SliderBar.superclass.setValue.call(this, v, silent);
		if(ds){
			sf.positionSlider(ds.indexOf(ds.find('value',v)));
		}
	}
});
})();
