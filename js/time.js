addLoadEvent(getTime);
addLoadEvent(change);
addLoadEvent(getSay);

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
//获取当前时间
function getTime() {
    var myDate = new Date();
    var hour = (myDate.getHours() < 10 ? '0' : '') + myDate.getHours();
    var minute = (myDate.getMinutes() < 10 ? '0' : '') + myDate.getMinutes();
    var hour1 = 06,
        hour2 = 12,
        hour3 = 18;
    var html = "";
    html += "<div id='time'>" + hour + ":" + minute + "</div>";
    if (hour >= hour1 && hour < hour2) {
        html += "Good morning, Strick.";
    } else if ((hour >= hour2) && (hour < hour3)) {
        html += "Good afternoon, Strick.";
    } else {
        html += "Good evening, Dear Strick.";
    }
    center.innerHTML = html;
    setTimeout("getTime()", 1000 * 10); //10秒钟调用一次
}
// 每天换背景图片
function change() {
    var myDate = new Date();
    flag = myDate.getDate(); //获取当前日(1-31)
    var temp = document.getElementsByTagName("body");
    //temp[0].style.background="#FCFCFC url(./img/background/"+flag+".jpg) no-repeat fixed";
    temp[0].style.background = "#FCFCFC url(./img/background/5.jpg) no-repeat fixed"; //这段代码仅作演示用，若想实现每天更换背景图请使用上一段代码
    temp[0].style.backgroundSize = "cover";
}
//获取say
function getSay() {
    var myDate = new Date();
    day = myDate.getDate();
    var xmlHttp;
    var bottom = document.getElementById("bottom");
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    xmlHttp.open("GET", "./say.json", true);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var jsonText = JSON.parse(xmlHttp.responseText);
            bottom.innerHTML = "“" + jsonText.say[day - 1] + "”";
        }
    }
    xmlHttp.send(null);
}