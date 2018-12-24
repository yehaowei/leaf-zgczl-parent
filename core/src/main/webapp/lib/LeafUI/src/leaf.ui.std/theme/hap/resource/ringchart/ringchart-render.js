/**
 * Created by hty on 2018/6/4.
 */
function renderRingChart(config, id) {
    return function () {
        var ds = $(config.bindtarget).getAll();
        var datas = window[config.datas];
        var colors = window[config.colors];
        if (ds[0]) {
            $jq("#" + id + "-total-count").append(ds[0].data[datas.sumCount]);
        }
        var html = '';
        var dataList = [];
        var colorList = [];
        ds.forEach(function (value, index) {
            var color = '#14A9CC';
            var isHad = colors.some(function (val) {
                if (value.data[datas.status] === val.status) {
                    colorList.push(val.color);
                    color = val.color;
                    return true;
                }
                return false;
            });
            if (isHad) {
                html += '<div class="row-second-middle-top-body-foot2-table">' +
                    '<div class="row-second-middle-top-body-foot2-table-div-1" style="background-color: ' + color + '"></div>' +
                    '<div class="con-status-kind-name">' + value.data[datas.value] + '</div>' +
                    '<div id="' + id + '-Count' + index + '" class="con-status-kind-per">' + value.data[datas.percent].toFixed(2) + '%</div>' +
                    '</div>';
                dataList.push({
                    label: value.data[datas.value],
                    value: value.data[datas.count]
                });
            }

        });
        document.getElementById(id + '-field-container').innerHTML += html;
        baseInfoContractPie.init(id + '-row-second-middle-top-body-foot1', dataList, colorList);
        initColorPercent(id, ds, config);
    }
}


var baseInfoContractPie = function () {
    return {
        init: function (element_v, datas, colors) {
            var Donut = Morris.Donut({
                element: element_v,
                data: datas,
                colors: colors,
                formatter: function (y) {
                    return y;
                }
            });
            Donut.handlers = Donut.handlers || {};
            Donut.handlers.click = Donut.handlers.click || [];
            // Donut.handlers.click.push(function (arg, arg1) {
            //     if (arg1.label == "新建") {
            //         top.openTab('CON030A', '合同综合查询', contextPath + '/cont/CON030A/contract_comprehensive_query.view?contractStatus=新建、', null, null, 'Y');
            //     }
            //     else if (arg1.label == "签约") {
            //         top.openTab('CON030A', '合同综合查询', contextPath + '/cont/CON030A/contract_comprehensive_query.view?contractStatus=签约、', null, null, 'Y');
            //     }
            //     else if (arg1.label == "取消") {
            //         top.openTab('CON030A', '合同综合查询', contextPath + '/cont/CON030A/contract_comprehensive_query.view?contractStatus=取消、', null, null, 'Y');
            //     }
            //     else if (arg1.label == "起租") {
            //         top.openTab('CON030A', '合同综合查询', contextPath + '/cont/CON030A/contract_comprehensive_query.view?contractStatus=起租、', null, null, 'Y');
            //     }
            //     else if (arg1.label == "变更") {
            //         top.openTab('CON030A', '合同综合查询', contextPath + '/cont/CON030A/contract_comprehensive_query.view?contractStatus=暂挂、', null, null, 'Y');
            //     }
            //     else if (arg1.label == "结束") {
            //         top.openTab('CON030A', '合同综合查询', contextPath + '/cont/CON030A/contract_comprehensive_query.view?contractStatus=正常结清、', null, null, 'Y');
            //     }
            // });
        }
    };
}();

function initColorPercent(id, ds, config) {
    var datas = window[config.datas];
    var sum = ds[0].data[datas.sumCount];
    var newSum = ds.reduce(function (sum, item) {
        return sum + item.data[datas.currentMonthAppend];
    }, 0);
    var radio = (newSum / sum);
    var width2 = (radio * 350).toFixed(0);
    var width1 = 350 - width2;
    $jq('#' + id + '-percent-color-1').width(width1);
    $jq('#' + id + '-percent-color-2').width(width2);
}
