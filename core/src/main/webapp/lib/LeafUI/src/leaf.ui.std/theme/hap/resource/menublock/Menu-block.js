/**
 * Created by hty on 2018/6/1.
 */
var InitiateEasyPieChart = function () {
    return {
        init: function (id) {
            var easypiecharts = $jq('#' + id);
            $jq.each(easypiecharts, function () {
                var barColor = getcolor($jq(this).data('barcolor')) || themeprimary,
                    trackColor = getcolor($jq(this).data('trackcolor')) || false,
                    scaleColor = getcolor($jq(this).data('scalecolor')) || false,
                    lineCap = $jq(this).data('linecap') || "round",
                    lineWidth = $jq(this).data('linewidth') || 3,
                    size = $jq(this).data('size') || 110,
                    animate = $jq(this).data('animate') || false;

                $jq(this).easyPieChart({
                    barColor: barColor,
                    trackColor: trackColor,
                    scaleColor: scaleColor,
                    lineCap: lineCap,
                    lineWidth: lineWidth,
                    size: size,
                    animate: animate
                });
            });
        }
    };
}();

function renderBlock(config, id) {
    var count = ($(config.bindtarget).getAll()[0] ?
        $(config.bindtarget).getAll()[0].data[config['count-field']] : 0);
    var radio = ($(config.bindtarget).getAll()[0] ?
        $(config.bindtarget).getAll()[0].data[config['radio-field']] : 0);
    return function () {
        $jq('#' + id + '-count').append(count);
        if (radio) {
            $jq("#" + id + "-percent-span").append('--');

        } else {
            $jq("#" + id + "-percent-span").append(radio + '%');
        }
        $jq('#row-task-left-circle-canvas').attr("data-percent", radio);

        InitiateEasyPieChart.init('row-' + id + '-left-circle-canvas');


        $jq('#left-div-' + id).click(function () {
            window[config['click-function']]();
        });

        $jq('#' + id + '-count').click(function () {
            window[config['click-function']]();
        });

    }
}