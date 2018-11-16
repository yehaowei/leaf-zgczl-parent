/**
 * Created by wangwei on 2017-2-14.
 */


function taskInit(contextPath) {

    Leaf.request({
        url: $('bmLink_home_zj_wfl_to_do_list_count_query').getUrl(),
        scope: this,
        success: function (res) {
            if (res.result.record){
                var datas = res.result.record;
                $jq("#task-count").append(datas.list_count);
                var readRadios=0;
                // draw_circle('row-notice-left-circle-canvas', datas.rows[0].readRadio/100, '#FFE092');
                if(datas.read_radio!=""&&datas.read_radio!=null){
                    readRadios=datas.read_radio;

                    $jq("#task-percent-span").append(readRadios+'%');
                }else{
                    $jq("#task-percent-span").append('--');
                }
                $jq('#row-task-left-circle-canvas').attr("data-percent",readRadios);


                InitiateEasyPieChart.init('row-task-left-circle-canvas');
            }else{
                $jq("#task-percent-span").append('--');
                $jq("#task-count").append(0);
                // draw_circle('row-task-left-circle-canvas', 0, '#FFE092');
                $jq("#task-percent-span").append(100+'%');
                $jq('#row-task-left-circle-canvas').attr("data-percent",0);
            }
        }
    });

    initMainSize();
}


