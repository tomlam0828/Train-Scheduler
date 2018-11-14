var config = {
    apiKey: "AIzaSyD_LsGwl1PI9yNuvAAEHBjJdai8ALFpM3c",
    authDomain: "tomlam-2fd7e.firebaseapp.com",
    databaseURL: "https://tomlam-2fd7e.firebaseio.com",
    projectId: "tomlam-2fd7e",
    storageBucket: "tomlam-2fd7e.appspot.com",
    messagingSenderId: "658067903268"
};

firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

$("#button").on("click", function () {
    event.preventDefault();
    var trainName = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#firsttrain-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
});