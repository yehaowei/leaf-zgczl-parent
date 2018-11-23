/**
 * Created by wangwei on 2017-2-14.
 */
/**
 * 总金额
 */
function loadConOverDueTotal(contextPath){

    Leaf.request({
        url: $('bmLink_home_total_over_due_amount_query').getUrl(),
        scope: this,
        success: function (res) {
            if (res.result.record) {
                $jq("#con-overdue-total").append(formatCurrency(res.result.record.overdue_amount));
            } else {
                $jq("#con-overdue-total").append('￥30232.00');
            }
        }
    });

/*

    $jq.ajax({
        type: 'GET',
        url: contextPath+'/csh/ConContractCashflow/TotalOverDueAmount/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {
            if (datas) {
                $jq("#con-overdue-total").append(formatCurrency(datas));
            } else {
                $jq("#con-overdue-total").append('￥0.00');
            }
        }
    });
*/

}
/**
 * 本周
 */
function loadConOverDueWeek(contextPath){
    Leaf.request({
        url: $('bmLink_home_contract_overdue_amount_query').getUrl(),
        scope: this,
        success: function (res) {
            if (res.result.record) {
                var datas = res.result.record.overdue_amount;
                $jq("#con-overdue-week").append(formatCurrency(datas));
            } else {
                $jq("#con-overdue-week").append('￥3400.00');
            }
        }
    });

    /*
    $jq.ajax({
        type: 'GET',
        url: contextPath+'/csh/ConContractCashflow/CurrentWeekOverDueAmount/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {
            if (datas) {
                $jq("#con-overdue-week").append(formatCurrency(datas));
            } else {
                $jq("#con-overdue-week").append('￥0.00');
            }
        }
    });
*/
}

/**
 * 昨天
 */
function loadConOverDueYestoday(contextPath){

    Leaf.request({
        url: $('bmLink_home_yesterday_over_due_amount_query').getUrl(),
        scope: this,
        success: function (res) {
            if (res.result.record) {
                $jq("#con-overdue-yestoday").append(formatCurrency(res.result.record.overdue_amount));
            } else {
                $jq("#con-overdue-yestoday").append('￥2020.00');

            }
        }
    })


   /* $jq.ajax({
        type: 'GET',
        url: contextPath+'/csh/ConContractCashflow/YesterdayOverDueAmount/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {


            if (datas) {
                $jq("#con-overdue-yestoday").append(formatCurrency(datas));
            } else {
                $jq("#con-overdue-yestoday").append('￥0.00');
            }
        }
    });
*/
}

/**
 * 今天
 */
function loadConOverDueToday(contextPath){

    Leaf.request({
        url: $('bmLink_home_today_over_due_amount_query').getUrl(),
        scope: this,
        success: function (res) {
            if (res.result.record) {
                $jq("#con-overdue-today").append(formatCurrency(res.result.record.overdue_amount));
            } else {
                $jq("#con-overdue-today").append('￥252.00');
            }
        }
    });

   /* $jq.ajax({
        type: 'GET',
        url: contextPath+'/csh/ConContractCashflow/TodayOverDueAmount/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {
            if(datas){
                $jq("#con-overdue-today").append(formatCurrency(datas));
            }else{
                $jq("#con-overdue-today").append('￥0.00');
            }

        }
    });*/

}

/**
 * 图表填充
 */

function conOverdueChartInit(contextPath){

    Leaf.request({
        url: $('bmLink_home_contract_overdue').getUrl(),
        scope: this,
        success:function (res) {
            if (res.result.record){
                var datas = res.result.record;
                var amountStr=datas.overdue_amount_6+','
                    +datas.overdue_amount_5+','
                    +datas.overdue_amount_4+','
                    +datas.overdue_amount_3
                    +','+datas.overdue_amount_2
                    +','+datas.overdue_amount_1
                    +','+datas.overdue_amount;
                //('#contract-overdue-span').text(amountStr);
                $jq('#contract-overdue-span').text('1,12,1,23,22,1,1');
                InitiateSparkline2Charts.init();
            }
        }
    });
    /*$jq.ajax({
        type: 'GET',
        url: contextPath+'/csh/ConContractCashflow/LastWeekOverDueAmount/query',
        contentType: "application/json; charset=utf-8",
        success: function (datas) {
            if(datas[0]){
                var amountStr=datas[0].overdueAmount6+','
                    +datas[0].overdueAmount5+','
                    +datas[0].overdueAmount4+','
                    +datas[0].overdueAmount3
                    +','+datas[0].overdueAmount2
                    +','+datas[0].overdueAmount1
                    +','+datas[0].overdueAmount1;
                //('#contract-overdue-span').text(amountStr);
                $jq('#contract-overdue-span').text('1,12,1,23,22,1,1');
                InitiateSparkline2Charts.init();
            }


        }
    });*/

}

function initWeekContent(){
    var sysDateStr=$jq('#sysData').text();
    sysDateStr=sysDateStr.replace('年','-').replace('月','-').replace('日','');
    var year = sysDateStr.split('-')[0];
    var month = sysDateStr.split('-')[1];
    var date = sysDateStr.split('-')[2];
    var newDate =new Date(year,month - 1,date);
    var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
    $jq('#day-1').text(dayNames[newDate.getDay()]);
    newDate.setDate(newDate.getDate()-1);
    $jq('#day-2').text(dayNames[newDate.getDay()]);
    newDate.setDate(newDate.getDate()-1);
    $jq('#day-3').text(dayNames[newDate.getDay()]);
    newDate.setDate(newDate.getDate()-1);
    $jq('#day-4').text(dayNames[newDate.getDay()]);
    newDate.setDate(newDate.getDate()-1);
    $jq('#day-5').text(dayNames[newDate.getDay()]);
    newDate.setDate(newDate.getDate()-1);
    $jq('#day-6').text(dayNames[newDate.getDay()]);
    newDate.setDate(newDate.getDate()-1);
    $jq('#day-7').text(dayNames[newDate.getDay()]);
}

function loadConOverDueData(contextPath){
    loadConOverDueTotal(contextPath);
    loadConOverDueWeek(contextPath);
    loadConOverDueYestoday(contextPath);
    loadConOverDueToday(contextPath);
    conOverdueChartInit(contextPath);
    initWeekContent();
}

