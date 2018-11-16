/**
 * Created by wangwei on 2017-2-14.
 */

function getTotalContractCount(contextPath){

    $jq.ajax({
        type: 'GET',
        url: contextPath + '/csh/contract/totalCount/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {
            if (datas[0]) {
                $jq("#con-contract-total-count").append( datas[0].contractCount);
                getInceptReceiptContractCount(datas[0].contractCount,contextPath);
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

function getInceptReceiptContractCount(conContractTotal,contextPath){
    $jq.ajax({
        type: 'GET',
        //url: contextPath + '/csh/contract/diffContractStatusCount/query',
        url:contextPath + '/con/conHomepage/statisticalChart/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {
            /*var inceptReceipt=0;
             var inceptNotReceipt=0;
             var terminating=0;
             var signNotIncept=0;*/

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

            var lable= window['${lable!}'];
            var count= window['${count!}'];
            // var lable=["新建","变更","起租","签约","取消","结束"];
            // var count=["2","4","6","8","10","0"];
            var data=[];
            for(var i=0;i<lable.length;i++){
                data.push({
                    label:lable[i],
                    value: count[i]
                })
            }
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


            baseInfoContractPie.init('row-second-middle-top-body-foot1', data);

        }
    });
}



var baseInfoContractPie = function () {
    return {
        init: function (element_v, datas) {
            // var color= window['${color!}'];
            var Donut = Morris.Donut({
                element: element_v,
                data: datas,
                colors: ['#2EC3E8', '#FA6A4D', '#E75B8D', '#A0D469', '#FFCD55', '#14A9CC'],
                // color:color,
                formatter: function (y) {
                    return y;
                }
            });
            Donut.handlers = Donut.handlers || {};
            Donut.handlers.click = Donut.handlers.click || [];
            Donut.handlers.click.push(function (arg, arg1) {
                if (arg1.label == "新建") {
                    top.openTab('CON030A','合同综合查询',contextPath+'/cont/CON030A/contract_comprehensive_query.view?contractStatus=新建、',null,null,'Y');
                }
                else if (arg1.label == "签约") {
                    top.openTab('CON030A','合同综合查询',contextPath+'/cont/CON030A/contract_comprehensive_query.view?contractStatus=签约、',null,null,'Y');
                }
                else if (arg1.label == "取消") {
                    top.openTab('CON030A','合同综合查询',contextPath+'/cont/CON030A/contract_comprehensive_query.view?contractStatus=取消、',null,null,'Y');
                }
                else if (arg1.label == "起租") {
                    top.openTab('CON030A','合同综合查询',contextPath+'/cont/CON030A/contract_comprehensive_query.view?contractStatus=起租、',null,null,'Y');
                }
                else if (arg1.label == "变更") {
                    top.openTab('CON030A','合同综合查询',contextPath+'/cont/CON030A/contract_comprehensive_query.view?contractStatus=暂挂、',null,null,'Y');
                }
                else if (arg1.label == "结束") {
                    top.openTab('CON030A','合同综合查询',contextPath+'/cont/CON030A/contract_comprehensive_query.view?contractStatus=正常结清、',null,null,'Y');
                }
            });
        }
    };
}();



function stockCountAndMonthNewCount(contextPath){

    Leaf.request({
        url: $('bmLink_get_stock_contract_and_month_new_contract_query').getUrl(),
        scope: this,
        success: function (res) {
            if (res.result.record) {
                var datas = res.result.record;
                var radio=1;
                if (datas) {
                    radio=(datas.stock_contract_count/(datas.stock_contract_count+datas.new_contract_count));
                    //con-percent-color-1
                }
                var width1=(350*radio).toFixed(0);
                var width2=350-width1;
                $jq('#con-percent-color-1').width(width1);
                $jq('#con-percent-color-2').width(width2);
                //初始化完成后添加click事件
                $jq('#con-percent-color-1').click(function(){
                    alert('TOTAL合同清单待开发！');
                });
                $jq('#con-percent-color-2').click(function(){
                    alert('MONTH合同清单待开发！');
                });
            }
        }
    });

    /*$jq.ajax({
        type: 'GET',
        url: contextPath+'/csh/contract/stockCountAndMonthNewCount/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {
            var radio=1;
            if (datas[0]) {
                radio=(datas[0].stockContractCount/(datas[0].stockContractCount+datas[0].newContractCount));
                //con-percent-color-1
            }
            var width1=(350*radio).toFixed(0);
            var width2=350-width1;
            $jq('#con-percent-color-1').width(width1);
            $jq('#con-percent-color-2').width(width2);
            //初始化完成后添加click事件
            $jq('#con-percent-color-1').click(function(){
                alert('TOTAL合同清单待开发！');
            });
            $jq('#con-percent-color-2').click(function(){
                alert('MONTH合同清单待开发！');
            });
        }
    });
*/
}



function conContractInit(contextPath) {

    getTotalContractCount(contextPath);
    stockCountAndMonthNewCount(contextPath);
}


