/**
 * Created by wangwei on 2017-2-14.
 */

function warningInit(contextPath) {


    Leaf.request({
       url: $('bmLink_home_sys_notice_count_query').getUrl(),
       scope: this,
       success: function (res) {
           if (res.result.record) {
               var datas = res.result.record;
               $jq("#warning-count").append(datas.list_count);
               var readRadios=0;
               // draw_circle('row-notice-left-circle-canvas', datas.rows[0].readRadio/100, '#FFE092');
               if(datas.read_radio!=""&&datas.read_radio!=null){
                   readRadios=datas.read_radio;
                   $jq("#warning-percent-span").append(readRadios+'%');
               }else{
                   $jq("#warning-percent-span").append('--');
               }

               $jq('#row-warning-left-circle-canvas').attr("data-percent",readRadios);
               InitiateEasyPieChart.init('row-warning-left-circle-canvas');
           }else{
               $jq("#warning-percent-span").append('--');
               $jq("#warning-count").append(0);
               // draw_circle('row-warning-left-circle-canvas', 0, '#FFE092');
               $jq('#row-warning-left-circle-canvas').attr("data-percent",0);
           }
       }
    });

}

