var numplayers = 8;
var numholes = 18;
var teetime = 10;
var seconds = 59;

function buildcard(){
    beginTimer();
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
            $("#column" + h).append("<div id='player" + p +"hole" + h +"' class='holebox'><input class ='box' type='number'></div>");
        }
    }
}

function beginTimer(){
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
}

