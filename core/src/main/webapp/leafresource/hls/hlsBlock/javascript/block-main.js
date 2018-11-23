/**
 * Created by wangwei on 2017-2-14.
 */
function draw_circle(id, percent, color) {
    var canvas = document.getElementById(id);
    if (canvas == null) {
        return false;
    }
    var context = canvas.getContext('2d');
    context.strokeStyle = color;
    context.lineWidth = "4";
    context.beginPath();
    context.arc(25, 25, 22, 0, 2 * Math.PI);
    context.stroke();
    context.strokeStyle = "#fff";
    context.beginPath();
    context.arc(25, 25, 22, -90 * Math.PI / 180, (percent * 100 * 3.6 - 90) * Math.PI / 180);
    context.stroke();
}

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

function on_day_pi() {

}

function initMainSize() {
}