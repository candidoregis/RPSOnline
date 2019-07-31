
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

var count = 0;

var playerKey = "";

var playersList = {};

var players_list = 'player_list'; //players location
var player_data = 'player_data'; //game location
var score = 'player_scores';

database.ref().on("child_added", function (snap) {
    count++;
    // playerKey = snap.key;
});

function getMyUserId() {
    var playerName = $('#playerName').val();
    return playerName;
}

function addPlayer(player) {
    database.ref(player_data).child(players_list).push(player);
}

function assignPlayerNumber() {
    var myUserId = getMyUserId();
    var score = 0;
    var play = "";
    var player = 0; 
    var myPlayerNumber = "";

    var playerList = database.ref(player_data).child(players_list);

    var player = {
        myUserId: myUserId,
        score: score,
        play: play,
        player: player
    };

    if (count == 0) {
        player.player = 1;
        playerList.push(player);
    } else if (count == 1) {
        player.player = 2;
        playerList.push(player);
    } else {
        console.log("Room is full, try again later");
    }

    //var query = firebase.database().ref(player_data).child(players_list);
    playerList.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                if(myUserId === childData.myUserId){
                    myPlayerNumber = childData.player;
                }
                // console.log(childData.player);
            });
        });


        playerList.child(myPlayerNumber).removeOnDisconnect();
        playGame(myPlayerNumber, myUserId);
}


$("#playGame").on("click", function (event) {
    assignPlayerNumber();
});

