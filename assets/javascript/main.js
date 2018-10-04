$(document).ready(function () {
  // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDg-e09AnkOSzUQ2fBUfHDnOZ4qoiiN_Dg",
        authDomain: "train-scheduler-dbf7e.firebaseapp.com",
        databaseURL: "https://train-scheduler-dbf7e.firebaseio.com",
        projectId: "train-scheduler-dbf7e",
        storageBucket: "train-scheduler-dbf7e.appspot.com",
        messagingSenderId: "424490341397"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    //add train form button handler
    $("#addTrain").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var freq = $("#interval").val().trim();

    database.ref().push({
        trainName : trainName,
        destination : destination,
        firstTrain : firstTrain,
        frequency : freq
    });//end database push
    });//end button handler

    database.ref().on("child_added", function (childSnapshot) {

        var newTrain = childSnapshot.val().trainName;
        var newDestination = childSnapshot.val().destination;
        var newFirstTrain = childSnapshot.val().firstTrain;
        var newFreq = childSnapshot.val().frequency;

        var startTimeConv = moment(newFirstTrain, "hh:mm").subtract(1, "years")

        var currentTime = moment();

        var diffTime = moment().diff(moment(startTimeConv), "minutes");

        var tRemainder = diffTime % newFreq;

        var tMinutesTillTrain = newFreq - tRemainder;

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");

        var trainArrival = moment(nextTrain).format("HH:mm");

        $("#sched-display").append(
            "<tr><td>"   + newTrain + 
            "</td><td>"  + newDestination +
            "</td><td>"  + newFreq +
            "</td><td>"  + trainArrival +
            "</td><td>"  + tMinutesTillTrain +
            "</td></tr>" 
        );
        $("#trainName, #destination, #firstTrain, #interval").val("");
    })//end database child call




});// end for doc ready