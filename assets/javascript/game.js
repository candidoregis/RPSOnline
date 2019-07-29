
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
var highPrice = initialBid;
var highBidder = initialBidder;

database.ref("/bidderData").on("value", function (snapshot) {

    if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

        highBidder = snapshot.val().highBidder;
        highPrice = parseInt(snapshot.val().highPrice);

        $("#highest-bidder").text(snapshot.val().highBidder);
        $("#highest-price").text("$" + snapshot.val().highPrice);

        console.log(snapshot.val().highBidder);
        console.log(snapshot.val().highPrice);

    } else {

        $("#highest-bidder").text(highBidder);
        $("#highest-price").text("$" + highPrice);

        console.log("local High Price");
        console.log(highBidder);
        console.log(highPrice);
    }

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

$("#submit-bid").on("click", function (event) {
    event.preventDefault();

    var bidderName = $("#bidder-name").val().trim();
    var bidderPrice = parseInt($("#bidder-price").val().trim());

    console.log(bidderName);
    console.log(bidderPrice);

    if (bidderPrice > highPrice) {

        alert("You are now the highest bidder.");

        database.ref("/bidderData").set({
            highBidder: bidderName,
            highPrice: bidderPrice
        });

        console.log("New High Price!");
        console.log(bidderName);
        console.log(bidderPrice);

        highBidder = bidderName;
        highPrice = parseInt(bidderPrice);

        $("#highest-bidder").text(bidderName);
        $("#highest-price").text("$" + bidderPrice);
    } else {

        alert("Sorry that bid is too low. Try again.");
    }
});