/**
 * Created by wangwei on 2017-2-14.
 */

function getTotalContractCount(contextPath) {

    Leaf.request({
        url: $('bmLink_get_total_contract_count_query').getUrl(),
        scope: this,
        success: function (res) {
            if (res.result.record) {
                if (!res.result.record.contract_count) {
                    res.result.record.contract_count = 576;
                }
                var datas = res.result.record;
                $jq("#con-contract-total-count").append(datas.contract_count);
                getInceptReceiptContractCount(datas.contract_count, contextPath);
                //getInceptNotReceiptCount(datas[0].contractCount);
                //getTerminatingCount(datas[0].contractCount);
                //getSignNotInceptCount(datas[0].contractCount);
                //getTerminateCount(datas[0].contractCount);
            } else {
                $jq("#con-contract-total-count").append('0.00%');
            }

        }
    });

}

function getInceptReceiptContractCount(conContractTotal, contextPath) {

    Leaf.request({
        url: $('bmLink_select_contract_status_info_query').getUrl(),
        scope: this,
        success: function (res) {
            if (!res.result.record) {
                res.result.record = [
                    {
                        contract_status: 'PENDING',
                        contract_status_value:'暂挂',
                        contract_count:3,
                        contract_count_percent:0.5208333333333333333333333333333333333333,
                        overdue_count:0,
                        contract_sum_count:576,
                        current_month_append:0
                    },
                    {
                        contract_status: 'BLOCK',
                        contract_status_value:'冻结',
                        contract_count:15,
                        contract_count_percent:2.60416666666666666666666666666666666667,
                        overdue_count:9,
                        contract_sum_count:576,
                        current_month_append:0
                    },
                    {
                        contract_status: 'PENDING',
                        contract_status_value:'暂挂',
                        contract_count:3,
                        contract_count_percent:0.5208333333333333333333333333333333333333,
                        overdue_count:0,
                        contract_sum_count:576,
                        current_month_append:0
                    },
                    {
                        contract_status: 'NEW',
                        contract_status_value:'新建',
                        contract_count:120,
                        contract_count_percent:20.83333333333333333333333333333333333333,
                        overdue_count:0,
                        contract_sum_count:576,
                        current_month_append:0
                    },
                    {
                        contract_status: 'SIGN',
                        contract_status_value:'签约',
                        contract_count:20,
                        contract_count_percent:3.47222222222222222222222222222222222222,
                        overdue_count:0,
                        contract_sum_count:576,
                        current_month_append:0
                    },
                    {
                        contract_status: 'CANCEL',
                        contract_status_value:'取消',
                        contract_count:3,
                        contract_count_percent:0.5208333333333333333333333333333333333333,
                        overdue_count:0,
                        contract_sum_count:576,
                        current_month_append:0
                    },
                    {
                        contract_status: 'INCEPT',
                        contract_status_value:'起租',
                        contract_count:413,
                        contract_count_percent:71.70138888888888888888888888888888888889,
                        overdue_count:29,
                        contract_sum_count:576,
                        current_month_append:0
                    },
                    {
                        contract_status: 'TERMINATE',
                        contract_status_value:'结束',
                        contract_count:2,
                        contract_count_percent:0.3472222222222222222222222222222222222222,
                        overdue_count:0,
                        contract_sum_count:576,
                        current_month_append:0
                    }
                ]
            }
            var datas = res.result.record;

            var conNewCount = 0;
            var conSignCount = 0;
            var conInceptCount = 0;
            var conEndCount = 0;
            var conCancelCount = 0;
            var conChangeCount = 0;

            var conNewCountPercent = 0;
            var conSignCountPercent = 0;
            var conInceptCountPercent = 0;
            var conEndCountPercent = 0;
            var conCancelCountPercent = 0;
            var conChangeCountPercent = 0;

            for (i = 0; i < datas.length; i++) {
                if (datas[i].contract_status == "NEW") {
                    //$jq("#new-Count").html(datas[i].contractCountPercent + '%');
                    conNewCountPercent = datas[i].contract_count_percent.toFixed(2);
                    conNewCount = datas[i].contract_count;
                }
                if (datas[i].contract_status == "SIGN") {
                    //$jq("#sign-Count").html(datas[i].contractCountPercent + '%');
                    conSignCountPercent = datas[i].contract_count_percent.toFixed(2);
                    conSignCount = datas[i].contract_count;
                }
                if (datas[i].contract_status == "INCEPT") {
                    //$jq("#incept-Count").html(datas[i].contractCountPercent + '%');
                    conInceptCountPercent = datas[i].contract_count_percent.toFixed(2);
                    conInceptCount = datas[i].contract_count;
                }
                if (datas[i].contract_status == "PENDING") {
                    //$jq("#change-Count").html(datas[i].contractCountPercent + '%');
                    conChangeCountPercent = datas[i].contract_count_percent.toFixed(2);
                    conChangeCount = datas[i].contract_count;
                }
                if (datas[i].contract_status == "TERMINATE") {
                    //$jq("#terminate-Count").html(datas[i].contractCountPercent + '%');
                    conEndCountPercent = datas[i].contract_count_percent.toFixed(2);
                    conEndCount = datas[i].contract_count;
                }
                if (datas[i].contract_status == "CANCEL") {
                    //$jq("#cancel-Count").html(datas[i].contractCountPercent + '%');
                    conCancelCountPercent = datas[i].contract_count_percent.toFixed(2);
                    conCancelCount = datas[i].contract_count;
                }
            }
            $jq("#new-Count").html(conNewCountPercent + '%');
            $jq("#sign-Count").html(conSignCountPercent + '%');
            $jq("#incept-Count").html(conInceptCountPercent + '%');
            $jq("#change-Count").html(conChangeCountPercent + '%');
            $jq("#terminate-Count").html(conEndCountPercent + '%');
            $jq("#cancel-Count").html(conCancelCountPercent + '%');

            var data = [
                {
                    label: "新建",
                    value: conNewCount
                    //color: '#58b0ff'
                },
                {
                    label: "签约",
                    value: conSignCount
                    //color: '#fd6d4c'
                },
                {
                    label: "起租",
                    value: conInceptCount
                    //color: '#e9598d'
                },
                {
                    label: "变更",
                    value: conChangeCount
                    //color: '#a5d868'
                },
                {
                    label: "结束",
                    value: conEndCount
                    //color: '#ffcf48'
                },
                {
                    label: "取消",
                    value: conCancelCount
                    // color: '#00b3b3'
                }
            ];
            baseInfoContractPie.init('row-second-middle-top-body-foot1', data);


        }
    });

    /*$jq.ajax({
        type: 'GET',
        //url: contextPath + '/csh/contract/diffContractStatusCount/query',
        url:contextPath + '/con/conHomepage/statisticalChart/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {
            /!*var inceptReceipt=0;
            var inceptNotReceipt=0;
            var terminating=0;
            var signNotIncept=0;*!/


            var conNewCount = 0;
            var conSignCount = 0;
            var conInceptCount = 0;
            var conEndCount = 0;
            var conCancelCount = 0;
            var conChangeCount = 0;

            var conNewCountPercent = 0;
            var conSignCountPercent = 0;
            var conInceptCountPercent = 0;
            var conEndCountPercent = 0;
            var conCancelCountPercent = 0;
            var conChangeCountPercent = 0;





            /!*for(i=0;i<datas.length;i++){
                if(datas[i].contract_status=="INCEPT_RECEIPT"){
                    $jq("#Incept-Receipt-Contract-Count").append( (datas[i].contractCount/conContractTotal*100).toFixed(2)+'%');
                    inceptReceipt=datas[i].contractCount;
                }
                if(datas[i].contract_status=="INCEPT_NOT_RECEIPT"){
                    $jq("#incept-Not-Receipt-Count").append( (datas[i].contractCount/conContractTotal*100).toFixed(2)+'%');
                    inceptNotReceipt=datas[i].contractCount;
                }
                if(datas[i].contract_status=="TERMINATING"){
                    $jq("#terminating-Count").append( (datas[i].contractCount/conContractTotal*100).toFixed(2)+'%');
                    terminating=datas[i].contractCount;
                }
                if(datas[i].contract_status=="SIGN_NOT_INCEPT"){
                    $jq("#sign-Not-Incept-Count").append( (datas[i].contractCount/conContractTotal*100).toFixed(2)+'%');
                    signNotIncept=datas[i].contractCount;
                }

            }
            var others=conContractTotal-inceptReceipt-inceptNotReceipt-terminating-signNotIncept;
            $jq("#terminate-Count").append( (others/conContractTotal*100).toFixed(2)+'%');*!/

            for (i = 0; i < datas.length; i++) {
                if (datas[i].contractStatus == "NEW") {
                    //$jq("#new-Count").html(datas[i].contractCountPercent + '%');
                    conNewCountPercent = datas[i].contractCountPercent;
                    conNewCount = datas[i].contractCount;
                }
                if (datas[i].contractStatus == "SIGN") {
                    //$jq("#sign-Count").html(datas[i].contractCountPercent + '%');
                    conSignCountPercent = datas[i].contractCountPercent;
                    conSignCount = datas[i].contractCount;
                }
                if (datas[i].contractStatus == "INCEPT") {
                    //$jq("#incept-Count").html(datas[i].contractCountPercent + '%');
                    conInceptCountPercent =  datas[i].contractCountPercent;
                    conInceptCount = datas[i].contractCount;
                }
                if (datas[i].contractStatus == "PENDING") {
                    //$jq("#change-Count").html(datas[i].contractCountPercent + '%');
                    conChangeCountPercent = datas[i].contractCountPercent;
                    conChangeCount = datas[i].contractCount;
                }
                if (datas[i].contractStatus == "TERMINATE") {
                    //$jq("#terminate-Count").html(datas[i].contractCountPercent + '%');
                    conEndCountPercent = datas[i].contractCountPercent;
                    conEndCount = datas[i].contractCount;
                }
                if (datas[i].contractStatus == "CANCEL") {
                    //$jq("#cancel-Count").html(datas[i].contractCountPercent + '%');
                    conCancelCountPercent=datas[i].contractCountPercent;
                    conCancelCount = datas[i].contractCount;
                }
            }
            $jq("#new-Count").html(conNewCountPercent + '%');
            $jq("#sign-Count").html(conSignCountPercent + '%');
            $jq("#incept-Count").html(conInceptCountPercent + '%');
            $jq("#change-Count").html(conChangeCountPercent + '%');
            $jq("#terminate-Count").html(conEndCountPercent + '%');
            $jq("#cancel-Count").html(conCancelCountPercent + '%');


            //合同总数
            /!*var data = [
                {
                    data: [[1, inceptReceipt]],
                    color: '#58b0ff'
                },
                {
                    data: [[1, inceptNotReceipt]],
                    color: '#fd6d4c'
                },
                {
                    data: [[1, terminating]],
                    color: '#e9598d'
                },
                {
                    data: [[1, signNotIncept]],
                    color: '#a5d868'
                },
                {
                    data: [[1, others]],
                    color: '#ffcf48'
                }
            ];*!/
            var data = [
                {
                    label: "新建",
                    value: conNewCount
                    //color: '#58b0ff'
                },
                {
                    label: "签约",
                    value: conSignCount
                    //color: '#fd6d4c'
                },
                {
                    label: "起租",
                    value: conInceptCount
                    //color: '#e9598d'
                },
                {
                    label: "变更",
                    value: conChangeCount
                    //color: '#a5d868'
                },
                {
                    label: "结束",
                    value: conEndCount
                    //color: '#ffcf48'
                },
                {
                    label: "取消",
                    value: conCancelCount
                    // color: '#00b3b3'
                }
            ];

            baseInfoContractPie.init('row-second-middle-top-body-foot1', data);

            /!*var placeholder = $jq("#row-second-middle-top-body-foot1");
            placeholder.unbind();

            $jq.plot(placeholder, data, {
                series: {
                    pie: {
                        innerRadius: 0.45,
                        show: true,
                        stroke: {
                            width: 4
                        }
                    }
                }
                ,
                grid: {
                    clickable: true
                }
            });
            //pie的点击事件
            $jq("#row-second-middle-top-body-foot1").bind("plotclick", function pieClick(event, pos, obj){
                if (!obj) {
                    return;
                }
                //根据颜色获取点击的是什么合同
               var objArray = {"#58b0ff": 'inceptReceipt', "#fd6d4c":"inceptNotReceipt","#e9598d":"terminating","#a5d868":"signNotIncept","#ffcf48":"others"};
               var color = obj.series.color;
               alert(objArray[color]+'合同清单待开发');


            });*!/
        }
    });*/
}


var baseInfoContractPie = function () {
    return {
        init: function (element_v, datas) {
            var Donut = Morris.Donut({
                element: element_v,
                data: datas,
                colors: ['#2EC3E8', '#FA6A4D', '#E75B8D', '#A0D469', '#FFCD55', '#14A9CC'],
                formatter: function (y) {
                    return y;
                }
            });
            Donut.handlers = Donut.handlers || {};
            Donut.handlers.click = Donut.handlers.click || [];
            Donut.handlers.click.push(function (arg, arg1) {
                if (arg1.label == "新建") {
                    top.openTab('CON030A', '合同综合查询', contextPath + '/cont/CON030A/contract_comprehensive_query.view?contractStatus=新建、', null, null, 'Y');
                }
                else if (arg1.label == "签约") {
                    top.openTab('CON030A', '合同综合查询', contextPath + '/cont/CON030A/contract_comprehensive_query.view?contractStatus=签约、', null, null, 'Y');
                }
                else if (arg1.label == "取消") {
                    top.openTab('CON030A', '合同综合查询', contextPath + '/cont/CON030A/contract_comprehensive_query.view?contractStatus=取消、', null, null, 'Y');
                }
                else if (arg1.label == "起租") {
                    top.openTab('CON030A', '合同综合查询', contextPath + '/cont/CON030A/contract_comprehensive_query.view?contractStatus=起租、', null, null, 'Y');
                }
                else if (arg1.label == "变更") {
                    top.openTab('CON030A', '合同综合查询', contextPath + '/cont/CON030A/contract_comprehensive_query.view?contractStatus=暂挂、', null, null, 'Y');
                }
                else if (arg1.label == "结束") {
                    top.openTab('CON030A', '合同综合查询', contextPath + '/cont/CON030A/contract_comprehensive_query.view?contractStatus=正常结清、', null, null, 'Y');
                }
            });
        }
    };
}();


function stockCountAndMonthNewCount(contextPath) {

    Leaf.request({
        url: $('bmLink_get_stock_contract_and_month_new_contract_query').getUrl(),
        scope: this,
        success: function (res) {
            if (res.result.record) {
                var datas = res.result.record;
                var radio = 1;
                if (datas) {
                    radio = (datas.stock_contract_count / (datas.stock_contract_count + datas.new_contract_count));
                    //con-percent-color-1
                }
                var width1 = (350 * radio).toFixed(0);
                var width2 = 350 - width1;
                $jq('#con-percent-color-1').width(width1);
                $jq('#con-percent-color-2').width(width2);
                //初始化完成后添加click事件
                $jq('#con-percent-color-1').click(function () {
                    alert('TOTAL合同清单待开发！');
                });
                $jq('#con-percent-color-2').click(function () {
                    alert('MONTH合同清单待开发！');
                });
            }
        }
    });


}


function conContractInit(contextPath) {
    getTotalContractCount(contextPath);
    stockCountAndMonthNewCount(contextPath);
}


