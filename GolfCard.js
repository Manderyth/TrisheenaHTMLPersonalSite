var numplayers = 0;
var numholes = 18;
var teetime = 10;
var seconds = 59;
var response = [];

function addplayer() {
    numplayers += 1;
    //$("#leftcard").html('');
    //$("#rightcard").html('');
    teeboxid=$("#selectteebox").val();
    buildcard(teeboxid);
    getCourseInfo();

}

function buildcard(teeboxid) {
    /*beginTimer();*/
    var holecollection = "";
    var playercollection = "";
    var grandtotalcollection ="";
    var firstnine="";
    var secondnine="";


    // create column of player labels
    for (var pl = 1; pl <= numplayers; pl++) {
        playercollection += "<div id='player" + pl + "' class='holebox playerbox'><input id='name'> Player " + pl + "</div>";
        grandtotalcollection += "<div class='holebox' id='grand" + pl +"'>0</div>";
        firstnine += "<div class='holebox' id='f9" + pl +"'>0</div>";
        secondnine += "<div class='holebox' id='s9" + pl +"'>0</div>";

    }

    // create golf hole columns before you add holes to them.
    for (var c = numholes; c >= 1; c--) {
        var adjusthole = c - 1;
        var adjusthole2 = c - 1;
        var adjusthole3 = c - 1;
        holecollection += "<div id='column" + c + "' class='holecol'><div class='holenumbertitle'><div>" + c + '<div> Par ' + (response.course.holes[adjusthole].tee_boxes[teeboxid].par) + '<div> Yards ' + (response.course.holes[adjusthole2].tee_boxes[teeboxid].yards) + '<div> H ' + (response.course.holes[adjusthole2].tee_boxes[teeboxid].hcp) +"</div></div></div></div></div></div>";
    }


    $("#leftcard").html(playercollection);
    $("#rightcard").html(("<div class='holecol'><div>total</div>" + grandtotalcollection + "</div>") + ("<div class='holecol'><div> 2nd9Total</div>" + secondnine + "</div>") + ("<div class='holecol'><div> 1st9Total</div>" + firstnine + "</div>") + holecollection);


    // call the function that builds the holes into the columns
    buildholes();
}




function buildholes() {
    // add 18 holes to the columns
    for (var p = 1; p <= numplayers; p++) {
        for (var h = 1; h <= numholes; h++) {
            $("#column" + h).append("<input onkeyup='calculatescore(" + p + ")' id='player" + p + "hole" + h + "' class='holebox'/>");
        }
    }
    validatescores();
}




function validatescores() {
    var x, text;

    // Get the value of the input field with id=""
    x = document.getElementsByClassName("holebox").value;

    // If x is Not a Number or less than one or greater than 10
    if (isNaN(x) || x < 1 || x > 10) {
        text = "Input not valid";
    } else {
        text = "Input OK";
    }
}




function calculatescore(theplayer) {
    var thetotal = 0;
    for (var t = 1; t <= numholes; t++) {
        thetotal += Number($("#player" + theplayer + "hole" + t).val());
    }
    $("#grand" + theplayer).html(thetotal);
    $("#s9" + theplayer).html(thetotal);
    $("#f9" + theplayer).html(thetotal);
}


//create totals column
/*function totals() {
 var ftotal = "";
 for (var t = 1; t <= numplayers; t++) {
 ftotal += "<div id ='total" + t + "' class='totalcolumn' class='holnumbertitle' class='holecol'> Total</div>";
 }
 $("#column" + t).html(ftotal);
 }*/



/* set time */
var time = setInterval(timer, 1000);

function timer() {
    var d = new Date();
    var m = d.toDateString();
    document.getElementById("demo").innerHTML = m + " " + d.toLocaleTimeString();
}


/* Countdown */
/*function beginTimer(){
 var thetimer = setInterval(function(){clocktick()}, 1000);
 }

 function clocktick(){
 if(seconds > 0){
 seconds --;
 if(seconds < 10){
 seconds = "0" + seconds;
 }
 }
 else{
 teetime --;
 seconds = 59;
 }
 document.getElementById("countdown").innerHTML = teetime + ":" + seconds;
 } */

/* weather */
function getmyinfo() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var myobj = JSON.parse(xhttp.responseText);
            document.getElementById("weather").innerHTML = myobj.weather[0].description;
        }
    }

    xhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=90001,us&appid=b6f46262ca6af205ba96ec80334d0aea", true);
    xhttp.send();
}

//google map & markers
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 34.1645327, lng: -118.1699226}
    });

    /* Puts a second marker on the map */
    /*var teeOffImage = 'images/tee-off.png';
     var beachMarker = new google.maps.Marker({
     position: {lat: 34.1647332, lng: -118.1690036},
     map: map,
     icon: teeOffImage
     });*/

    var holeImage = 'images/flag.png';
    var beachMarker = new google.maps.Marker({
        position: {lat: 34.1647332, lng: -118.1690036},
        map: map,
        icon: holeImage
    });
}



function getCourseInfo() {
    var xhttpNew = new XMLHttpRequest();
    xhttpNew.onreadystatechange = function () {
        if (xhttpNew.readyState == 4 && xhttpNew.status == 200) {
            response = JSON.parse(xhttpNew.responseText);
            for (var r = 0; r <= (response.course.holes[r].tee_boxes.length - 1); r++) {
                var teeboxdisplay = "<option value='" + r + "'> "+ response.course.holes[0].tee_boxes[r].tee_type +"</option>";
                var teeboxdisplay2 = "<option value='" + r + "'> "+ response.course.holes[0].tee_boxes[r].yards +"</option>";
                var teeboxdisplay3 = "<option value='" + r + "'> "+ response.course.holes[0].tee_boxes[r].hcp +"</option>";
                $("#selectteebox").append(teeboxdisplay, teeboxdisplay2, teeboxdisplay3);


                /*$("#column" + (r + 1)).append("<span> Par </span><span class=''>" + response.course.holes[r].tee_boxes[3].par + "</span><br>");
                 $("#column" + (r + 1)).append("<span class=''>" + response.course.holes[r].tee_boxes[3].yards + "</span><span> Yards </span>");*/
            }
        }
    };
    xhttpNew.open("GET", "https://golf-courses-api.herokuapp.com/courses/26828", true);
    xhttpNew.send();
};


var teeboxid;

function setCourseinfo (thisid) {
    teeboxid=thisid;
    buildcard(thisid);
}
