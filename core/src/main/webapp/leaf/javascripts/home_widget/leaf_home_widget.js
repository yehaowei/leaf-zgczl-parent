jQuery.fn.extend({
    hapWidget:function(opt){
        //数组容器
        this.components = [];
        this.tabComponents = [];
        this.removeData = [];
        this.screenType = opt.screenType;
        this.editModel = true;
        this.tabLeftDistance = 20;
        this.tabTopDistance = 20;
        this.screenWidth = 1299 || jQuery(window).width();
        this.screenHeight = jQuery(window).height();
        this.componentWidth = 100;
        this.componentHeight = 150;
        this.viewWidth = 1360;
        this.context_path = opt.context_path;
        //图片路径
        this.imagePath = this.context_path + 'resources/images/home_page/';
        //默认图片
        this.defaultImage = this.imagePath + "component.png";

        this.initWidget(opt);
        return this;
    },
    hideBaseLine:function(){
        jQuery('.home_page_left_line').hide();
        jQuery('.home_page_top_line').hide();
    },
    showBaseLine:function(){
        jQuery('.home_page_left_line').show();
        jQuery('.home_page_top_line').show();
    },
    //基准线
    initBaseLine:function(obj){
        var leftLine = jQuery('.home_page_left_line');
        if(leftLine.length == 0){
            leftLine = jQuery("<div class='home_page_left_line'></div>");
            leftLine.appendTo(jQuery("body"));
        }
        var topLine = jQuery(".home_page_top_line");
        if(topLine.length == 0){
            topLine = jQuery("<div class='home_page_top_line'></div>");
            topLine.appendTo(jQuery("body"));
        }
        leftLine.css({
            "background":'rgb(46,195,232)',
            "width":"1px",
            "height":jQuery(document).height()+"px",
            "position":"absolute",
            "top": "0px",
            "left": obj.left+"px",
            "z-index":290
        });
        topLine.css({
            "background":'rgb(46,195,232)',
            "width":jQuery(document).width()+"px",
            "height":"1px",
            "position":"absolute",
            "top": obj.top+"px",
            "left": "0px",
            "z-index":290
        });
    },
    //初始化
    initWidget:function(opt){
        this.initLeftRight();
        this.initWindow();
        //this.initFloatWindow(opt);
        this.closeEditModel();
        this.tabData = opt.tabData;
        this.initTabScreen(opt.tabData.getAll());
        if(this.screenType == 'role') {
            this.initMainScreen(opt.screenData);
            this.screenData = opt.screenData;
        }else if(this.screenType == 'user'){
            this.initMainScreen(opt.userData);
            this.screenData = opt.userData;
        }
        this.initEvent();
    },
    //初始化左右基准线
    initLeftRight:function(){
        var width = jQuery(window).width()-20;
        var unWidth = div((width - this.viewWidth),2);
        this.leftOverLine = unWidth;
        this.rightOverLine = minus(width,unWidth);
    },
    //浮窗
    initFloatWindow:function(opt){
        var self = this;
        if(opt.screenType == 'user'){
            this.closeEditModel();
        }
        this.floatWindow = jQuery(".hap_widget_float_window");
        this.addNode('floatEdit','<span title="编辑" class="float_window_button float_window_button_edit"></span>').appendTo(this.floatWindow);
        this.addNode('','<div  class="float_window_button float_window_button_edit_desc">个性定制</div>').appendTo(this.floatWindow);
        this.addNode('','<div  class="float_window_button float_window_button_edit_English_desc">personality custom</div>').appendTo(this.floatWindow);
        this.addNode('addCompont','<span title="添加微件" class="float_window_button float_window_button_add"></span>').appendTo(this.floatWindow);
        //this.addNode('closeWindow','<span title="编辑模式" class="float_window_button float_window_button_close"></span>').appendTo(this.floatWindow);
        this.addNode('saveWindow','<span  class="float_window_button float_window_button_save">确定</span>').appendTo(this.floatWindow);
        this.addNode('resetWindow','<span  class="float_window_button float_window_button_reset">重置</span>').appendTo(this.floatWindow);
        var w = document.documentElement.clientWidth || document.body.clientWidth;
        var wd=(w-1200)/2+10+"px"
        jQuery(".hap_widget_float_window").css("left",wd);
        this.floatEdit.click(function() {
            if(self.floatWindow.css("width") != "380px") {
                self.floatWindow.animate({width: '380px'});
                jQuery(this).css({
                    "border-bottom":"1px solid rgb(204,204,204)"
                });
                if(self.screenType == 'user') {
                    self.openEditModel();
                }
            }else{
                self.floatWindow.animate({width: '201px'});
                jQuery(this).css({
                    "border-bottom":"none"
                });
                if(self.screenType == 'user') {
                    self.closeEditModel();
                }
            }
        });

        this.addCompont.click(function () {
            self.showTabScreen();
        });
        /*this.closeWindow.click(function(){
         if(self.screenType == 'user') {
         if(self.editModel == true){
         self.closeEditModel();
         }else{
         self.openEditModel();
         }
         }else{
         self.hideTabScreen();
         }
         });*/
        this.saveWindow.click(function(){
            self.saveScreenData();
            setTimeout(self.closeEditModel(),1000);
        });
        this.resetWindow.click(function(){
            self.initMainScreen({screenData: $("sysRoleHomePageDs")})
        });
    },
    // jQuery("#widget_edit_button").click(function(){
    //
    // if(self.floatWindow.css("width") != "120px") {
    //      self.floatWindow.animate({width: '120px'});
    //        }else{
    //                 self.floatWindow.animate({width: '42px'});
    //
    //             }
    // }),

    //关闭编辑模式
    closeEditModel:function() {
        jQuery(".hap_widget_main_screen").removeClass("border_enabled");
        this.removeClass("hap_widget_main_screen_edit_model");
        this.editModel = false;
        jQuery(".hap_widget_tab_screen_component_layer").css({
            "z-index": "0"
        });
    },
    openEditModel:function(){
        jQuery(".hap_widget_main_screen").addClass("border_enabled");
        this.addClass("hap_widget_main_screen_edit_model");
        this.editModel = true;
        jQuery(".hap_widget_tab_screen_component_layer").css({
            "z-index": "100"
        });
    },
    //浮窗显示
    showFloatWindow:function(){
        this.floatWindow.show();
    },
    //组件栏
    initTabScreen:function(data){
        this.tabScreen = jQuery(".hap_widget_tab_screen");
        this.tabScreen.css({
            width: jQuery(window).width()-20
        });
        this.createTab(data);
    },
    createTab : function(data){
        for(var i = 0; i < data.length; i++){
            var imagePath = "";
            if(data[i].get("image") == null){
                imagePath = this.defaultImage;
            }else{
                imagePath = this.imagePath + data[i].get("image");
            }
            this.addNode('component','<div data-function_code="'+data[i].get("function_code")+'" data-url="'+data[i].get("service_name")+'" class="hap_widget_tab_screen_component hap_widget_tab_screen_box"><div class="hap_widget_tab_screen_component_close">X</div><div class="hap_widget_tab_screen_component_content"><img src="'+imagePath+'" alt="png"/><span>'+data[i].get("function_name")+'</span></div><div title="'+data[i].get("function_name")+'" class="hap_widget_tab_screen_component_layer"></div></div>').appendTo(this.tabScreen);
            this.component.css({
                "left": this.tabLeftDistance,
                "top": this.tabTopDistance
            });
            this.component.data("url", data[i].get("service_name"));
            this.component.data("function_code",data[i].get("function_code"));
            this.tabComponents.push(this.component);
            this.updateTabDistance();
        }
    },
    updateTabDistance : function(){
        if((this.tabLeftDistance + this.componentWidth*2) > this.screenWidth){
            this.tabLeftDistance = 40;
            this.tabTopDistance = this.tabTopDistance + this.componentHeight + 20;
        }else {
            this.tabLeftDistance = this.tabLeftDistance + this.componentWidth + 40;
        }
    },
    showTabScreen: function(){
        this.tabScreen.css({
            height: jQuery(document).height()
        });
        this.tabScreen.fadeIn();
        this.orderComponent();
    },
    hideTabScreen: function(orderFlag){
        this.tabScreen.fadeOut();
    },
    //重排弹窗组件
    orderComponent:function(){
        var self = this;
        self.tabTopDistance = 20;
        self.tabLeftDistance = 40;
        jQuery(".hap_widget_tab_screen_box").each(function(index,obj){
            jQuery(this).css({
                "top": self.tabTopDistance,
                "left": self.tabLeftDistance
            });
            self.updateTabDistance();
        });
    },
    //窗口
    initWindow: function(){
        this.css({
            width: jQuery(window).width()-20,
            height: jQuery(window).height(),
            margin: "auto"
        });
        this.addClass("hap_widget_main_screen_edit_model");
    },
    //主屏幕
    initMainScreen:function(screenData){
        var self = this;
        this.mainScreen = jQuery(".hap_widget_main_screen");
        jQuery(".hap_widget_main_screen .hap_widget_tab_screen_shadow").each(function(index,obj){
            var top = jQuery(this).data("top");
            var left = jQuery(this).data("left");
            var screen_width = jQuery(this).data("screen_width");
            var screen_height = jQuery(this).data("screen_height");
            jQuery(this).css({
                "left" :  left + "px",
                "top"  :  top + "px"
            });
        });
        /*this.mainScreen.css("width",jQuery(window).width());*/
        this.mainScreen.css("height",jQuery(window).height());
    },
    //初始化画面
    loadScreen : function(screenData){
        //已更换方式
    },
    //正则匹配定位
    matchStr : function(str){
        var arr = str.match(/left:([\S]+);top:([\S]+);/);
        return {
            "left":arr[1],
            "top": arr[2]
        };
    },
    //工具方法
    addNode : function(name,html){
        var node = jQuery(html);
        this[name] = node;
        return node;
    },
    //是否组件元素
    isComponent:function(obj){
        if(jQuery(obj).hasClass('hap_widget_tab_screen_component_layer')){
            return true;
        }else{
            return false;
        }
    },
    //是否为关闭元素
    isClose : function(obj){
        if(jQuery(obj).hasClass("hap_widget_tab_screen_component_close")){
            return true;
        }else{
            return false;
        }
    },
    //事件处理
    initEvent : function(){

        this.addMouseDown(this.mainScreen);
        this.addMouseDown(this.tabScreen);

        this.addMouseUp(this.mainScreen);
        this.addMouseUp(this.tabScreen);

        this.addMouseMove(this.mainScreen);
        /*this.addMouseMove(this.tabScreen);*/


    },
    //鼠标点下事件
    addMouseDown : function (obj) {
        var self = this;
        obj.mousedown(function(e){
            if(self.editModel == true) {
                self.showBaseLine();
                self.initBaseLine(jQuery(e.target).offset());
                //是组件的时候变身标志
                if (self.isComponent(e.target)) {
                    self.changeFlag = true;
                }
                //是关闭元素的时候触发关闭方法
                if (self.isClose(e.target)) {
                    self.close(e.target);
                }
                var targer = obj.target = e.target;
                obj.gapX = e.clientX - jQuery(targer).offset().left;
                obj.gapY = e.clientY - jQuery(targer).offset().top - jQuery(".hap_widget_main_screen").scrollTop();
            }
            if(jQuery(e.target).parent().hasClass('hap_widget_tab_screen_shadow')){
                jQuery(e.target).prev().css({
                    "z-index": "70"
                });
                jQuery(e.target).prev().prev().css({
                    "z-index": "80"
                });
            }
            return true;
        });
    },
    //鼠标抬起事件
    addMouseUp : function(obj){
        var self = this;
        obj.mouseup(function(e){
            if(self.editModel == true) {
                self.hideBaseLine();
                if (self.changeFlag != null && self.changeFlag == true && self.isComponent(obj.target)) {
                    self.changeFlag = false;
                    self.componentMove(obj.target);
                }
                obj.target = null;
            }
            if(!self.isComponent(obj.target)){
                self.hideTabScreen();
            }
            if(jQuery(e.target).parent().hasClass('hap_widget_tab_screen_shadow')){
                jQuery(e.target).prev().css({
                    "z-index": "50"
                });
                jQuery(e.target).prev().prev().css({
                    "z-index": "60"
                });
            }
        });
    },
    //更新基准线高度
    updateContentHeight : function(){
        if(jQuery(document).height()　> jQuery(window).height()){
            jQuery(".hap_widget_main_screen").css("height",jQuery(document).height());
        }
    },
    //鼠标移动事件
    addMouseMove : function (obj) {
        var self = this;
        obj.mousemove(function(e){
            if(self.editModel == true) {
                self.changeFlag = false;
                if (obj.target != null && self.isComponent(obj.target)) {
                    self.updateContentHeight();
                    var x = e.clientY - obj.gapY;
                    var y = e.clientX - obj.gapX;
                    if(y < self.leftOverLine){
                        return;
                    }
                    if(y + jQuery(obj.target).parent().width() > self.rightOverLine){
                        return;
                    }
                    jQuery(obj.target).parent().css({
                        top: x,
                        left: y-self.leftOverLine
                    });
                    self.updateDataSet(jQuery(obj.target).parent());
                    self.initBaseLine(jQuery(e.target).offset());
                }
            }
            return false;
        });
    },
    //中转操作
    componentMove : function(obj){
        if(!jQuery(obj).parent().hasClass('hap_widget_tab_screen_shadow')) {
            this.nodeChange(obj);
            this.hideTabScreen(true);
        }
    },
    //节点转换
    nodeChange : function (obj) {
        this.ajaxScreenData(obj);
    },
    //ajax请求页面数据
    ajaxScreenData : function(obj){
        var self = this;
        var url = self.context_path + jQuery(obj).parent().data("url");
        jQuery.ajax({
            url: url,
            dataType:'html',
            success: function(data){
                try {
                    var parentObj = jQuery(obj).parent();
                    var objPre = jQuery(obj).prev();
                    objPre.html(data);
                    objPre.css({
                        "width": "auto",
                        "height": "auto"
                    });
                    parentObj.removeClass("hap_widget_tab_screen_box");
                    parentObj.addClass("hap_widget_tab_screen_shadow");
                    parentObj.appendTo(self.mainScreen);
                    jQuery(obj).prev().ready(function () {
                        parentObj.css({
                            "width": objPre.width(),
                            "height": objPre.height()
                        });
                        self.addComponentData(parentObj);
                        self.recoveData(parentObj.data(("function_code")));
                    });
                }catch (e){
                    alert("组件加载失败，请检查该微件是否存在语法错误!");
                }

            }});
    },
    //添加组件数据
    addComponentData : function (obj) {
        var str = this.getContentStr(obj);
        var function_code = obj.data(("function_code"));
        for(var i = 0; i < this.components.length; i++){
            if(this.components[i].function_code == function_code){
                this.components[i].content = str;
                return ;
            }
        }
        this.components.push({
            "url": obj.data(("service_name")),
            "function_code": function_code,
            "content": str,
            "com_status": "NEW"
        });

    },
    updateComponentData : function (obj) {
        var str = this.getContentStr(obj);
        var function_code = obj.data(("function_code"));
        for(var i = 0; i < this.components.length; i++){
            if(this.components[i].function_code == function_code){
                this.components[i].content = str;
                return ;
            }
        }
    },
    getAttribute : function(obj){
        var self = this;
        return {
            "function_code": obj.data("function_code"),
            "content" : self.getContentStr(obj)
        };
    },
    getContentStr : function(obj){
        var left = obj.css("left");
        var top =  obj.css("top");
        var width = obj.css("width");
        var height = obj.css("height");
        return "left:"+left+";top:"+top+";width:"+width+";height:"+height+";screen_width:"+this.screenWidth+"px;screen_height:"+this.screenHeight+"px;";
    },
    //更新dataset
    updateDataSet : function(obj){
        var reocrd = this.findDataSetByCode(obj.data("function_code"));
        if(reocrd !== null) {
            var str = this.getContentStr(obj);
            reocrd.set("content", str);
        }
        this.updateComponentData(obj);
    },
    //根据功能代码找到对应的dataset
    findDataSetByCode : function(code){
        var reocrd = this.screenData.find("function_code",code);
        if(reocrd == null){
            reocrd = this.tabData.find("function_code",code);
        }
        return reocrd;
    },
    //保存页面数据
    saveScreenData : function(){
        var self = this;
        if(this.screenType == 'role') {
            for (var i = 0; i < this.components.length; i++) {
                if(this.components[i].com_status == 'NEW') {
                    this.screenData.create(this.components[i]);
                    this.components[i].com_status = 'finshed';
                }
            }
        }else if(this.screenType == 'user' && this.screenData.getAll().length == 0){
            jQuery(".hap_widget_tab_screen_shadow").each(function (index,obj) {
                self.screenData.create(self.getAttribute(jQuery(obj)));
            });
        }else if(this.screenType == 'user' && this.screenData.getAll().length > 0){
            for (var i = 0; i < this.components.length; i++) {
                if(this.components[i].com_status == 'NEW') {
                    this.screenData.create(this.components[i]);
                    this.components[i].com_status = 'finshed';
                }
            }
        }
        //处理删除数据
        this.sendRemoveData();
        //处理保存数据
        this.screenData.submit();
    },
    //恢复暂移除数据
    recoveData : function(function_code){
        for(var i = 0; i < this.removeData.length; i++){
            if(this.removeData[i].get("function_code") == function_code){
                this.removeData.remove(this.removeData[i]);
                for(var j = 0; j < this.components.length; j++){
                    if(this.components[j].function_code == function_code && this.components[j].com_status == 'NEW'){
                        this.components.remove(this.components[j]);
                    }
                }
            }
        }
    },
    //关闭
    close : function(target){
        var obj = jQuery(target).parent();
        var code = obj.data("function_code");
        var record = this.findDataSetByCode(code);
        this.createTab(new Array(record));
        obj.remove();
        this.dealRemoveData(record);
    },
    dealRemoveData : function(record){
        for(var i = 0; i < this.removeData.length; i++){
            if(this.removeData[i].get("function_code") == record.get("function_code")){
                return;
            }
        }
        this.removeData.push(record);
    },
    sendRemoveData : function(){
        for(var i = 0; i < this.removeData.length; i++) {
            this.screenData.remove(this.removeData[i]);
        }
    }
})