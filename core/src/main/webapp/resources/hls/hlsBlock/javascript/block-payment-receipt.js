/**
 * Created by wangwei on 2017-2-14.
 */

function getEveryMonthReceiptAmount(contextPath,url) {


    Leaf.request({
        url: url,
        scope: this,
        success: function (res) {
            var yearReceiptAmount = 0;
            var monthReceiptAmount = 0;
            var yearPaymentAmount = 0;
            var monthPaymentAmount = 0;
            //初始化应收
            if (!res.result.record) {
                res.result.record = [
                    {
                        write_off_month:'1',
                        write_off_due_amount:12323.2,
                        write_off_principal:121.2,
                        write_off_interest:231.23,
                        write_off_type:'PAYMENT'
                    },
                    {
                        write_off_month:'1',
                        write_off_due_amount:1232323.2,
                        write_off_principal:121.2,
                        write_off_interest:231.23,
                        write_off_type:'RECEIPT'
                    },
                    {
                        write_off_month:'5',
                        write_off_due_amount:1232323.2,
                        write_off_principal:121.2,
                        write_off_interest:231.23,
                        write_off_type:'RECEIPT'
                    },
                    {
                        write_off_month:'8',
                        write_off_due_amount:123232323.2,
                        write_off_principal:121.2,
                        write_off_interest:231.23,
                        write_off_type:'PAYMENT'
                    }
                ]
            }
                var datas = {};
                datas.rows = res.result.record;
                tmpDate = new Date();
                month = tmpDate.getMonth() + 1;
                for (i = 0; i < datas.rows.length; i++) {
                    if (datas.rows[i].write_off_type == "RECEIPT") {
                        yearReceiptAmount = yearReceiptAmount + datas.rows[i].write_off_due_amount;
                        if (month == datas.rows[i].write_off_month) {
                            monthReceiptAmount = datas.rows[i].write_off_due_amount;
                        }
                    }
                    if (datas.rows[i].write_off_type == "PAYMENT") {
                        yearPaymentAmount = yearPaymentAmount + datas.rows[i].write_off_due_amount;
                        if (month == datas.rows[i].write_off_month) {
                            monthPaymentAmount = datas.rows[i].write_off_due_amount;
                        }
                    }
                }

                $jq("#year-receipt-amount").append(formatCurrency(yearReceiptAmount.toFixed(2)));
                $jq("#month-receipt-amount").append(formatCurrency(monthReceiptAmount.toFixed(2)));
                $jq("#month-payment-amount").append(formatCurrency(monthPaymentAmount.toFixed(2)));
                $jq("#year-payment-amount").append(formatCurrency(yearPaymentAmount.toFixed(2)));
                //初始化Receipt图表
                var everyReceiptMonthStr = "";
                var monthReceiptTotalStr = "";
                var monthReceiptTotal = 0;
                for (i = 1; i <= 12; i++) {
                    var monthReceiptAmount = 0;

                    for (j = 0; j < datas.rows.length; j++) {
                        if (i == datas.rows[j].write_off_month && datas.rows[j].write_off_type == "RECEIPT") {
                            monthReceiptAmount = parseFloat((datas.rows[j].write_off_due_amount).toFixed(2));
                        }
                    }
                    monthReceiptTotal = monthReceiptTotal + monthReceiptAmount;
                    if (i == 1) {
                        everyReceiptMonthStr = everyReceiptMonthStr + monthReceiptAmount;
                        monthReceiptTotalStr = monthReceiptTotalStr + parseFloat(monthReceiptTotal.toFixed(2));
                    } else {
                        everyReceiptMonthStr = everyReceiptMonthStr + ',' + monthReceiptAmount;
                        monthReceiptTotalStr = monthReceiptTotalStr + ',' + parseFloat(monthReceiptTotal.toFixed(2));
                    }

                }
                $jq('#recepipt-span').attr("data-composite", everyReceiptMonthStr);
                $jq('#recepipt-span').text(monthReceiptTotalStr);
                //初始化Payment图表
                var everyPaymentMonthStr = 0;
                var monthPaymentTotalStr = 0;
                var monthPaymentTotal = 0;
                for (i = 1; i <= 12; i++) {
                    var monthPaymentAmount = 0;

                    for (j = 0; j < datas.rows.length; j++) {
                        if (i == datas.rows[j].write_off_month && datas.rows[j].write_off_type == "PAYMENT") {
                            monthPaymentAmount = parseFloat((datas.rows[j].write_off_due_amount).toFixed(2));
                        }
                    }
                    monthPaymentTotal = monthPaymentTotal + monthPaymentAmount;
                    if (i == 1) {
                        everyPaymentMonthStr = everyPaymentMonthStr + monthPaymentAmount;
                        monthPaymentTotalStr = monthPaymentTotalStr + parseFloat(monthPaymentTotal.toFixed(2));
                    } else {
                        everyPaymentMonthStr = everyPaymentMonthStr + ',' + monthPaymentAmount;
                        monthPaymentTotalStr = monthPaymentTotalStr + ',' + parseFloat(monthPaymentTotal.toFixed(2));
                    }
                }
                $jq('#payment-span').attr("data-composite", everyPaymentMonthStr);
                $jq('#payment-span').text(monthPaymentTotalStr);
                InitiateSparklineCharts.init();

        }
    })

}






