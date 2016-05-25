var numplayers = 4;
var numholes = 18;
var teetime = 10;
var seconds = 59;

function addplayer() {
    numplayers +=1;
    $("#leftcard").html('');
    $("#rightcard").html('');
    buildcard();
}

function buildcard(){
    /*beginTimer();*/
    var holecollection = "";
    var playercollection = "";

    // create column of player labels
    for(var pl = 1; pl <= numplayers; pl++ ){
        playercollection += "<div id='player" + pl +"' class='holebox playerbox'> Player " + pl + "</div>";
    }

    // create golf hole columns before you add holes to them.
    for(var c = numholes; c >= 1; c-- ){
        holecollection += "<div id='column" + c +"' class='holecol'><div class='holenumbertitle'>" + c + "</div></div>";
    }
    $("#leftcard").html(playercollection);
    $("#rightcard").html(holecollection);

    // call the function that builds the holes into the columns
    buildholes();
}

function buildholes() {
    // add 18 holes to the columns
    for(var p = 1; p <= numplayers; p++ ){
        for(var h = 1; h <= numholes; h++){
            $("#column" + h).append("<div id='player" + p +"hole" + h +"' class='holebox'><input class ='box' type='number' min='0'></div>");
        }
    }
}




/* set time */
var time = setInterval(timer, 1000);

function timer() {
    var d = new Date();
    var m = d.toDateString();
    document.getElementById("demo").innerHTML= m + " " + d.toLocaleTimeString();
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
    xhttp.onreadystatechange = function() {
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


//golf course api
// look in sandbox for course id.  Us the Course by ID http to pull the par, holes, etc for that specific course. use postman to pull these