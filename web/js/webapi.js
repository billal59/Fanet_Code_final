function callwebservice(lat, lang, ipAddress,instanceNo) {

    var uri = "http://202.40.181.106:8084/CollisionAvoid/Myservlet";
    var xmlhttp = new XMLHttpRequest();

    var params = "latitude=" + lat;
    params += "&langitude=" + lang;
    params += "&ipaddress=" + ipAddress; 
    params += "&instanceNo=" + instanceNo; 
    xmlhttp.open("POST", uri, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(params);
    return xmlhttp;

}
