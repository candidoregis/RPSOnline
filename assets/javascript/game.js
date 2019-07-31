
var firebaseConfig = {
    apiKey: "AIzaSyBkx-Cw1Kc5WwA2oZEY30YepAdAkgHNDYQ",
    authDomain: "rpsonline7-2.firebaseapp.com",
    databaseURL: "https://rpsonline7-2.firebaseio.com",
    projectId: "rpsonline7-2",
    storageBucket: "rpsonline7-2.appspot.com",
    messagingSenderId: "900484946708",
    appId: "1:900484946708:web:559fc700a1888169"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var connectionsRef = database.ref("/connections");

var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function (snap) {
    if (snap.val()) {
        var con = connectionsRef.push(true);
        con.onDisconnect().remove();
    }
});

connectionsRef.on("value", function (snap) {
    $("#connected-viewers").text(snap.numChildren());
});

var playerOne = "";
var playerTwo = "";

$(document).ready(function () {




    $(".pOne").on("click", function () {
        var x = $(this).attr("value");
        console.log("P1 "+x);
    });


    $(".pTwo").on("click", function () {
        var x = $(this).attr("value");
        console.log("P2 "+x);
    });



});


database.ref("/game").on("value", function (snapshot) {

    if (snapshot.child("pOneMove").exists() && snapshot.child("pTwoMove").exists()) {

        console.log("tem algo aqui");
    } else {

        console.log("nao tem");

    }

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

$("#gameBtn").on("click", function (event) {
    event.preventDefault();

    var playerMove = $(".pOne").attr("value");
    var bidderPrice = parseInt($("#bidder-price").val().trim());

    $(".pOne").on("click", function () {
        var x = $(this).attr("value");

    } else {


    }
});