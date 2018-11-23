/**
 * Created by wangwei on 2017-2-14.
 */

function noticeInit(contextPath) {

    
    Leaf.request({
        url: $('bmLink_home_sys_announcement_count_query').getUrl(),
        scope: this,
        success: function (res) {
            if (res.result.record) {
                var datas = res.result.record;
                $jq("#notice-count").append(datas.list_count);
                var readRadios=0;
                // draw_circle('row-notice-left-circle-canvas', datas.rows[0].readRadio/100, '#FFE092');
                if(datas.read_radio!=""&&datas.read_radio!=null){
                    readRadios=datas.read_radio;
                    $jq("#notice-percent-span").append(readRadios+'%');
                }else{
                    $jq("#notice-percent-span").append('--');
                }

                $jq('#row-notice-left-circle-canvas').attr("data-percent",readRadios);



                InitiateEasyPieChart.init('row-notice-left-circle-canvas');
            }else{
                $jq("#notice-percent-span").append('--');
                $jq("#notice-count").append(0);
                // draw_circle('row-notice-left-circle-canvas', 0, '#FFE092');
                $jq('#row-notice-left-circle-canvas').attr("data-percent",0);
            }

        }
    });

}


