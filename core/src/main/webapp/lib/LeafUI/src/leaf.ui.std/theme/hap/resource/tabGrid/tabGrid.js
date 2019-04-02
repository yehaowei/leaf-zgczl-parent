function tabGrid(opt){
    this.grids_opt = opt.grids;
    this.options = opt.options;
    this.id = opt.id;
    this.searchCallback = opt.searchCallback;
    this.height = opt.height;
    this.themeColor = opt.themeColor;
    this.enableSearch = opt.enableSearch;
    this.basePath = opt.basePath;
}
tabGrid.prototype={
    init:function(){
        if(!this.id){
            console.error("未定义组件id");
            return;
        }
        this.renderDom();
        this.renderStyle();
        if(this.enableSearch == "true"){
            this.addSearchEvent();
        }
        this.addTabEvent();
    },
    renderDom:function(){
        var btn_html='';
        var grid_html='';
        var id = this.id;
        var basePath = this.basePath;
        this.grids_opt.forEach(function(grid,i){
            var index = grid.index,
                btn_id = id + "_tab_btn_" +index,
                grid_id = id + "_grid_" +index,
                grid_body_id = id + "_grid_body_" +index,
                grid_foot_id = id + "_grid_foot_" +index,
                page_count_id = id + "_grid_foot_page_count_" +index,
                page_message_id = id + "_grid_foot_page_message_" +index;

            /*tab按钮dom*/
            if(i === 0){
                btn_html+='<span class="btn active" id="' + btn_id + '">';
            }else{
                btn_html+='<span class="btn" id="' + btn_id + '">';
            }
            btn_html += grid.title + '</span>';

            /*gridsDOM*/
            if(i === 0){
                grid_html+='<div class="grid active" id="' + grid_id + '">';
            }else{
                grid_html+='<div class="grid" id="' + grid_id + '">';
            }
            grid_html = grid_html
                + '<div class="grid-body" id="' + grid_body_id + '"></div>'
                + '<div class="grid-foot" id="' + grid_foot_id + '">'
                + '<span class="page-count" id="' + page_count_id + '"></span>'
                + '<span class="page-message" id="' + page_message_id + '"></span>'
                + '</div>'
                + '</div>';
        });
        if(this.enableSearch == "false" || !this.enableSearch || !this.searchCallback){
            jQuery("#" + id + " .search").css("visibility","hidden");
        }
        jQuery("#" + id + " .btns").html(btn_html);
        jQuery("#" + id + " .grids").html(grid_html);

        // render hlsRollTable
        this.grids_opt.forEach(function(grid,i){
            var ds_id = grid.bindtarget;
            var grid_id = id + "_grid_body_" + grid.index;
            var grid_opt = {};
            // var grid_opt = options;
            grid_opt.basePath = basePath;
            grid_opt.id = grid_id;
            grid_opt.ds_id = ds_id;
            grid_opt.gridSelector = "#" + grid_id;
            grid_opt.rowClick = grid.rowclick;
            grid_opt.columns = grid.columns;
            grid_opt.gridHeaderHeight = grid.gridheaderheight;
            grid_opt.gridLineHeight = grid.gridlineheight;
            grid_opt.pageControlSelector = "#" + id + "_grid_foot_" + grid.index;
            (function(grid_opt){
                if(!!grid_opt.ds_id){
                    $(grid_opt.ds_id)['on']('load', function(){
                        grid_opt.dataSource = $(grid_opt.ds_id);
                        grid_opt.hlsDataSource = $(grid_opt.ds_id).getAll();
                        jQuery("#" + grid_opt.id).hlsRollTable(grid_opt);
                        if(!!grid_opt.gridHeaderHeight){
                            jQuery("#" + grid_opt.id + " table>tr").css("height",grid_opt.gridHeaderHeight + 'px');
                        }
                        if(!!grid_opt.gridLineHeight){
                            jQuery("#" + grid_opt.id + " table tbody tr").css("height",grid_opt.gridLineHeight + 'px');
                        }
                    });
                }else{
                    console.error("组件未绑定数据源");
                }
            })(grid_opt);
        });
    },
    renderStyle:function(){
        jQuery("#" + this.id + " .grids").css("height",this.height-110 + 'px');
        jQuery("#" + this.id + " .grid-body").css("height",this.height-110-36 + 'px');
        jQuery("#" + this.id).append("<style>" +
            "#" + this.id + " .btns .active{" +
            "border-color:" + this.themeColor + ";" +
            "color:" + this.themeColor +
            ";}" +
            "#" + this.id + " .search_box .search_btn #path_search{" +
            "fill:" + this.themeColor +
            ";}</style>");
    },
    addSearchEvent:function(){
        var id = this.id;
        var searchCallback = this.searchCallback;
        jQuery("#" + id + " .search .search_btn").on('click',function(){
            var input = jQuery("#" + id + " .search .search_input").val();
            eval(searchCallback + "(input)");
        });
        jQuery("#" + id + " .search .search_input").on('keypress',function(e){
            if(e.keyCode == 13){
                var input = jQuery("#" + id + " .search .search_input").val();
                eval(searchCallback + "(input)");
            }
        });
    },
    addTabEvent:function(){
        var btnsDOM = jQuery("#" + this.id + " .btns .btn");
        var gridsDOM = jQuery("#" + this.id + " .grids .grid");
        for(var i=0;i<btnsDOM.length;i++){
            var btn = btnsDOM[i];
            btn.addEventListener('click',function(e){
                var id = e.currentTarget.id;
                var index = id.substr(id.indexOf("tab_btn_")+8);
                toggleTab(index,btnsDOM,gridsDOM);
            })
        }
    }
};
function toggleTab(index,btns,grids){
    for(var i=0;i<btns.length;i++){
        var btn = btns[i];
        var grid = grids[i];
        if(i == index){
            jQuery(btns[i]).addClass("active");
            jQuery(grids[i]).addClass("active");
        }else{
            jQuery(btns[i]).removeClass("active");
            jQuery(grids[i]).removeClass("active");
        }
    }
}
