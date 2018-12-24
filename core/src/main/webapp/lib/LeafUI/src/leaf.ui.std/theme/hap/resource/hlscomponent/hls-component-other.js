

/**
 *[组件-HlsSelectBar]
 */
function HlsSelectBar(){

}
hlsExtend(HlsSelectBar, HlsConponentBase);

HlsSelectBar.prototype._init = function (opt){
    this.opt = {};
    $.extend(true, this.opt, opt || {});
    this.renderUI();
}

HlsSelectBar.prototype.renderUI = function () {
    console.log(this.opt);
    var items = this.opt.items;
    var appendHtml = '';
    if(items){
        for(var i=0; i<items.length; i++){
            appendHtml += '<li>';
            appendHtml += '<div onclick="'+ items[i].click+ '(event)"  class="contain" >';
            appendHtml += '<img id = "' + items[i].imgId+ '" height="30" width="30" style="margin-top:5px;" ';
            appendHtml += 'src = " '+ items[i].img +' " /> ';
            appendHtml += '<div id = " '+ items[i].textId+' " class="text-content-right" style="background-color: '+ items[i].color +' ;"> ';
            appendHtml += items[i].description;
            appendHtml += '</div>';
            appendHtml += '</div>';
            appendHtml += '</li>';
        }
    }
    $("#"+this.opt.id + " ul").html(appendHtml);
}
/****************************************** 组件-HlsSelectBar END **************************************/

/**
 *[组件-HlsTab]
 */
function HlsTab(){

}
hlsExtend(HlsTab, HlsConponentBase);

HlsTab.prototype._init = function (opt){
    var contextPath = opt.contextPath;
    this.opt = {};
    $.extend(true, this.opt, opt || {});
    this.settingParamMap();
    this.renderUI();
}

HlsTab.prototype.renderUI = function () {
    var items = this.opt.items;
    var appendHtml = '';
    if(items){
        var width = Math.floor(100/items.length) + '%';
        for(var i=0; i<items.length; i++){
            appendHtml += '<li onclick="'+ items[i].click+ '(event)"  style="width:'+width+';" id="item'+i+'" >';
            appendHtml += items[i].description;
            appendHtml += '</li>';
        }
        console.log(appendHtml);
    }
    $("#hlsTab")[0].innerHTML=appendHtml;

    var liWidth=$('#' + this.opt.id + ' ul li').eq(0).width();
    $('.tab ul li').hover(function() {
        $('.curline').stop();
        var liIndex=$(this).index();
        $('.curline').animate({
            left:liWidth*liIndex+'px'
        });
    })

}
/****************************************** 组件-HlsTab END **************************************/
/*
 [HlsQueryTab组件 ]
 */
function HlsQueryTab() {

}
hlsExtend(HlsQueryTab, HlsConponentBase);
$.extend(HlsQueryTab.prototype,{
    _init:function (opt) {
        this.opt= {
            suggestMaxHeight: '200px',//弹出框最大高度
            itemColor: '#000000',//默认字体颜色
            itemBackgroundColor: 'RGB(255,255,255)',//默认背景颜色
            itemOverColor: '#ffffff',//选中字体颜色
            itemOverBackgroundColor: '#C9302C',//选中背景颜色
            itemPadding: 3,//item间距
            fontSize: 12,//默认字体大小
            alwaysShowALL: false //点击input是否展示所有可选项
        }
        $.extend(true,this.opt,opt || {});
        this.renderUI();
    },
    renderUI:function () {
        var data = new Array();
        var opt = this.opt;
        var maxFontNumber = 0;//最大字数
        var currentItem;
        var showClickTextFunction = this.showClickTextFunction;
        var inputChange = this.inputChange;
        var dataSource = inputChange(opt);
        var suggestContainerId = opt.id +"_testInput" + "-suggest";
        var suggestContainerWidth = $('#' + opt.id +"_testInput").innerWidth();
        var suggestContainerLeft = $('#' + opt.id +"_testInput").offset().left;
        var suggestContainerTop = $('#' + opt.id +"_testInput").offset().top + $('#' + opt.id +"_testInput").outerHeight();
        var suggestContainer;
        if ($('#' + suggestContainerId)[0]) {
            suggestContainer = $('#' + suggestContainerId);
            suggestContainer.empty();
        } else {
            suggestContainer = $('<div></div>'); //创建一个子<div>
        }

        suggestContainer.attr('id', suggestContainerId);
        suggestContainer.attr('tabindex', '0');
        suggestContainer.hide();
        var _initItems = function(items) {
            suggestContainer.empty();
            for (var i = 0; i < items.length; i++) {
                if(items[i].text.length > maxFontNumber){
                    maxFontNumber = items[i].text.length;
                }
                var suggestItem = $('<div></div>'); //创建一个子<div>

                var inputValue = $('#' + opt.id +"_testInput").val();
                inputValue = inputValue.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
                var reg = new RegExp(inputValue+'');
                if(items[i].text.match(reg) != null){
                    suggestItem.attr('id', items[i].id);
                    suggestItem.append(items[i].text);
                    suggestItem.css({
                        'padding':opt.itemPadding + 'px',
                        'white-space':'nowrap',
                        'cursor': 'pointer',
                        'background-color': opt.itemBackgroundColor,
                        'color': opt.itemColor
                    });
                    suggestItem.bind("mouseover",
                        function() {
                            $(this).css({
                                'background-color': opt.itemOverBackgroundColor,
                                'color': opt.itemOverColor
                            });
                            currentItem = $(this);
                        });
                    suggestItem.bind("mouseout",
                        function() {
                            $(this).css({
                                'background-color': opt.itemBackgroundColor,
                                'color': opt.itemColor
                            });
                            currentItem = null;
                        });
                    suggestItem.bind("click",{'opt':opt,'currentItem':currentItem,'suggestContainerId':suggestContainerId} ,showClickTextFunction);
                    suggestItem.bind("click" ,opt.itemSelectFunction);
                    suggestItem.appendTo(suggestContainer);
                    var a = document.getElementById(opt.id+"_query");
                    suggestContainer.appendTo(a);
                }

            }
        }



        $('#' + opt.id +"_testInput").bind("keyup",
            function() {
                _initItems(dataSource);
            });
        // $('#' + opt.id +"_testInput").bind("blur",
        //     function() {
        //         if(!$('#' + suggestContainerId).is(":focus")){
        //
        //             $('#' + suggestContainerId).hide();
        //             if (currentItem) {
        //                 currentItem.trigger("click");
        //             }
        //             currentItem = null;
        //             return;
        //         }
        //     });
        $('#' + opt.id +"_testInput").bind("click",
            function() {
                if (opt.alwaysShowALL) {
                    _initItems(data);
                } else{
                    _initItems(dataSource);
                }
                $('#' + suggestContainerId).removeAttr("style");
                $('#' + suggestContainerId).css({
                    'border': '1px solid #ccc',
                    'height': '190px',
                    'top': '50px',
                    'left': '0px',
                    'width': '270px',
                    'position': 'absolute',
                    'font-size': opt.fontSize+'px',
                    'font-family':'Arial',
                    'z-index': 99999,
                    'background-color': '#FFFFFF',
                    'overflow-y': 'auto',
                    'overflow-x': 'hidden',
                    'white-space':'nowrap',
                    "box-shadow":'3px 3px 3px rgb(204,204,204)',
                    "border-radius":'5px',
                    "overflow":'auto'

                });
                $('#' + suggestContainerId).show();
            });
        _initItems(data);

        // $('#' + suggestContainerId).bind("blur",
        //     function() {
        //         $('#' + suggestContainerId).hide();
        //     });

        // $('#' + suggestContainerId).live("blur",function () {
        //     $(this).hidden();
        // });
        $(document).on("mouseleave","#"+suggestContainerId,function(e){
            if(e.target.id != suggestContainerId) {
                $("#" + suggestContainerId).hide();
            }
        });
        /*$(document).click(function(e){

        });*/

    },
    showClickTextFunction:function(e) {
        $('#' + e.data.opt.id +"_testInput").val(this.innerText);
        e.data.currentItem = null;
        $('#' + e.data.suggestContainerId).hide();
    },
    inputChange : function(opt) {


        var rows = new Array();
        $.ajax({
            type : 'GET',
            url : opt.url,
            async: false, //设为同步
            contentType : "application/json; charset=utf-8",
            success : function(datas) {
                var qId = opt.queryId;
                var qText = opt.queryText;
                for(var i=0;i<datas.rows.length;i++)
                {
                    rows[i] = new Object();
                    rows[i].id = datas.rows[i][qId];
                    rows[i].text = datas.rows[i][qText];
                }
            }
        });
        return rows;

    }
})
/****************************************** 组件-HlsQueryTab END **************************************/