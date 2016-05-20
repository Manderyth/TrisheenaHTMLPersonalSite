/* add this
for (var c = numholes; c >= 1; c --) {
    holecollection += "<div id='column" + c"' class'holecol'><div class 'holenumbertitle'>" + c + "</div></div>";
}
$("#leftcard").html(playercollection;
$("rightcard").holecollection); */


/* create a div on the left that holds the number of players

create a new div that creates the columns on the right - put this before you run the column that adds the holes

add $("#column + h ") 
 */


/*var myVar = setInterval(function) {myTimer()}, 1000;

function myTimer() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    document.getElementById("demo").innerHTML = t;
}

function myStopFunction (
    clearinterval(myVar);
) */


var teetime = 45;
var seconds = 60;

function beginTimer() {    //call this onload
    var thetimer = setInterval(function(){clocktick()}, 1000);
}

function clocktick() {
    if(seconds > 0) {
        seconds--;
    }
    
    else {
        teetime --;
        seconds = 60;
    }
        document.getElementById("countdown").innerHTML = teetime + ":" + seconds;
}