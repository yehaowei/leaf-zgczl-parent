function paging() {
    this.page = 0, this.span, this.maxSize, this.td;
    return this;
}
paging.prototype = {
    init: function (t) {
        for (var e = this.body.childNodes, i = e.length - 1; i >= 0; i--)this.body.removeChild(e[i]);
        this.maxSize = Math.ceil(this.datas.length / this.pageSize);
        var s = document.createElement("table");
        s.className = 'hls-table hls-table-hover';
        this.td = new Array, this.span = new Array;
        var n = new Array, a = document.createElement("tr"), h = new Array, d = new Array;
        if (void 0 == t) {
            for (var r = 0; r < this.feildsName.length; r++)h[r] = document.createElement("td"), d[r] = document.createElement("span"), d[r].innerHTML = this.feildsName[r], h[r].appendChild(d[r]), a.appendChild(h[r]);
            s.appendChild(a)
        }
        var tbodyElem = document.createElement("tbody");
        s.appendChild(tbodyElem);
        for (var r = 0; r < this.pageSize && r < this.datas.length; r++) {
            n[r] = document.createElement("tr"), this.td[r] = new Array, this.span[r] = new Array;
            for (var o = 0; o < this.feildsName.length; o++)
                this.td[r][o] = document.createElement("td"),
                    this.span[r][o] = document.createElement("div"),
                    this.span[r][o].index = r,
                    void 0 == this.datas[r][this.feilds[o]] && "edit" == this.feilds[o] ? this.span[r][o].innerHTML = "编辑" : this.span[r][o].innerHTML = this.datas[r].data[this.feilds[o]] || '',
                    this.td[r][o].appendChild(this.span[r][o]), n[r].appendChild(this.td[r][o]);
            tbodyElem.appendChild(n[r]);
        }

        if (!this.datas || this.datas.length === 0) {
            var marginLeft = Math.abs((jQuery(this.body).width() - 50) / 2);
            //jQuery(tbodyElem).css("text-align","center");
            jQuery(tbodyElem).html('<img class="grid_no_date" style="position: absolute;width:50px;margin-top: 20px;margin-left: ' + marginLeft + 'px" src="' + this.basePath + '/leafresource/images/no_date@2x.png"/>');
            //jQuery(tbodyElem).html('<img class="grid_no_date" style="width:50px;margin-top: 20px;display: inline-block" src="' + this.basePath + '/leafresource/images/no_date@2x.png"/>');
        }

        for (var r = this.pageSize; r < this.datas.length; r++) {
            this.span[r] = new Array;
            for (var o = 0; o < this.feildsName.length; o++)
                this.span[r][o] = document.createElement("div"),
                    this.span[r][o].index = r,
                    void 0 == this.datas[r][this.feilds[o]] && "edit" == this.feilds[o] ? this.span[r][o].innerHTML = "编辑" : this.span[r][o].innerHTML = this.datas[r][this.feilds[o]]
        }
        this.body.appendChild(s), this.change()
    },
    initButton: function (datas) {
        var title = jQuery("#" + this.opt.id + "-title");
        var path = "/leafresource/images/home_page/search.png";
        jQuery("#" + this.opt.id + "-title-div").remove();
        var divcontent = jQuery("<div style='float: right;' id='" + this.opt.id + "-title-div'></div>");
        if (datas != null && datas.length) {
            for (var i = 0; i < datas.length; i++) {
                if (datas[i].type != null && datas[i].type == 'search') {
                    var queryImg = jQuery('<img class="hap_title_img hap_title_query_img" src="' + this.basePath + path + '"/>');
                    var query = jQuery('<input placeholder="' + datas[i].placeholder + '" class="hap_title_input" style="width: 0px;"/>');
                    var div = jQuery('<div class="hap_title_content"></div>');

                    query.appendTo(div);
                    queryImg.appendTo(div);
                    queryImg.width = datas[i].width;
                    queryImg.click(function () {
                        if (query.css("display") == 'none') {
                            query.show();
                            query.animate({"width": queryImg.width, "display": "inline-block"});
                        } else {
                            query.animate({"width": "0px"}, null, null, function () {
                                query.hide();
                            });
                        }
                    });
                    query.clickEvent = datas[i].click;
                    query.keyup(function (event) {
                        if (event.keyCode == 13) {
                            window[query.clickEvent](query.val());
                        }
                    });
                    div.appendTo(divcontent);
                } else if (datas[i].icon != null) {
                    jQuery('<img onclick="' + datas[i].click + '()" class="hap_title_img" src="' + this.basePath + datas[i].icon + '"/>').appendTo(divcontent);
                } else {
                    jQuery('<span class="hap_grid_button" onclick="' + datas[i].click + '()">' + datas[i].text + '</span>').appendTo(divcontent);
                }
            }
        }
        divcontent.appendTo(title);
    },
    homePage: function () {
        this.page = 0, this.change(), this.getPageInfo()
    }, lastPage: function () {
        return this.page >= 1 ? (this.page = this.page - 1, this.change(), this.getPageInfo(), void 0) : !1
    }, nextPage: function () {
        return this.page <= this.maxSize - 2 ? (this.page = parseInt(this.page) + 1, this.change(), this.getPageInfo(), void 0) : !1
    }, skipPage: function (t) {
        return this.page = t, this.page >= 0 && this.page <= this.maxSize ? (this.change(), void this.getPageInfo()) : !1
    }, change: function () {
    }, getPageInfo: function () {
        for (var t = this.page * this.pageSize, e = 0; e < this.pageSize; t++, e++)for (var i = 0; i < this.feilds.length; i++) {
            this.td[e][i].style.visibility = "visible";
            for (var s = this.td[e][i].childNodes, n = s.length - 1; n >= 0; n--)this.td[e][i].removeChild(s[n]);
            t < this.datas.length ? this.td[e][i].appendChild(this.span[t][i]) : this.td[e][i].style.visibility = "hidden "
        }
    }, setDataSourse: function (t) {
        this.datas = t
    }, getDataSourse: function () {
        return this.datas
    }, setPageSize: function (t) {
        this.pageSize = t
    }, getPageSize: function () {
        return this.pageSize
    }, setParentDiv: function (t) {
        this.body = t
    }, setFeilds: function (t) {
        this.feilds = t
    }, getFeilds: function () {
        return this.feilds
    }, setFeildsName: function (t) {
        this.feildsName = t
    }, getFeildsName: function () {
        return this.feildsName
    }, setChangeEvent: function (t) {
        this.change = t
    }, getCurrentPageNum: function () {
        return this.page
    }, modifyField: function (t, e, i, s) {
        if ("template" == i) this.span[s][t].innerHTML = e; else for (var n = 0; n < this.span.length; n++) {
            var a = this.span[n][t].innerHTML;
            i ? this.span[n][t].innerHTML = e : this.span[n][t].innerHTML = e + a
        }
    }, modifyEvent: function (t, e, i) {
        if ("template" == e)for (var s = 0; s < this.span.length; s++)i(this.datas[s], s); else for (var s = 0; s < this.span.length; s++) {
            var n = this;
            this.span[s][t].addEventListener(e, function () {
                i(n.datas[this.index])
            })
        }
    }
};
/**
 * [继承函数]
 */
function hlsExtend(Child, Parent) {
    var F = function () {
    };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
};
/**
 * [组件-列表-hlsRollTable]
 */
function HlsRollTable() {
    paging.call(this);
}
hlsExtend(HlsRollTable, paging);
jQuery.extend(HlsRollTable.prototype, {

    /**
     * _init 组件初始化
     * @param  {} opt 参数
     */
    _init: function (opt) {
        this.opt = {};
        jQuery.extend(true, this.opt, opt || {});
        this._initDom();
        this._setting();
        this._render();
    },


    /**
     * _intDom 获得要操作的节点
     */
    _initDom: function () {
        var self = this;
        self.opt.$gridDoc = jQuery(self.opt.gridSelector);
        self.opt.$pageControlMessage = jQuery(self.opt.pageControlSelector).find("span.page-message");
        self.opt.$pageControlCount = jQuery(self.opt.pageControlSelector).find("span.page-count");
        // this.pageIndexFlag = new Array();
        // for(var i = 0; i < this.opt.pageSize; i++)
        // {
        //     this.pageIndexFlag[i] = false;

        // }
    },


    /**
     * _setting 设置参数
     */
    _setting: function () {
        this.pageIndexFlag = new Array();

        for (var i = 0; i < this.pageSize; i++) {
            this.pageIndexFlag[i] = false;
        }

        var self = this;
        var colomns = this.opt.columns || [],
            feilds = [],
            feildsName = [];
        self.events = [];

        for (var j = 0, i = 0; i < colomns.length; i++) {
            if (colomns[i].template) {
                self.events[j] = {};
                /*this.events[i].editor = arr[i].editor || function(){};*/
                self.events[j].template = colomns[i].template || function () {
                    };
                self.events[j].index = i;
                j++;
            }
            feilds.push(colomns[i].name || "");
            feildsName.push(colomns[i].prompt || "");
        }
        self.setFeilds(feilds);
        self.setFeildsName(feildsName);
        self.setDataSourse(self.opt.hlsDataSource || []);
        self.setParentDiv(self.opt.$gridDoc.get(0));
        self.setPageSize(self.dataSource.pagesize || self.dataSource.totalCount);
        self.setPage(self.dataSource.currentPage);
        self.basePath = self.opt.basePath;
        self.initButton(self.opt.toolbars);
    },

    /**
     * _render 渲染组件
     */
    _render: function () {

        //主体内容部分,顶部工具条由Ftl控制
//                if(!this.opt.hidFeildsName) {
//                    this.init();
//                }else{
//
//                }
        this.init((this.feildsName && this.feildsName.length > 0) ? undefined : 1);
        this._formatCont();


        //底部控制栏
        if (this.opt.$pageControlMessage.length > 0) {
            this._gridControlRender();
        }
        this.pageIndexFlag = new Array();

        for (var i = 0; i < this.pageSize; i++) {
            this.pageIndexFlag[i] = false;
        }
    },

    /**
     *  _formatCont 内容样式格式化
     */
    _formatCont: function () {
        var self = this;
        var events = self.events;
        var columns = self.opt.columns;
        var datas = self.datas;
        //style标签
        var $headerTd = self.opt.$gridDoc.find("table tr:first-child td");
        for (var j = 0; j < columns.length; j++) {

            if (columns[j].width) {
                $headerTd.eq(j).css({
                    "width": columns[j].width
                }).addClass('hls-text-len-hidden');
            }


            if (columns[j].attributes) {
                for (var k = 0; k < self.span.length; k++) {
                    jQuery(self.span[k][j]).attr("style", columns[j].attributes.style || "");
                    if (columns[j].width) {
                        jQuery(self.span[k][j]).css({
                            "width": columns[j].width,
                        }).addClass('hls-text-len-hidden');
                    }
                }
            }

            // 当columns上存在format属性
            if (columns[j].format) {
                var format = columns[j].format.toUpperCase();
                for (var k = 0; k < self.span.length; k++) {
                    switch (format) {
                        case 'CURRENCY':
                            jQuery(self.span[k][j]).html(Hls.formatCurrency(datas[k][columns[j].name])).css("text-align", "right");
                            break;
                        case 'DATE':
                            jQuery(self.span[k][j]).html(Hls.formatDate(datas[k][columns[j].name]));
                            break;
                    }

                }
            }
        }

        //template函数
        for (var i = 0; i < events.length; i++) {
            self.modifyEvent(events[i].index, "template", function (rowdata, rowIndex) {
                var html = window[self.events[i].template](rowdata, rowIndex);
                self.modifyField(self.events[i].index, html, "template", rowIndex);
            });
        }


    },

    /**
     *  _gridControlRender 底部控制栏渲染
     */
    _gridControlRender: function () {
        var self = this, opt = this.opt;
        self.setMaxSize(Math.ceil(self.dataSource.totalCount / self.pageSize));
        self.setPageControllerBar();
    },
    setPageControllerBar: function () {
        //默认
        var self = this,
            $pageMessage = self.opt.$pageControlMessage,
            $pageCount = self.opt.$pageControlCount;
        // if(!isNaN(self.getMaxSize())){
        //     $pageCount.html(self.getCurrentPageNum() + "/" + self.getMaxSize());
        // }else{
        //     $pageCount.html(self.getCurrentPageNum() + "/" + 1);
        // }
        // $pageMessage.html("显示条目 " +  self.getCurrentRecordStartIndex()  + "-" + self.getCurrentRecordEndIndex() +" 共"+self.dataSource.totalCount+'<span style="margin-left:10px;cursor:pointer;" id="'+self.opt.id+'-refresh" class="k-icon k-i-refresh">刷新</span>');
        $pageCount.empty();
        var lastEndPageButton = jQuery('<img class="page_count_last_end_page" src="' + self.basePath + '/leafresource/images/home_page/last_end.png""/>');
        var lastPageButton = jQuery('<img class="page_count_last_page" src="' + self.basePath + '/leafresource/images/home_page/last.png"/>');
        var pageNumber = jQuery('<input value="' + self.getCurrentPageNum() + '" class="page_count_page_number""/>');
        var totalMessage = jQuery('<span class="page_count_total_message">/' + (self.getMaxSize() || 1) + '</span>');
        var nextPageButton = jQuery('<img class="page_count_next_page" src="' + self.basePath + '/leafresource/images/home_page/next.png"/>');
        var nextEndPageButton = jQuery('<img class="page_count_next_end_page" src="' + self.basePath + '/leafresource/images/home_page/next_end.png"/>');
        $pageCount.append(lastEndPageButton);
        $pageCount.append(lastPageButton);
        $pageCount.append(pageNumber);
        $pageCount.append(totalMessage);
        $pageCount.append(nextPageButton);
        $pageCount.append(nextEndPageButton);

        var str = '<span class="page_message_num">显示条目 ' + self.getCurrentRecordStartIndex() + " - " + self.getCurrentRecordEndIndex() + " 共 " + self.dataSource.totalCount + ' 条</span>';
        str += '<img class="page_message_refresh" id="' + self.opt.id + '-refresh" src="' + self.basePath + '/leafresource/images/home_page/refresh.png"/>';
        $pageMessage.html(str);


        jQuery('#' + self.opt.id + '-refresh').click(function () {
            /*this.refresh();*/
            self.dataSource.query(self.dataSource.currentPage);
        }.bind(self));

        lastPageButton.click(function () {
            self.prev();
            pageNumber.val(self.getCurrentPageNum());
        });
        lastEndPageButton.click(function () {
            self.goToPage(1);
        });
        nextEndPageButton.click(function () {
            self.goToPage(self.getMaxSize());
        });
        pageNumber.change(function () {
            self.goToPage(jQuery(this).val());
            jQuery(this).val(self.getCurrentPageNum());
        }).keydown(function (e) {
            if (e.which == 13) {
                self.goToPage(jQuery(this).val());
                jQuery(this).val(self.getCurrentPageNum());
            }
        });
        nextPageButton.click(function () {
            self.next();
            pageNumber.val(self.getCurrentPageNum());
        });
    },
    reRenaderCont: function () {
        /*Hls.mask({
         id: this.opt.gridSelector.replace('#', ''),
         html: true,
         mask:false,
         content: '<div class="progress" style="width:60px;position: absolute; left:50%;top:50%;margin-left:-40px;margin-top:-8px;height:16px;border-radius:8px;"><div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 100%"> <span class="sr-only">100% Complete (success)</span></div></div>',
         });*/

        var self = this;
        //1.清空原节点
        var $table = self.opt.$gridDoc.find("table");

        if (self.feildsName && self.feildsName.length > 0) {
            $table.children(":not(:eq(0))").remove();
        } else {
            $table.children().remove();
        }

        //2.构建新节点并且格式化样式
        var newPageData = [], paraData = {};

        jQuery.extend(paraData, {page: self.getCurrentPageNum(), pageSize: self.getPageSize()});
        // 这一段代码只存在不是根据page来分页的grid
        //=====================================
        if (!isNaN(paraData.start)) {
            paraData.start = paraData.page - 1;
        }
        //=====================================
        self.dataSource.goPage(paraData.page);
        /*self.datas = newPageData;

         var n = [];
         self.span = [];
         for (var r = 0; r < self.pageSize && r < self.datas.length; r++) {
         n[r] = document.createElement("tr"), self.td[r] = new Array, self.span[r] = new Array;
         // $(n[r]).click(function(event){
         //     $(this).addClass('hls-table-active').siblings().removeClass('hls-table-active');
         // });


         for (var o = 0; o < self.feildsName.length; o++) self.td[r][o] = document.createElement("td"), self.span[r][o] = document.createElement("div"), self.span[r][o].index = r, void 0 == self.datas[r][self.feilds[o]] && "edit" == self.feilds[o] ? self.span[r][o].innerHTML = "编辑" : self.span[r][o].innerHTML = self.datas[r][self.feilds[o]], self.td[r][o].appendChild(self.span[r][o]), n[r].appendChild(self.td[r][o]);
         $table.append(n[r]);
         }

         // 重新格式化
         self._formatCont();*/

        /*Hls.unmask();*/
    },
    reloadData: function (datas) {
        var self = this;
        var n = [];
        self.span = [];
        var $table = self.opt.$gridDoc.find("table");
        for (var r = 0; r < self.pageSize && r < self.datas.length; r++) {
            n[r] = document.createElement("tr"), self.td[r] = new Array, self.span[r] = new Array;
            // $(n[r]).click(function(event){
            //     $(this).addClass('hls-table-active').siblings().removeClass('hls-table-active');
            // });


            for (var o = 0; o < self.feildsName.length; o++)
                self.td[r][o] = document.createElement("td"),
                    self.span[r][o] = document.createElement("div"),
                    self.span[r][o].index = r,
                    void 0 == self.datas[r][self.feilds[o]] && "edit" == self.feilds[o] ? self.span[r][o].innerHTML = "编辑" : self.span[r][o].innerHTML = datas[r].data[self.feilds[o]] || '', self.td[r][o].appendChild(self.span[r][o]),
                    n[r].appendChild(self.td[r][o]);
            $table.append(n[r]);
        }

        // 重新格式化
        self._formatCont();
    },
    getCurrentRecordEndIndex: function () {
        return this.getCurrentRecordStartIndex() + Number(this.datas.length >= (+this.getPageSize()) ? this.getPageSize() : this.datas.length) - 1;
    },
    getCurrentRecordStartIndex: function () {
        return (this.getCurrentPageNum() - 1) * this.getPageSize() + 1;
    },
    prev: function () {
        //如果当前页大于1
        var self = this, opt = this.opt;
        if (self.getCurrentPageNum() > 1) {
            if (self.datas.length > self.getPageSize()) {
                self.lastPage();
            } else {
                // 重构内容
                self.setPage(self.getCurrentPageNum() - 1);
                self.reRenaderCont();
            }
            self.setPageControllerBar();
        }
    },
    refresh: function () {
        this.reRenaderCont();
    },
    next: function () {
        var self = this, opt = this.opt;
        if (self.getMaxSize() > self.getCurrentPageNum()) {
            if (self.datas.length > self.getPageSize()) {
                self.nextPage();
            } else {
                // 重构内容
                self.setPage(self.getCurrentPageNum() + 1);
                try {
                    self.reRenaderCont();
                } catch (e) {
                }
            }
            self.setPageControllerBar();
        }
    },
    goToPage: function (num) {
        var self = this, opt = this.opt;
        if (num == self.getCurrentPage()) {
            return;
        }
        if (self.getMaxSize() >= num && num > 0) {
            self.setPage(num);
            if (self.datas.length > self.getPageSize()) {
                self.clearAddTr();
                self.change();
                self.getPageInfo();
            } else {
                try {
                    self.reRenaderCont();
                } catch (e) {
                }
            }
            self.setPageControllerBar();
        }
    },
    getCurrentPage: function () {
        return this.page;
    },
    getMaxSize: function () {
        return this.maxSize;
    },
    setMaxSize: function (maxSize) {
        this.maxSize = Number(maxSize);
    },
    setPage: function (page) {
        this.page = Number(page);
    },
    lastPage: function () {
        return this.page >= 2 ? (this.page = this.page - 1, this.change(), this.clearAddTr(), this.getPageInfo(), void 0) : !1
    },
    nextPage: function () {
        return this.page <= this.maxSize - 1 ? (this.page = parseInt(this.page) + 1, this.clearAddTr(), this.change(), this.getPageInfo(), void 0) : !1
    },
    getPageInfo: function () {
        for (var t = (this.page - 1) * this.pageSize, e = 0; e < this.pageSize; t++, e++)for (var i = 0; i < this.feilds.length; i++) {
            this.td[e][i].style.visibility = "visible";
            for (var s = this.td[e][i].childNodes, n = s.length - 1; n >= 0; n--)this.td[e][i].removeChild(s[n]);
            t < this.datas.length ? this.td[e][i].appendChild(this.span[t][i]) : this.td[e][i].style.visibility = "hidden "
        }
    },
    //增加节点
    addTr: function (index, trNode) {
        index = index % this.pageSize;
        var indexOf = index;
        var tableEle = this.opt.$gridDoc.find("table").get(0);
        for (var i = 0; i < index; i++) {
            if (this.pageIndexFlag[i] == true)
                indexOf = indexOf + 1;
        }
        if (this.pageIndexFlag[index] == false) {
            tableEle.insertBefore(trNode, tableEle.childNodes[indexOf + 2]);
            this.pageIndexFlag[index] = true;
            return true;
        }
        else {
            return false;
        }
    },
    //删除节点
    deleteTr: function (index) {
        index = index % this.pageSize;
        var tableEle = this.opt.$gridDoc.find("table").get(0);
        var indexOf = index;
        for (var i = 0; i < index; i++) {
            if (this.pageIndexFlag[i] == true)
                indexOf = indexOf + 1;
        }
        if (this.pageIndexFlag[index] == true) {
            tableEle.removeChild(tableEle.childNodes[indexOf + 2]);
            this.pageIndexFlag[index] = false;
            return true;
        }
        else {
            return false;
        }
    },
    //清除所有新增节点
    clearAddTr: function () {
        var tableEle = this.opt.$gridDoc.find("table").get(0);
        for (var i = 0; i < this.pageIndexFlag.length; i++) {
            if (this.pageIndexFlag[i] == true) {
                tableEle.removeChild(tableEle.childNodes[i + 2]);
                this._formatCont();
            }
        }
        for (var i = 0; i < this.pageSize; i++) {
            this.pageIndexFlag[i] = false;
        }
    }
});

/**
 * 抽象
 */
Def = (function () {
    return {
        gridDefault: function (elem, opt, callback) {
            jQuery(elem).unbind().empty();
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

            jQuery(document).on('mouseover mouseout mousemove', '.hls-text-len-hidden', function (event) {
                var $elem = jQuery(this), $pop = Pops.get('pop');
                if (event.type === 'mouseover') {
                    if ($elem.width() < $elem[0].scrollWidth) {
                        $pop.show().css({
                            left: (event.pageX + 10) + 'px',
                            top: (event.pageY + 10) + 'px'
                        }).html(jQuery(this).html());
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

            return jQuery(elem);
        }
    };
})();

(function (jQuery) {
    jQuery.fn.extend({
        // grid组件
        hlsRollTable: function (opt) {
            return Def.gridDefault(this[0], opt, function (opt) {
                window[opt.id + '_page'] = new HlsRollTable();
                var elem = this, hlsGrid = window[opt.id + '_page'];
                hlsGrid.dataSource = opt.dataSource;
                hlsGrid._init(opt);


                // // 鼠标点击效果
                jQuery(elem).find('table').addClass('hls-table-hover').click(function (event) {
                    var $trElem = jQuery(event.target).closest('tr');
                    elem.isBindEvent = false;


                    if ($trElem.hasClass('hls-table-active')) {
                        $trElem.removeClass('hls-table-active');
                        jQuery(elem).closest('.hls-pagging-grid').unbind('mousewheel');
                        elem.isBindEvent = false;
                    } else if ($trElem.length > 0 && $trElem.closest('tbody').length > 0) {
                        $trElem.addClass('hls-table-active').siblings().removeClass('hls-table-active');
                        if (!elem.isBindEvent) {
                            jQuery(elem).closest('.hls-pagging-grid').unbind('mousewheel').bind('mousewheel', function (e) {
                                console.log(1);
                                var $trElem = jQuery(elem).find('table > tbody > tr').filter('.hls-table-active');
                                if ($trElem.length > 0) {
                                    if (e.originalEvent.wheelDelta > 0) {  // 向上滚动
                                        if ($trElem.prev().length > 0) {
                                            $trElem.prev().addClass('hls-table-active');
                                            $trElem.removeClass('hls-table-active');
                                        } else {
                                            $trElem.removeClass('hls-table-active');
                                            hlsGrid.prev();
                                            jQuery(elem).find('table > tbody > tr').last().addClass("hls-table-active");
                                        }
                                    } else { // 向下滚动
                                        if ($trElem.next().length > 0) {
                                            $trElem.next().addClass('hls-table-active');
                                            $trElem.removeClass('hls-table-active');
                                        } else {
                                            $trElem.removeClass('hls-table-active');
                                            hlsGrid.next();
                                            jQuery(elem).find('table > tbody > tr').first().addClass("hls-table-active");
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
        }
    });

    // 组件所需的弹出层
    window.Pops = {
        _source: {
            'pop': '<div class="hls-text-len-hidden-pop-window"></div>',
            'selectPop': '<div class="hls-pop-body"><span class="hls-pop-close">x</span><button class="hls-pop-clean-button">清除</button><button class="hls-pop-button">收藏</button></div>',
            'gridPop': '<div class="hls-grid-pop-body"><button class="excel-button">excel</button><button class="table-button">透视表</button></div>'
        },
        _elem: {},
        _create: function (name, context) {
            var created = this._elem[name] = jQuery(this._source[name]).appendTo(context || 'body');
            return created;
        },
        _delete: function (name) {
            delete this._elem[name];
        },
        _hasElem: function (name, context) {
            return !!context ? (this._elem[name] && jQuery.contains(jQuery(context)[0], this._elem[name][0])) : !!(this._elem[name]);
        },
        get: function (name, context) { // 接收两个参数, 参数1：名字  参数2：插入到哪个dom元素中（默认当前文档的body）
            return this._hasElem(name, context) ? this._elem[name] : this._create(name, context);
        }
    };
})(jQuery);