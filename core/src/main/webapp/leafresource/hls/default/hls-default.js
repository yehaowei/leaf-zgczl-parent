(function ($) {
    $.fn.extend({
        hlsRadio: function (opt) {
            if ($.isEmptyObject(opt) || $.isEmptyObject(opt.items)) throw new ReferenceError('hlsRadio未定义选择项');
            var $ele = $(this), items = opt.items, html = '', id = (this[0].id || 'radio'),
                model = opt.bindModel && window[opt.bindModel] || window['viewModel'];
            var exec = /value:(\S*),?/;
            //多选
            // if(!model.isChecked) model.isChecked = false;
            var itId = id + 'item-id'
            items.forEach(function (item, index) {
                html += '<div class="hls-radio-item">';
                html += '<input type="checkbox"  id="' + (itId + index) + '" data-value="' + (item.value || '') + '"   class="def-checkbox"/>'
                html += '<label for="' + (itId + index) + '" style="float:left;"></label>';
                html += '<span class="row-text">' + (item.label || '') + '</span>';
                html += '</div>';
            });
            $ele.html(html);
            $("#" + id).click(function (event) {
                var node = event.target, $input = $(node).prev();
                if (node.nodeType === 1 && node.nodeName.toLowerCase() === 'label') {

                    $('#' + id + " input.def-checkbox").not($input).removeAttr("checked");

                    if ($input.is(':checked')) {
                        model.set($ele.data("bind").match(exec)[1].split(',')[0], null);
                    } else {
                        model.set($ele.data("bind").match(exec)[1].split(',')[0], $input.data('value'));
                    }

                }
            });


        },
        // grid组件
        hlsRollTable: function (opt) {
            return Def.gridDefault(this[0], opt, function (opt) {
                window[opt.id || 'hlsRecordTable'] = new HlsRollTable();
                var elem = this, hlsGrid = window[opt.id || 'hlsRecordTable'];
                hlsGrid.dataSource = opt.dataSource;
                hlsGrid._init(opt);


                // // 鼠标点击效果
                $(elem).find('table').addClass('hls-table-hover').click(function (event) {
                    var $trElem = $(event.target).closest('tr');
                    elem.isBindEvent = false;


                    if($trElem.hasClass('hls-table-active')){
                        $trElem.removeClass('hls-table-active');
                        $(elem).closest('.hls-pagging-grid').unbind('mousewheel');
                        elem.isBindEvent = false;
                    }else if ($trElem.length > 0 && $trElem.closest('tbody').length > 0) {
                        $trElem.addClass('hls-table-active').siblings().removeClass('hls-table-active');
                        if(!elem.isBindEvent){
                            $(elem).closest('.hls-pagging-grid').unbind('mousewheel').bind('mousewheel', function (e) {
                                console.log(1);
                                var $trElem = $(elem).find('table > tbody > tr').filter('.hls-table-active');
                                if ($trElem.length > 0) {
                                    if (e.originalEvent.wheelDelta > 0) {  // 向上滚动
                                        if ($trElem.prev().length > 0) {
                                            $trElem.prev().addClass('hls-table-active');
                                            $trElem.removeClass('hls-table-active');
                                        } else {
                                            $trElem.removeClass('hls-table-active');
                                            hlsGrid.prev();
                                            $(elem).find('table > tbody > tr').last().addClass("hls-table-active");
                                        }
                                    } else { // 向下滚动
                                        if ($trElem.next().length > 0) {
                                            $trElem.next().addClass('hls-table-active');
                                            $trElem.removeClass('hls-table-active');
                                        } else {
                                            $trElem.removeClass('hls-table-active');
                                            hlsGrid.next();
                                            $(elem).find('table > tbody > tr').first().addClass("hls-table-active");
                                        }
                                    }
                                }
                                e.preventDefault();
                            });
                            elem.isBindEvent = true;
                        }

                    }

                });


            });
        },
        hlsRecordTable: function (opt) {
            return Def.gridDefault(this[0], opt, function (opt) {
                var obj = {};
                // 用来存当前操作的那个tr
                var $tr = [];
                // 判断是哪种方式的模板
                if (opt.template) { // 1.template方式
                    opt.columns = [{
                        template: eval(opt.template)
                    }];
                    obj = new HlsConponentGrid();
                } else {
                    obj = new HlsRecordTable();

                }


                if (opt.readKey) {
                    // 查询该组件清除的记录
                    $.ajaxSetup({async: false});
                    $.get(_basePath + '/frm/widget/user/operation/query', {
                        operateType: 'CLEAR',
                        widgetTagId: opt.id
                    }, function (datas) {
                        if (datas.success && datas.rows.length > 0) {

                            var  array = datas.rows, keyValueArr = [], str = '';

                            array.forEach(function (item){
                                keyValueArr.push(item.keyValue);
                            });

                            str = keyValueArr.join(',');
                            opt.hlsDataSource = opt.hlsDataSource.filter(function(item){
                                return (str.indexOf(item[opt.readKey]) === -1)
                            });
                        }

                    });
                }
                obj.dataSource = opt.dataSource;
                obj._init(opt);

                var $pop = Pops.get('pop');
                $closeIcon = $('<span class="hls-pop-close">x</span>'),
                    $selectPop = Pops.get('selectPop');
                $pop.appendTo('body');
                $selectPop.appendTo('body');

                if (opt.readFlag){
                    $(document).on('click', '.hls-pop-close', function (event) {
                        if ($selectPop.is(':visible')) {
                            $selectPop.hide();
                        }
                        if (!$(this).closest('.hls-pop-body').length > 0) {
                            $tr = $(this).closest('tr');
                            $selectPop.css({
                                top: $closeIcon.offset().top - 5 + 'px',
                                right: ($(window).width() - ($closeIcon.offset().left + $closeIcon.width() + 10)) + 'px'
                            });
                            $selectPop.show(500);
                        }
                        event.preventDefault();
                    });

                    $(document).on('click', '.hls-pop-clean-button', function (event) {
                        // 新增一条记录到数据库

                        Hls.submit({
                            mask:false,
                            url:_basePath + '/frm/widget/user/operation/submit',
                            data:[{
                                keyValue:opt.hlsDataSource[$tr.index()][opt.readKey],
                                widgetTagId:opt.id,
                                operateType:'CLEAR',
                                __status:'add'
                            }],
                            success:function(result){
                                if (result.success) {
                                    $selectPop.hide();
                                    $tr.css('background','#e8e8e8').find('td').unbind();

                                    // top.Hls.showInfoDialog("清除成功",function (){
                                    // });
                                }else{
                                    top.Hls.showErrorMessage("清除失败");
                                }
                            }
                        });
                        event.preventDefault();
                    });


                    // td 滑动带关闭
                    $(this).find('table > tbody > tr > td').hover(function (event) {
                        $(this).append($closeIcon);
                    }, function (event) {
                        $closeIcon.remove();
                    });
                    $(window).resize(function () {
                        if ($selectPop.is(':visible')) {
                            $selectPop.hide();
                        }
                    });
                }


                window[opt.id || 'hlsRecordTable'] = obj;
            });


        },
        hlsBusinessTable: function (opt) {
            return Def.gridDefault(this[0], opt, function (opt) {
                var obj = {};

                // 判断是哪种方式的模板
                if (opt.template) { // 1.template方式
                    opt.columns = [{
                        template: eval(opt.template)
                    }];
                    obj = new HlsConponentGrid();
                    obj.dataSource = opt.dataSource;
                    obj._init(opt);
                } else {
                    obj = new HlsBusinessTable();
                    obj.dataSource = opt.dataSource;
                    obj._init(opt);
                }
                window[opt.id || 'hlsBusinessTable'] = obj;
            });
        },
        hlsSimpleTable: function (opt) {
            // return Def.default(this[0],opt,function(opt){
            //     window[opt.id || 'hlsCountTable'] = new HlsConponentGrid();
            //     window[opt.id || 'hlsCountTable'].dataSource = opt.dataSource;
            //     window[opt.id || 'hlsCountTable']._init(opt);
            // });
            window[opt.id || 'hlsSimpleTable'] = new HlsConponentGrid();
            window[opt.id || 'hlsSimpleTable'].dataSource = opt.dataSource;
            window[opt.id || 'hlsSimpleTable']._init(opt);
            // $(this).find('table').addClass('hls-count-table-hover');
            return $(this);

        },
        hlsProgressChart: function (opt) {
            $(this).empty();
            $(this).append('<div class="progress-title"></div><div class="progress"></div>');

            if ($.isEmptyObject(opt) || $.isEmptyObject(opt.items)) throw new ReferenceError('hlsProgressChart:参数未配置');
            var items = opt.items;

            // function getArrayObj(name, args) {
            //     var i = 0, len = source.length, result = {};
            //     for( ; i < len ; i++){
            //         if (source[i][args[0]] === name) {
            //             result.count = source[i][args[1]];
            //             result.description = source[i][args[2]];
            //             break;
            //         }
            //     }
            //     return result;
            // }


            // if($.isArray(opt.hlsDataSource)){
            //     var m = [];
            //     items.forEach(function (item) {
            //         m[0][item.name] =
            //     });
            //     opt.hlsDataSource = m;
            // }

            var $progress = $(this).find('.progress'),
                $progressTitle = $(this).find('.progress-title');

            items.forEach(function (item) {
                var barWidth = opt.hlsDataSource[0][item.name] || '20%',
                    $barTemplate = $('<div data-description="' + (item.description || '') + '" class="progress-bar progress-bar-striped active"    style="width: 2em;min-width: 2em;" >' + barWidth + '</div>');
                if (true) {
                    $barTemplate.animate({width: barWidth}, 500);
                    // $barTemplate.addClass('active');
                }
                else {
                    $barTemplate.css({
                        'width': barWidth || '20%'
                    });
                }
                $barTemplate.css({
                    'background-color': item.color || '#42a5f5'
                });

                if (item.description) {
                    var $cont = $('<div style="display: inline;margin-right:10px;font-size:13px;"><i style="display:inline-block;width:12px;height: 12px;margin-right:6px; border-radius: 100%;background-color:' + (item.color || '#42a5f5') + '"></i><span>' + item.description + '</span></div>');
                    $progressTitle.append($cont);
                }
                $progress.append($barTemplate);
            });


            // $progress.css({'height':'auto'}).children('div').hover(function (event) {
            //     $(this).animate({
            //        height:'+=10px'
            //     },500);
            // },function (event) {
            //
            // });

            var $pop = Pops.get('pop');
            $pop.appendTo('body');
            $progress.children('div').hover(function (event) {
                $pop.show().css({
                    left: (event.pageX + 10) + 'px',
                    top: (event.pageY + 10) + 'px'
                }).html('<p>' + $(this).data('description') + '</p><p>' + $(this).html() + '</p>')
            }, function (event) {
                $pop.hide();
            });

            $progress.children('div').bind('mousemove', function (event) {
                if ($pop.is(":visible")) {
                    console.log(event.pageX);
                    $pop.css({
                        left: (event.pageX + 10) + 'px',
                        top: (event.pageY + 10) + 'px'
                    })
                }
            });

            return $(this);
        },
        hlsDonutChart: function (opt) {
            return Def.chartDefault(this[0], opt, function (opt) {
                var obj = {};
                obj = new HlsDonutChart();
                obj.init(opt);
                window[opt.id || 'hlsDonutChart'] = obj;


                //图形切换事件
                $(document).on('click','#' + opt.id + ' .chart-switch',function(event){
                    var targetElem = $(event.target);
                    if(targetElem.hasClass('donut-btn')){ // 环形图
                        targetElem.addClass('chart-active').siblings().removeClass('chart-active');
                        opt.chartType = 'donut';
                        obj.init(opt);
                    }
                    if(targetElem.hasClass('bar-btn')){ // 柱形图
                        targetElem.addClass('chart-active').siblings().removeClass('chart-active');
                        opt.chartType = 'bar';
                        obj.init(opt);
                    }
                });

                //图形鼠标hover事件
                $(document).on('mouseover click','#' + opt.id + ' .bar-item',function(event){
                    var $targetElem = $(event.target),
                        $barItemElem = $(this),
                        index = $barItemElem.index(),
                        dataItem = opt.hlsDataSource[index];

                    if($targetElem.hasClass('bar')){
                        if(event.type === 'mouseover'){
                            $targetElem.addClass('chart-bar-active');
                            $(this).siblings().find('.bar').removeClass('chart-bar-active');
                            obj.elems.$barChartTitle.html(dataItem.description + '&nbsp;' + dataItem.count);

                            //
                        }
                        if(event.type === 'click'){
                            window[opt.clickFunc](index, dataItem);
                        }
                    }
                });
            });
        }
    });

    // 组件所需的弹出层
    window.Pops = {
        _source: {
            'pop': '<div class="hls-text-len-hidden-pop-window"></div>',
            'selectPop':'<div class="hls-pop-body"><span class="hls-pop-close">x</span><button class="hls-pop-clean-button">清除</button><button class="hls-pop-button">收藏</button></div>',
            'gridPop':'<div class="hls-grid-pop-body"><button class="excel-button">excel</button><button class="table-button">透视表</button></div>'
        },
        _elem: {},
        _create: function (name,context) {
            var created = this._elem[name] = $(this._source[name]).appendTo(context || 'body');
            return created;
        },
        _delete:function(name){
            delete this._elem[name];
        },
        _hasElem:function(name,context){
            return !!context ? (this._elem[name] && $.contains($(context)[0],this._elem[name][0])): !!(this._elem[name]);
        },
        get: function (name,context) { // 接收两个参数, 参数1：名字  参数2：插入到哪个dom元素中（默认当前文档的body）
            return this._hasElem(name,context) ? this._elem[name] : this._create(name,context);
        }
    };
})(jQuery);


/**
 * 抽象
 */
Def = (function () {
    return {
        chartDefault: function (elem, opt, callback) {
            $(elem).unbind().empty();
            opt.hlsDataSource = Array.isArray(opt.hlsDataSource) ? this.chartDataSetFormat(opt.hlsDataSource, opt.items, opt.key, opt.countKey) : this.chartSimpleDataSetFormat(opt.hlsDataSource, opt.items);
            callback.call(elem, opt);
        },
        gridDefault: function (elem, opt, callback) {
            $(elem).unbind().empty();
            callback.call(elem, opt);
            // 鼠标划过效果
            // // 鼠标点击效果
            // $(elem).find('table').addClass('hls-table-hover').click(function (event) {
            //     var $trElem = $(event.target).closest('tr');
            //     if ($trElem.length > 0 && $trElem.closest('tbody').length > 0) {
            //         $trElem.addClass('hls-table-active').siblings().removeClass('hls-table-active');
            //     }
            // });


            // 溢出提示效果

            $(document).on('mouseover mouseout mousemove', '.hls-text-len-hidden', function (event) {
                var $elem = $(this), $pop = Pops.get('pop');
                if (event.type === 'mouseover') {
                    if ($elem.width() < $elem[0].scrollWidth) {
                        $pop.show().css({
                            left: (event.pageX + 10) + 'px',
                            top: (event.pageY + 10) + 'px'
                        }).html($(this).html());
                    }
                }
                if (event.type === 'mouseout') {
                    $pop.hide();
                }
                if (event.type === 'mousemove') {
                    if ($pop.is(":visible")) {
                        $pop.css({
                            left: (event.pageX + 10) + 'px',
                            top: (event.pageY + 10) + 'px'
                        })
                    }
                }

                event.preventDefault();
            });

            return $(elem);
        },
        // chart数据源转为标准数据源
        chartDataSetFormat: function (source, template) {
            if ($.isEmptyObject(template)) throw new ReferenceError("chartDataSetFormat():需要传入模板");

            function getMapObj(name, args) {
                var i = 0, len = source.length, result = {};
                for (; i < len; i++) {
                    if (source[i][args[0]] === name) {
                        result.count = source[i][args[1]];
                        result.description = source[i][args[2]];
                        break;
                    }
                }
                return result;
            }

            var dataSet = [],
                i = 0;
            for (; i < template.length; i++) {
                var m = getMapObj(template[i].name, Array.prototype.slice.call(arguments, 2));
                var t = {
                    id: template[i].name,
                    count: m.count || 0,
                    color: template[i].color,
                    description: m.description || template[i].description,
                    index: i
                };
                dataSet.push(t);
            }
            return dataSet;
        },
        chartSimpleDataSetFormat: function (source, template) {
            var dataSet = [];
            template.forEach(function (item) {
                var m = {};
                m['id'] = item.name;
                m['color'] = item.color;
                m['description'] = item.description;
                m['count'] = source[item.name] || 0;
                dataSet.push(m);
            });
            return dataSet;
        },
        validate: function (opt, type) {
            try {
                if (!opt) {
                    throw new ReferenceError("参数未定义");
                }
                switch (type) {

                }
            } catch (e) {
                throw e;
            }
        },
        nullProcessing: function (source) {
            for (var key in source) {
                if (typeof source[key] === 'object' && source[key] != null) {
                    arguments.callee(source[key])
                } else {
                    if (!source[key]) source[key] = '--';
                }
            }
        }
    };
})();
