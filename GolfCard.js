
var numplayers = 5;

function runcode() {
    for(var p = 1; p <= numplayers; p++ ){
        collectholes(p);
    }
}

function collectholes(player){
    var golfcourse = "";
    for(var h = 1; h <= 18; h++){
        var hole = "<div id='player" + player +"hole" + h +"'>hole display</div>";
        golfcourse += hole;
        //console.log(golfcourse);
    }
    $("#scorecard").append(golfcourse);
}