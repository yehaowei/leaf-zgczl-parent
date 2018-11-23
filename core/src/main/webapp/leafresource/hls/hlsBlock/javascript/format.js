/**
 * Created by syj on 2017-3-1.
 */

/**
 * Created by syj on 2017-2-20.
 */
/*function formatDate(date,fmt) {

    var time = new Date(date);
    if(!fmt){
        fmt = 'yyyy-MM-dd';
    }
    var o = {
        "M+" : time.getMonth()+1,                 //月份
        "d+" : time.getDate(),                    //日
        "h+" : time.getHours(),                   //小时
        "m+" : time.getMinutes(),                 //分
        "s+" : time.getSeconds(),                 //秒
        "q+" : Math.floor((time.getMonth()+3)/3), //季度
        "S"  : time.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (time.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }

    return fmt;
}*/
function formatDate(data) {
    if (!data) return false;
    return (/\d{4}-\d{1,2}-\d{1,2}/g).exec(data);
}


function formatCurrency(num) {
    var sign="";
    if(isNaN(num))
    {
        num = 0;
    }
    if(num<0)
    {
        sign="-";
        num = num * -1;
    }
    var strNum=num+"";
    var arr1 = strNum.split(".");
    var hasPoint=false;//是否有小数部分
    var piontPart="";//小数部分
    var intPart=strNum;//整数部分
    if(arr1.length>=2)
    {
        hasPoint=true;
        piontPart= arr1[1];
        intPart=arr1[0];
    }

    var res='';//保存添加逗号的部分
    var intPartlength=intPart.length;//整数部分长度
    var maxcount=Math.ceil(intPartlength/3);//整数部分需要添加几个逗号
    for (var i = 1; i <=maxcount;i++)//每三位添加一个逗号
    {
        var startIndex=intPartlength-i*3;//开始位置
        if(startIndex<0)//开始位置小于0时修正为0
        {
            startIndex=0;
        }
        var endIndex=intPartlength-i*3+3;//结束位置
        var part=intPart.substring(startIndex,endIndex)+",";
        res=part+res;
    }
    res=res.substr(0,res.length-1);//去掉最后一个逗号


    if(piontPart.length == 1){
        piontPart = piontPart + '0';
    }else if(piontPart.length>2){
        piontPart = piontPart.substring(0,2);
    }


    if(hasPoint)
    {
        return sign+res+"."+piontPart;
    }
    else
    {
        return sign+res+ ".00";
    }
}




//阿拉伯数字转换为简写汉字
function formatNumber(Num) {
    for (i = Num.length - 1; i >= 0; i--) {
        Num = Num.replace(",", "")//替换Num中的“,”
        Num = Num.replace(" ", "")//替换Num中的空格
    }
    if (isNaN(Num)) { //验证输入的字符是否为数字
        //alert("请检查小写金额是否正确");
        return;
    }
    //字符处理完毕后开始转换，采用前后两部分分别转换
    part = String(Num).split(".");
    newchar = "";
    //小数点前进行转化
    for (i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
            //alert("位数过大，无法计算");
            return "";
        }//若数量超过拾亿单位，提示
        tmpnewchar = ""
        perchar = part[0].charAt(i);
        switch (perchar) {
            case "0":  tmpnewchar = "零" + tmpnewchar;break;
            case "1": tmpnewchar = "一" + tmpnewchar; break;
            case "2": tmpnewchar = "二" + tmpnewchar; break;
            case "3": tmpnewchar = "三" + tmpnewchar; break;
            case "4": tmpnewchar = "四" + tmpnewchar; break;
            case "5": tmpnewchar = "五" + tmpnewchar; break;
            case "6": tmpnewchar = "六" + tmpnewchar; break;
            case "7": tmpnewchar = "七" + tmpnewchar; break;
            case "8": tmpnewchar = "八" + tmpnewchar; break;
            case "9": tmpnewchar = "九" + tmpnewchar; break;
        }
        switch (part[0].length - i - 1) {
            case 0: tmpnewchar = tmpnewchar; break;
            case 1: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
            case 2: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
            case 3: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
            case 4: tmpnewchar = tmpnewchar + "万"; break;
            case 5: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
            case 6: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
            case 7: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
            case 8: tmpnewchar = tmpnewchar + "亿"; break;
            case 9: tmpnewchar = tmpnewchar + "十"; break;
        }
        newchar = tmpnewchar + newchar;
    }
    //替换所有无用汉字，直到没有此类无用的数字为止
    while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
        newchar = newchar.replace("零亿", "亿");
        newchar = newchar.replace("亿万", "亿");
        newchar = newchar.replace("零万", "万");
        newchar = newchar.replace("零零", "零");
    }
    //替换以“一十”开头的，为“十”
    if (newchar.indexOf("一十") == 0) {
        newchar = newchar.substr(1);
    }
    //替换以“零”结尾的，为“”
    if (newchar.lastIndexOf("零") == newchar.length - 1) {
        newchar = newchar.substr(0, newchar.length - 1);
    }
    return newchar;
}


function formatCurrencyUnsigned(num){
    if(!num || isNaN(num)) return '0.00';
    num = parseFloat(num);
    return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}

//阿拉伯数字转换为繁体汉字
function formatTranNumber(Num) {
    for (i = Num.length - 1; i >= 0; i--) {
        Num = Num.replace(",", "")//替换Num中的“,”
        Num = Num.replace(" ", "")//替换Num中的空格
    }
    if (isNaN(Num)) { //验证输入的字符是否为数字
        //alert("请检查小写金额是否正确");
        return;
    }
    //字符处理完毕后开始转换，采用前后两部分分别转换
    part = String(Num).split(".");
    newchar = "";
    //小数点前进行转化
    for (i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
            //alert("位数过大，无法计算");
            return "";
        }//若数量超过拾亿单位，提示
        tmpnewchar = ""
        perchar = part[0].charAt(i);
        switch (perchar) {
            case "0": tmpnewchar = "零" + tmpnewchar;break;
            case "1": tmpnewchar = "壹" + tmpnewchar; break;
            case "2": tmpnewchar = "贰" + tmpnewchar; break;
            case "3": tmpnewchar = "叁" + tmpnewchar; break;
            case "4": tmpnewchar = "肆" + tmpnewchar; break;
            case "5": tmpnewchar = "伍" + tmpnewchar; break;
            case "6": tmpnewchar = "陆" + tmpnewchar; break;
            case "7": tmpnewchar = "柒" + tmpnewchar; break;
            case "8": tmpnewchar = "捌" + tmpnewchar; break;
            case "9": tmpnewchar = "玖" + tmpnewchar; break;
        }
        switch (part[0].length - i - 1) {
            case 0: tmpnewchar = tmpnewchar; break;
            case 1: if (perchar != 0) tmpnewchar = tmpnewchar + "拾"; break;
            case 2: if (perchar != 0) tmpnewchar = tmpnewchar + "佰"; break;
            case 3: if (perchar != 0) tmpnewchar = tmpnewchar + "仟"; break;
            case 4: tmpnewchar = tmpnewchar + "万"; break;
            case 5: if (perchar != 0) tmpnewchar = tmpnewchar + "拾"; break;
            case 6: if (perchar != 0) tmpnewchar = tmpnewchar + "佰"; break;
            case 7: if (perchar != 0) tmpnewchar = tmpnewchar + "仟"; break;
            case 8: tmpnewchar = tmpnewchar + "亿"; break;
            case 9: tmpnewchar = tmpnewchar + "拾"; break;
        }
        newchar = tmpnewchar + newchar;
    }
    //替换所有无用汉字，直到没有此类无用的数字为止
    while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
        newchar = newchar.replace("零亿", "亿");
        newchar = newchar.replace("亿万", "亿");
        newchar = newchar.replace("零万", "万");
        newchar = newchar.replace("零零", "零");
    }
    //替换以“一十”开头的，为“十”
    if (newchar.indexOf("壹拾") == 0) {
        newchar = newchar.substr(1);
    }
    //替换以“零”结尾的，为“”
    if (newchar.lastIndexOf("零") == newchar.length - 1) {
        newchar = newchar.substr(0, newchar.length - 1);
    }
    return newchar;
}