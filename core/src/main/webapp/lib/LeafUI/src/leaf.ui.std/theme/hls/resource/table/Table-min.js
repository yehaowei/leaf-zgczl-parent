(function(aj){var aI=document.documentElement,W=Ext.each,X=Ext.isEmpty,y=false,T=true,ag=null,V="_",e="__",f="-",l=".",i=" ",m="",q="]",ai="-c",ab="-u",a="td",aG="tr",Z="none",b="left",w="display",d="outline",ax="1px dotted blue",p="recordid",R="row-selected",G="required",I="dataindex",ao="item-notBlank",ac="item-invalid",c="table-row-alt",E="table-rowbox",r=l+E,aq="table.rowcheck",au="table.rowradio",ah="table-ckb ",at="table-select-all",Y="multiple",af="checkedvalue",n="-readonly",aw="desc",g="asc",az="table-desc",O="table-asc",u="item-ckb",M=u+"-self",aH=l+M,an=u+ab,av=u+ai,B=u+n+ab,L=u+n+ai,N="item-radio-img",aB=N+ai,ar=N+ab,J=N+n+ai,t=N+n+ab,aF=aH+i+l+av,aC="table-cell",ak=aC+"-editor",D="cellcheck",P="rowcheck",h="click",z="cellclick",k="render",aE="rowclick",ad="editorshow",K="nexteditorshow",aA="keydown",aa="select",o="mousedown",ay="resize",Q="未找到",ap="方法!",F="tr[class!=grid-hl]",j="div[atype=table.headcheck]",S="td[dataindex=",H=function(C,U,aL,aK){if(U.length){var aJ=[],A=[],aM=U.shift();if(Ext.isDefined(aL)){aJ.value=aL;aJ.colname=aK}W(C,function(aP){var aN=aP.get(aM);var aO=x(A,aN);if(!aO){A.push(aO=[]);if(X(aN)){aO.value=v(aP,aM)}else{aO.value=aN}aO.colname=aM}aO.push(aP)});W(A,function(aO,aN){aJ.push(H(aO,[].concat(U),aO.value,aO.colname))});return aJ}else{return C}},am=function(A){var C=[];W(A,function(U){if(Ext.isArray(U)){C=C.concat(am(U))}else{C.push(U)}});return C},x=function(A,C){var U=null;W(A,function(aJ){if(aJ.value==C){U=aJ;return y}});return U},ae=function(A,C){var U=null;W(A,function(aJ){if(aJ.value==C||aJ.value&&(aJ=ae(aJ,C))){U=aJ;return y}});return U},aD=function(A,C){var U=null;W(A,function(aJ){if(aJ.value?aD(aJ,C):aJ===C){U=aJ;return y}});return U},al=function(C,U,A){W(C,function(aJ){if(Ext.isArray(aJ)){al(aJ,U,C)}else{C.remove(U);return y}});if(C&&!C.length&&A){A.remove(C)}},s=function(){function A(C,U,aK){var aM=y,aJ=aK.shift(),aL;if(!aJ){return U}aL=U.get(aJ);if(X(aL)){aL=v(U,aJ)}else{W(C,function(aN){if(Ext.isArray(aN)){if(aL==aN.value){aM=aN;return y}}})}if(!aM&&aJ){aM=[];aM.colname=aJ;aM.value=aL}aM.add(A(aM,U,aK));return aM}return function(C,U,aK){var aJ=[];Ext.each(aK,function(aL){if(aL.group){aJ.push(aL.name)}});C.add(A(C,U,aJ));W(am(aD(C,U)),function(aL){if(aL!==U){var aM=aL.ds;aM[aL.isSelected?"select":"unSelect"](U);return y}})}}(),v=function(A,C){return"____empty__group__"+A.id+"__"+C+"___"};aj.Table=Ext.extend(aj.Component,{initComponent:function(A){aj.Table.superclass.initComponent.call(this,A);var U=this,C=U.wrap;U.th=C.child("thead tr.table-head");U.tbody=C.child("tbody");U.fb=C.child("tfoot");U.initTemplate()},processListener:function(A){var C=this;aj.Table.superclass.processListener.call(C,A);C.tbody[A](h,C.onClick,C);C.wrap[A]("focus",C.onFocus,C)[A]("blur",C.onBlur,C)[A](Ext.isOpera?"keypress":aA,C.handleKeyUp,C)[A]("keyup",C.handleKeyUp,C)[A](o,C.onMouseDown,C);if(C.canwheel){C.tbody[A]("mousewheel",C.onMouseWheel,C)}if(C.th){C.th[A](h,C.onHeadClick,C)}C[A](z,C.onCellClick,C)},processDataSetLiestener:function(A){var C=this,U=C.dataset;if(U){U[A]("ajaxfailed",C.onAjaxFailed,C);U[A]("metachange",C.onLoad,C);U[A]("update",C.onUpdate,C);U[A]("reject",C.onUpdate,C);U[A]("add",C.onAdd,C);U[A]("submit",C.onBeforSubmit,C);U[A]("submitfailed",C.onAfterSuccess,C);U[A]("submitsuccess",C.onAfterSuccess,C);U[A]("query",C.onBeforeLoad,C);U[A]("load",C.onLoad,C);U[A]("loadfailed",C.onAjaxFailed,C);U[A]("valid",C.onValid,C);U[A]("beforeremove",C.onBeforeRemove,C);U[A]("remove",C.onRemove,C);U[A]("clear",C.onLoad,C);U[A]("refresh",C.onLoad,C);U[A]("fieldchange",C.onFieldChange,C);U[A]("indexchange",C.onIndexChange,C);U[A]("select",C.onSelect,C);U[A]("unselect",C.onUnSelect,C);U[A]("selectall",C.onSelectAll,C);U[A]("unselectall",C.onUnSelectAll,C)}},initEvents:function(){aj.Table.superclass.initEvents.call(this);this.addEvents(k,z,aE,ad,K)},bind:function(A){if(Ext.isString(A)){A=$(A);if(!A){return}}this.dataset=A;this.processDataSetLiestener("on");this.onLoad()},handleKeyUp:function(A){if(A.getKey()==9){this.showEditorByRecord()}},initTemplate:function(){this.cellTpl=new Ext.Template(['<div style="width:{width}" class="',aC,' {cellcls}" id="',this.id,"_{name}_{",p,'}">{text}</div>']);this.cbTpl=new Ext.Template(['<center><div class="{cellcls}" id="',this.id,"_{name}_{",p,'}"></div></center>'])},createRow:function(aJ,aO,aL,aS,U){var aN=this;if(Ext.isArray(aJ)){W(aJ,function(aV,aT,aU){if(aU=aV.colname){aS=aS||{};aS[aU]=am(aV).length;aS[aU+"_count"]=T}return aN.createRow(aV,aO,aL,aS,!aT)})}else{var aP=aN.tbody.dom.insertRow(-1),aQ=ag,aR=y,aK=aN.parseCss(aN.renderRow(aJ,aO));aP.id=aN.id+f+aJ.id;aP.style.cssText=aK.style;Ext.fly(aP).addClass((aO%2==1?c+i:m)+aK.cls).set({_row:aJ.id});W(aN.columns,function(aT){if(aT.hidden&&aT.visiable==y){return}var aU,aV=aT.type;if(aV==P||aV=="rowradio"){aU="__rowbox__"}else{aU=aT.name}aQ=aS&&aS[aU];if(!aQ||aS[aU+"_count"]){aN.createCell(aP,aT,aJ,aQ)}if(aS&&aS[aU+"_count"]){aS[aU+"_count"]=y}});if(aL){var aM=aN.wrap.query("tbody tr");for(var C=aO+1,A=aM.length;C<A;C++){Ext.fly(aM[C]).toggleClass(c).select(r).each(function(aT){aN.setSelectStatus(aN.dataset.findById(aT.getAttributeNS(m,p)))})}}}},createEmptyRow:function(){var A=this;A.emptyRow=A.tbody.dom.insertRow(-1);W(A.columns,function(C){Ext.fly(A.emptyRow.insertCell(-1)).set({atype:aC,dataindex:C.name}).setStyle({"text-align":C.align||b,display:C.hidden?Z:m}).update("&#160;")})},removeEmptyRow:function(){var A=this;if(A.emptyRow){A.tbody.dom.removeChild(A.emptyRow);A.emptyRow=ag}},getCheckBoxStatus:function(A,aJ,U){var aL=this.dataset.getField(aJ),C=aL.getPropertity(af),aK=A.data[aJ];return u+(U?n:m)+((aK&&aK==C)?ai:ab)},createCell:function(aQ,A,aL,aJ){var aM=this,aN=aM.getEditor(A,aL),C=A.type,aP=A.name,aK,aS=m,U;if(aQ.tagName.toLowerCase()=="tr"){U=aQ.insertCell(-1)}else{U=Ext.fly(aQ).parent(a).dom}if(aN!=m){var aO=aj.CmpManager.get(aN);if(aO&&(aO instanceof aj.CheckBox)){C=D}else{aS=ak}}else{if(aP&&Ext.isDefined(aL.getField(aP).get(af))){C=D;aK=T}}if(C==P||C=="rowradio"){aK=aM.dataset.execSelectFunction(aL)?m:n;Ext.fly(U).set({atype:C==P?aq:au,recordid:aL.id}).addClass(E);U.innerHTML=aM.cbTpl.applyTemplate({cellcls:C==P?ah+u+aK+ab:"table-radio "+N+aK+ab,name:aP,recordid:aL.id})}else{Ext.fly(U).set({atype:aC,recordid:aL.id,dataindex:aP}).setStyle({"text-align":A.align||b,display:A.hidden?Z:m});if(C==D){U.innerHTML=aM.cbTpl.applyTemplate({cellcls:ah+aM.getCheckBoxStatus(aL,aP,aK),name:aP,recordid:aL.id})}else{var aR=aL.getMeta().getField(aP);if(aR&&X(aL.data[aP])&&aL.isNew==T&&aR.get(G)==T){aS=aS+i+ao}U.innerHTML=aM.cellTpl.applyTemplate({text:aM.renderText(aL,A,aL.data[aP]),cellcls:aS,name:aP,recordid:aL.id,width:A.width+"px"})}}if(aJ){U.rowSpan=aJ}},onSelect:function(aJ,C,aK){if(!C||aK){return}var U=this,A=Ext.get(U.id+e+C.id);if(A){A.parent(r).addClass(M);if(U.selectionmodel==Y){U.setCheckBoxStatus(A,T)}else{U.setRadioStatus(A,T);aJ.locate((aJ.currentPage-1)*aJ.pagesize+aJ.indexOf(C)+1)}U.setSelectStatus(C)}U.groupselect&&W(!aK&&am(aD(U.groups,C)),function(aL){if(aL!==C){aJ.select(aL)}})},onUnSelect:function(aJ,C,aK){if(!C||aK){return}var U=this,A=Ext.get(U.id+e+C.id);if(A){A.parent(r).addClass(M);if(U.selectionmodel==Y){U.setCheckBoxStatus(A,y)}else{U.setRadioStatus(A,y)}U.setSelectStatus(C)}U.groupselect&&W(!aK&&am(aD(U.groups,C)),function(aL){if(aL!==C){aJ.unSelect(aL)}})},onSelectAll:function(){var A=this;A.clearChecked();A.isSelectAll=T;A.isUnSelectAll=y;A.wrap.addClass(at)},onUnSelectAll:function(){var A=this;A.clearChecked();A.isSelectAll=y;A.isUnSelectAll=T;A.wrap.removeClass(at)},clearChecked:function(){var A=this.wrap;A.select(aF).replaceClass(av,an);A.select(aH).removeClass(M)},setRadioStatus:function(A,C){if(!C){A.removeClass(aB).addClass(ar)}else{A.addClass(aB).removeClass(ar)}},setCheckBoxStatus:function(A,C){if(!C){A.removeClass(av).addClass(an)}else{A.addClass(av).removeClass(an)}},setSelectDisable:function(U,C){var A=this.dataset.selected.indexOf(C)==-1;if(this.selectionmodel==Y){U.removeClass([av,an]).addClass(A?B:L)}else{U.removeClass([aB,ar,J,t]).addClass(A?t:J)}},setSelectEnable:function(U,C){var A=this.dataset.selected.indexOf(C)==-1;if(this.selectionmodel==Y){U.removeClass([B,L]).addClass(A?an:av)}else{U.removeClass([ar,aB,t,J]).addClass(A?ar:aB)}},setSelectStatus:function(C){var U=this,aJ=U.dataset;if(aJ.selectfunction){var A=Ext.get(U.id+e+C.id);if(!aJ.execSelectFunction(C)){U.setSelectDisable(A,C)}else{U.setSelectEnable(A,C)}}},onHeadClick:function(aN,U){var aL=this,aM=aL.dataset;U=Ext.get(U);if(U.is(j)){var aK=U.hasClass(av);aL.setCheckBoxStatus(U,!aK);if(!aK){aM.selectAll()}else{aM.unSelectAll()}}else{if(U.is(".table-hc")){var C=U.getAttributeNS(m,I),A=aL.findColByName(C);if(A&&A.sortable===T){if(aM.isModified()){aj.showInfoMessage("提示","有未保存数据!");return}var aJ=m;if(aL.currentSortTarget){aL.currentSortTarget.removeClass([O,az])}aL.currentSortTarget=U;if(X(A.sorttype)){A.sorttype=aw;U.removeClass(O).addClass(az);aJ=aw}else{if(A.sorttype==aw){A.sorttype=g;U.removeClass(az).addClass(O);aJ=g}else{A.sorttype=m;U.removeClass([az,O])}}aM.sort(C,aJ)}}}},setEditor:function(C,U){var aJ=this,A=aJ.findColByName(C),aK=Ext.get([aJ.id,C,aJ.selectedId].join(V));A.editor=U;if(aK){aJ.focusdiv=aK;if(U==m){aK.removeClass(ak)}else{if(!$(U) instanceof aj.CheckBox){aK.addClass(ak)}}}},getEditor:function(aJ,C){var U=aJ.editor||m;if(aJ.editorfunction){var A=window[aJ.editorfunction];if(A==ag){alert(Q+aJ.editorfunction+ap);return ag}U=A.call(window,C,aJ.name)||m}return U},showEditor:function(aO,A,aN){if(aO==-1){return}var aL=this,U=aL.findColByName(A);if(!U){return}var C=aL.dataset,aJ=C.getAt(aO);if(!aJ){return}if(aJ.id!=aL.selectedId){aL.selectRow(aO)}var aM=aL.getEditor(U,aJ);aL.setEditor(A,aM);if(aM!=m){var aK=$(aM);(function(){var aR=aJ.get(A),aW=Ext.get([aL.id,A,aJ.id].join(V)),aV=aW.getXY(),aQ;aK.bind(C,A);aK.render(aJ);aK.el.on(aA,aL.onEditorKeyDown,aL);Ext.fly(aI).on(o,aL.onEditorBlur,aL);aQ=aL.currentEditor={record:aJ,ov:aR,name:A,editor:aK};aL.positionEditor();if(aK instanceof aj.CheckBox){var aP=aL._begin;if(aP){var aU=C.indexOf(aP),aT=C.indexOf(aJ);if(aU>aT){var aS=aT;aT=aU;aU=aS}aT++;for(;aU<aT;aU++){C.getAt(aU).set(A,aP.get(A))}delete aL._begin}else{if(aN){aK.focus()}else{aK.onClick()}}}else{if(aK instanceof aj.Field&&!aK instanceof aj.TextArea){aK.el.setStyle("text-align",U.align||b)}else{if(aK instanceof aj.Lov){aK.on("fetching",aL.onFetching,aL)}}aK.isEditor=T;aK.isFireEvent=T;aK.isHidden=y;aK.focus();if(aK.wrap&&!aK.wrap.hasClass("grid-editor")){aK.wrap.addClass("grid-editor")}aK.on(aa,aL.onEditorSelect,aL);if(Ext.isFunction(aN)){aN(aK)}aL.fireEvent(ad,aL,aK,aO,A,aJ)}aL.editing=T;Ext.fly(window).on(ay,aL.positionEditor,aL)}).defer(10)}},showEditorByRecord:function(A){var C=this,U=C.dataset,aJ=A?U.indexOf(A):0;A=A||U.getAt(0);W(C.columns,function(aK){if(aK.hidden!=T&&C.getEditor(aK,A)!=m){C.fireEvent(z,C,aJ,aK.name,A,function(){});C.fireEvent(aE,C,aJ,A);return y}})},onEditorSelect:function(){(function(){this.hideEditor()}).defer(1,this)},onEditorKeyDown:function(aK,C){var U=this,aJ=aK.keyCode;ced=U.currentEditor;if(aJ==27){if(ced){var A=ced.editor;if(A){A.clearInvalid();A.render(A.binder.ds.getCurrentRecord())}}U.hideEditor()}else{if(aJ==13){if(!(ced&&ced.editor&&ced.editor instanceof aj.TextArea)){U.showEditorBy(39)}}else{if(aJ==9){aK.stopEvent();U.showEditorBy(aK.shiftKey?37:39)}else{if(aK.ctrlKey&&(aJ==37||aJ==38||aJ==39||aJ==40)){U.showEditorBy(aJ);aK.stopEvent()}}}}},findEditorBy:function(aM){var aP=this,C,aO;if((C=aP.currentEditor)&&(aO=C.editor)){var aS=aP.columns,aQ=y,aL=aP.dataset,aK=aO.binder.name,A=aO.record,aU=aL.data.indexOf(A),U=ag,aR=y,aN=T,aT=y,aJ;if(aU!=-1){if(aM==37||aM==38){aS=[].concat(aS).reverse();aN=y}if(aM==38||aM==40){aT=T;aJ=aP.findColByName(aK)}while(A){if(!aT){W(aS,function(aV){if(aQ){if(aV.hidden!=T&&aP.getEditor(aV,A)!=m){U=aV.name;return y}}else{if(aV.name==aK){aQ=T}}})}if(U){return{row:aU,name:U,record:A}}A=aL.getAt(aN?++aU:--aU);if(aN&&!A&&!aR&&aP.autoappend!==y){aP.hideEditor();aL.create();A=aL.getAt(aU);aR=T}if(aT&&A&&aP.getEditor(aJ,A)!=m){U=aK}}}}return ag},showEditorBy:function(U){var aJ=this,aL=T,C=aJ.findEditorBy(U);if(C){aJ.hideEditor();var aK=C.row,A=C.record;aJ.fireEvent(z,aJ,aK,C.name,A,aL);aJ.fireEvent(aE,aJ,aK,A)}},positionEditor:function(){var C=this,A=C.currentEditor.editor,aJ=C.focusdiv,U=aJ.getXY();if(A instanceof aj.CheckBox){A.move(U[0],U[1]-3)}else{A.setHeight(aJ.getHeight()-2);A.setWidth(aJ.getWidth()-5<22?22:(aJ.getWidth()-5));A.move(U[0],U[1])}if(A.isExpanded&&A.isExpanded()){if(Ext.isIE){if(C.t){clearTimeout(C.t)}C.t=(function(){A.syncPopup()}).defer(1)}else{A.syncPopup()}}},hideEditor:function(){var aJ=this,U=aJ.currentEditor;if(U){var C=U.editor;if(C){if(!C.canHide||C.canHide()){C.el.un(aA,aJ.onEditorKeyDown,aJ);C.un(aa,aJ.onEditorSelect,aJ);Ext.fly(aI).un(o,aJ.onEditorBlur,aJ);Ext.fly(window).un(ay,aJ.positionEditor,aJ);C.move(-10000,-10000);var A=C.autocompleteview;if(A){A.hide()}C.blur();C.onBlur();C.isFireEvent=y;C.isHidden=T;aJ.editing=y;if(C.collapse){C.collapse()}}}}},selectRow:function(aM,U){var aK=this,aL=aK.dataset,A=aL.getAt(aM),aJ=(aL.currentPage-1)*aL.pagesize+aM+1,C=am(aD(aK.groups,A));aK.selectedId=A.id;if(aK.selectTr){aK.selectTr.removeClass(R)}aK.selectTr=aK.tbody.select(C.map(function(aN){return"#"+aK.id+f+aN.id}).join(","));if(aK.selectTr){aK.selectTr.addClass(R)}if(U!==y&&aJ!=ag){aL.locate.defer(5,aL,[aJ,y])}},drawFootBar:function(C){var A=this;if(!A.fb){return}W([].concat((C)?C:A.columns),function(aM){var aK=Ext.isString(aM)?A.findColByName(aM):aM;if(aK&&aK.footerrenderer){var aL=aj.getRenderer(aK.footerrenderer);if(aL==ag){alert(Q+aK.footerrenderer+ap);return}var aJ=aK.name,U=aL.call(window,A.dataset.data,aJ);if(!X(U)){A.fb.child(S+aJ+q).update(U)}}})},showColumn:function(C){var A=this.findColByName(C);if(A){if(A.hidden===T){delete A.hidden;this.wrap.select(S+C+q).setStyle(w,m)}}},hideColumn:function(C){var A=this.findColByName(C);if(A){if(A.hidden!==T){this.wrap.select(S+C+q).setStyle(w,Z);A.hidden=T}}},findColByName:function(A){var C;if(A){W(this.columns,function(U){if(U.name&&U.name.toLowerCase()===A.toLowerCase()){C=U;return y}})}return C},parseCss:function(U){var aK=m,A=m;if(Ext.isArray(U)){for(var C=0;C<U.length;C++){var aJ=this.parseCss(U[C]);aK+=";"+aJ.style;A+=i+aJ.cls}}else{if(Ext.isString(U)){var aL=!!U.match(/^([^,:;]+:[^:;]+;)*[^,:;]+:[^:;]+;*$/);A=aL?m:U;aK=aL?U:m}}return{style:aK,cls:A}},renderText:function(A,C,aK){var aJ=C.renderer;if(aJ){var U=aj.getRenderer(aJ);if(U==ag){alert(Q+aJ+ap);return aK}aK=U.call(window,aK,A,C.name)}return X(aK)?"&#160;":aK},renderRow:function(A,aK){var aJ=this.rowrenderer,C=ag;if(aJ){var U=aj.getRenderer(aJ);if(U==ag){alert(Q+aJ+ap);return C}C=U.call(window,A,aK);return !C?m:C}return C},renderEditor:function(aJ,A,U,C){this.createCell(aJ.dom,U,A)},onClick:function(aN,aQ){var aM=this,A=(aQ=Ext.fly(aQ)).dom.tagName.toLowerCase()==a,aO=A?aQ:aQ.parent(a);if(aO){var aJ=aO.getAttributeNS(m,"atype"),aP=aO.getAttributeNS(m,p),U=aM.dataset;if(aJ==aC){var aL=U.findById(aP),aR=U.indexOf(aL),C=aO.getAttributeNS(m,I);aM.fireEvent(z,aM,aR,C,aL,!aQ.hasClass("table-ckb"));aM.fireEvent(aE,aM,aR,aL)}else{if(aJ==aq){var aK=Ext.get(aM.id+e+aP);if(aK.hasClass(B)||aK.hasClass(L)){return}if(aM.isSelectAll&&!aK.parent(aH)){aK.replaceClass(an,av)}else{if(aM.isUnselectAll&&!aK.parent(aH)){aK.replaceClass(av,an)}}aK.hasClass(av)?U.unSelect(aP):U.select(aP)}else{if(aJ==au){var aK=Ext.get(aM.id+e+aP);if(aK.hasClass(t)||aK.hasClass(J)){return}U.select(aP)}}}}},onCellClick:function(U,aJ,C,A,aK){this.showEditor(aJ,C,aK)},onUpdate:function(U,aK,C,aQ,aJ){var aN=this,aO=aN.findColByName(C),A,aP;if(aO&&aO.group){aK.data[C]=aJ;var aM=aN.tbody.query(F).indexOf(aN.tbody.child("tr[_row="+aK.id+"]").dom);aN.onRemove(U,aK);aK.data[C]=aQ;aN.onAdd(U,aK,aM,y);!X(aJ)&&W(am(ae(aN.groups,aJ)),function(aR){if(aR!==aK){aR.set(C,aQ)}});aN.selectRow(aN.dataset.indexOf(aK))}if(A=Ext.get([aN.id,C,aK.id].join(V))){var aO=aN.findColByName(C),aL=aN.getEditor(aO,aK);if(aL!=m&&($(aL) instanceof aj.CheckBox)){aN.renderEditor(A,aK,aO,aL)}else{A.update(aN.renderText(aK,aO,aQ))}}W(aN.columns,function(aR){if(aR.name!=C&&(aP=Ext.get([aN.id,aR.name,aK.id].join(V)))){if(aR.editorfunction){aN.renderEditor(aP,aK,aR,aN.getEditor(aR,aK))}if(aR.renderer){aP.update(aN.renderText(aK,aR,aK.get(aR.name)))}}});aN.setSelectStatus(aK);aN.drawFootBar(C)},onLoad:function(){var aJ=this,U=aJ.wrap,aK=aJ.dataset.data,A=U.removeClass(at).child(j);aJ.clearBody();aJ.processGroups();if(A&&aJ.selectable&&aJ.selectionmodel==Y){aJ.setCheckBoxStatus(A,y)}var C=aK.length;if(C==0){aJ.createEmptyRow()}else{aJ.renderArea()}aJ.drawFootBar();aj.Masker.unmask(U);aJ.fireEvent(k,aJ)},processGroups:function(){var C=this,U=C.dataset,A=[];C.groups=[].concat(U.getAll());Ext.each(C.columns,function(aJ){aJ.group&&A.push(aJ.name)});if(A.length){am(C.groups=H(C.groups,A))}},renderArea:function(){var A=this;W(A.groups,function(aJ,C){var U;if(aJ.colname){U={};U[aJ.colname]=am(aJ).length;U[aJ.colname+"_count"]=T;if(A.groupselect){U.__rowbox__=U[aJ.colname];U.__rowbox___count=U[aJ.colname+"_count"]}}A.createRow(aJ,C,false,U,!C)},A)},onValid:function(aJ,A,C,U){var aL=this.findColByName(C);if(aL){var aK=Ext.get([this.id,C,A.id].join(V));if(aK){if(U==y){aK.addClass(ac)}else{aK.removeClass([ao,ac])}}}},onAdd:function(aT,aN,aP){var aX=this,aJ=aP,aL=aX.columns,aW=aX.groups,A=aW.length,aO=aT.data.length,aQ=aX.parseCss(aX.renderRow(aN,aP)),aK=((A==aO?aP:A)%2==0?m:c);s(aW,aN,aL);aX.removeEmptyRow();var aV=Ext.get(document.createElement(aG)),C=aX.tbody;aV.set({id:aX.id+f+aN.id,style:aQ.style,_row:aN.id});W(aL,function(aZ){if(aZ.hidden&&aZ.visiable==y){return T}var a0=aZ.name,a1=y;if(aZ.group){var aY=0;C.select(S+a0+q).each(function(a7,a3){var a6=aX.dataset.findById(a7.parent(aG).getAttributeNS(m,"_row")),a4=aN.get(a0);if(a6&&!X(a4)&&a6.get(a0)==a4){var a2=ae(aW,a4),a5=am(a2).length;aY+=a5;a7.dom.rowSpan=a5;a1=T;aP=aY-1;aK=a7.parent(aG).hasClass(c)?c:m;if(aW.indexOf(a2)!=-1&&aL[0].type){C.query("td[recordid="+a6.id+"]:first")[0].rowSpan=a5;if(aN!==a6){aV.select("td[recordid="+aN.id+"]:first").remove()}}return y}else{aY+=a7.dom.rowSpan}});if(!a1){aP=aJ}}if(a1){return}aX.createCell(aV.dom,aZ,aN)});aV.addClass(aK+i+aQ.cls);if(aP===aO-1){C.appendChild(aV)}else{var aR=function(aZ,aY){if(aY<aP){return y}},aS=C.select(F).filter(aR),U=aS.item(0),aM=(U&&aK==(U.hasClass(c)?c:m)),aU=aD(aN);aV.insertBefore(U);aM&&setTimeout(function(){aR=function(aY){if(aD(aT.findById(aY.getAttributeNS(m,"_row")))===aU){return y}};aS.filter(aR).toggleClass(c)},1)}aX.selectRow(aT.indexOf(aN));aX.setSelectStatus(aN)},onRemove:function(aJ,A,C){var U=this,aK=Ext.get(U.id+f+A.id);if(aK){aK.remove()}al(U.groups,A);W(U.columns,function(aL){var aM=aL.name;if(aL.group){U.tbody.select(S+aM+q).each(function(aP){var aO=U.dataset.findById(aP.parent(aG).getAttributeNS(m,"_row")),aN;if(aO&&aO.get(aM)==A.get(aM)){if((aN=aP.getAttribute("rowspan"))&&(aN-=1)>1){aP.dom.rowSpan=aN}return y}})}});U.selectTr=ag;aj.Masker.unmask(U.wrap);U.drawFootBar()},onMouseDown:function(aK,U){U=(U=Ext.fly(U)).is(a)?U:U.parent(a);var aJ=this,C=U.getAttribute("atype"),A;if((A=aJ.currentEditor)&&A.editor instanceof aj.CheckBox&&C==aC&&U.getAttribute(I)==A.name){if(aK.shiftKey){aJ._begin=A.record;aK.stopEvent()}else{if((U=U.child(".table-ckb"))&&U.dom.className.search(/readonly/)==-1){aK.stopEvent();A.editor.focus.defer(Ext.isIE?1:0,A.editor)}}}},focus:function(){this.wrap.focus()},onFocus:function(){this.hasFocus=T},blur:function(){this.wrap.blur()},onBlur:function(){this.hasFocus=y},clearBody:function(){var A=this.tbody.dom;while(A.childNodes.length){A.removeChild(A.firstChild)}this.emptyRow=ag},getDataIndex:function(U){for(var C=0,aJ=this.dataset.data,A=aJ.length;C<A;C++){if(aJ[C].id==U){return C}}return -1},onEditorBlur:function(aJ,C){var U=this,A=U.currentEditor;if(A&&!A.editor.isEventFromComponent(C)){U.hideEditor.defer(Ext.isIE9?10:0,U)}},onMouseWheel:function(C){C.stopEvent();if(this.editing==T){return}var U=C.getWheelDelta(),A=this.dataset;if(U>0){A.pre()}else{if(U<0){A.next()}}},onIndexChange:function(U,C){var A=this.getDataIndex(C.id);if(A==-1){return}this.selectRow(A,y)},onFieldChange:function(aJ,A,aK,C,U){if(C==G){var aL=Ext.get([this.id,aK.name,A.id].join(V));if(aL){aL[U==T?"addClass":"removeClass"](ao)}}},onBeforeRemove:function(){aj.Masker.mask(this.wrap,_lang["grid.mask.remove"])},onBeforeLoad:function(){aj.Masker.mask(this.wrap,_lang["grid.mask.loading"])},onAfterSuccess:function(){aj.Masker.unmask(this.wrap)},onBeforSubmit:function(A){aj.Masker.mask(this.wrap,_lang["grid.mask.submit"])},onFetching:function(A){var C=this;C.isFetching=true;aj.Masker.mask(C.wrap,_lang["grid.mask.fetching"]);A.on("fetched",C.onFetched,C)},onFetched:function(A){var C=this;C.isFetching=false;aj.Masker.unmask(C.wrap);A.un("fetched",C.onFetched,C);A.un("fetching",C.onFetching,C)},onAjaxFailed:function(C,A){aj.Masker.unmask(this.wrap)},destroy:function(){aj.Table.superclass.destroy.call(this);this.processDataSetLiestener("un")}});aj.Table.revision="$Rev: 8686 $"})($L);