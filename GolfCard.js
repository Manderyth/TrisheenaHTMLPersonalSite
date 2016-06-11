var numplayers = 0;
var numholes = 18;
var response = [];
var totalp = 0;
var totaly = 0;
var firstpar = 1;
var secondpar = 1;

function addplayer() {
    numplayers += 1;
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
        playercollection += "<div id='player" + pl + "' class='holebox playerbox'><input id='name'>Player " + pl + "</div>";
        grandtotalcollection += "<div class='holebox' id='grand" + pl +"'>0</div>";
        firstnine += "<div class='holebox' id='f9" + pl +"'>0</div>";
        secondnine += "<div class='holebox' id='s9" + pl +"'>0</div>";

    }

    // create golf hole columns before you add holes to them.
    for (var c = numholes; c >= 1; c--) {
        var adjusthole = c - 1;
        holecollection += "<div id='column" + c + "' class='holecol'><div class='holenumbertitle'><div>" + c + '<div> Par ' + (response.course.holes[adjusthole].tee_boxes[teeboxid].par) + '<div> Yards ' + (response.course.holes[adjusthole].tee_boxes[teeboxid].yards) + '<div> H ' + (response.course.holes[adjusthole].tee_boxes[teeboxid].hcp) +"</div></div></div></div></div></div></div>";
    }


    $("#leftcard").html(playercollection);
    $("#rightcard").html(("<div class='holecol'><div>Total <div>TP" + totalpar() +"</div><div>TYards<br>" + totalyards() +"</div></div><div>Spacer</div>" + grandtotalcollection +"</div>") + ("<div class='holecol'><div> In </div><div>SNP" + secondninepar() +"</div><div>Empty<br>Y</div><div>Spacer</div>" + secondnine + "</div>") + ("<div class='holecol'><div> Out </div><div>FNP" + firstninepar() +"</div><div>Empty<br>Y</div>Spacer<div></div>" + firstnine + "</div></div>") + holecollection);


    // call the function that builds the holes into the columns
    buildholes();
    //totalpar();
    totalyards();
}



function buildholes() {
    // add 18 holes to the columns
    for (var p = 1; p <= numplayers; p++) {
        for (var h = 1; h <= numholes; h++) {
            $("#column" + h).append(`<input type = "number" min = "0" onblur="compareTotals(${p})" onkeyup="calculatescore(${p})" id="player${p}hole${h}" class="holebox"/>`);
        }
    }
}




function calculatescore(theplayer) {
    var thetotal = 0;
    var firstNineTotal = 0;
    var secondNineTotal = 0;

    for (var t = 1; t <= numholes; t++) {
        thetotal += Number($("#player" + theplayer + "hole" + t).val());
    }

    for (var r = 1; r <= 9; r++){
        firstNineTotal += Number($("#player" + theplayer + "hole" + r).val());
    }

    for (var s = 10; s <=18 ; s++) {
        secondNineTotal += Number($("#player" + theplayer + "hole" + s).val());
    }

    $("#grand" + theplayer).html(thetotal);
    $("#s9" + theplayer).html(secondNineTotal);
    $("#f9" + theplayer).html(firstNineTotal);
}


function compareTotals(playertotal) {
    var totalComp = 0;
    var ctindex = $("#selectteebox").val();

    for (var ct = 1; ct <= numholes; ct++) {
        var score = Number($("#player" + playertotal + "hole" + ct).val());

        // make sure all cells are filled in
        if(score <= 0) {
            return;
        }
        totalComp += score;
    }

    var message;

    if (totalComp >= response.course.tee_types[ctindex].par) {
        message = "You were over Par.  Better Luck Next Time!"
    }
    else {
        message = "You were at or under par.  Good Job!"
    }

    alert(message);
}




//calculate total pars
function totalpar() {
    totalp = 0;

    var tindex = $("#selectteebox").val();

    for (var p = 0; p <= numholes - 1; p ++) {
        totalp += response.course.holes[p].tee_boxes[tindex].par;
    }

    console.log(totalp);
    var mytotal = totalp;
    return mytotal;
}


function firstninepar() {
    firstpar = 1;

    var fnpindex = $("#selectteebox").val();

    for (var fnp = 1; fnp <= 9; fnp ++) {
        firstpar += response.course.holes[fnp].tee_boxes[fnpindex].par;
    }
    var firsthalf = firstpar;
    return firsthalf;
}


function secondninepar() {
    secondpar =1;

    var snpindex = $("#selectteebox").val();

    for (var snp = 1; snp <= 9; snp ++) {
        secondpar += response.course.holes[snp].tee_boxes[snpindex].par;
    }
    var secondhalf = secondpar;
    return secondhalf;
}


//calculate total yards
function totalyards() {
    totaly =0;

    var yindex = $("#selectteebox").val();

    for (var y = 0; y <= numholes - 1; y ++) {
        totaly += response.course.holes[y].tee_boxes[yindex].yards;

    }
    console.log(totaly);
    var totalyards = totaly;
    return totalyards;
}



/* set time */
var time = setInterval(timer, 1000);

function timer() {
    var d = new Date();
    var m = d.toDateString();
    document.getElementById("demo").innerHTML = m + " " + d.toLocaleTimeString();
}



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
                //var teeboxdisplay2 = "<option value='" + r + "'> "+ response.course.holes[0].tee_boxes[r].yards +"</option>";
                //var teeboxdisplay3 = "<option value='" + r + "'> "+ response.course.holes[0].tee_boxes[r].hcp +"</option>";
                $("#selectteebox").append(teeboxdisplay);
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




// validate no two names are the same

$('#name').submit(function() {
    var id1 = $('#name').text();
    var id2 = $('#name').text();
    if (id1 == id2) {
        alert('Error, duplicate name');
        return false;
    }
    else
    {
        return true;
    }

});