




var config = {
    apiKey: "AIzaSyD_LsGwl1PI9yNuvAAEHBjJdai8ALFpM3c",
    authDomain: "tomlam-2fd7e.firebaseapp.com",
    databaseURL: "https://tomlam-2fd7e.firebaseio.com",
    projectId: "tomlam-2fd7e",
    storageBucket: "tomlam-2fd7e.appspot.com",
    messagingSenderId: "658067903268"
};

firebase.initializeApp(config);


$(document).ready(function(){


var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;
var firstTimeConver = "";
var currentTime = "";
var diffTime = "";
var tRemainder = "";
var minTillTrain = "";
var nextTrain = "";
var nextTrainFormat = "";

$("#button").on("click", function () {
    event.preventDefault();
    trainName = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#firsttrain-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    firstTimeConver = moment(firstTrain, "hh:mm");
    console.log("firstTimeConver", firstTimeConver);
    currentTime = moment();
    diffTime = moment().diff(moment(firstTimeConver), "minutes");
    console.log("diffTime", diffTime);
    tRemainder = diffTime % frequency;
    console.log("tRemainder", tRemainder);
    minTillTrain = frequency - (tRemainder+1);
    console.log("minTillTrain", minTillTrain);
    nextTrain = moment().add(minTillTrain, "minutes");
    console.log("nextTrain", nextTrain);
    nextTrainFormat = moment(nextTrain).format("hh:mm a");
    console.log("nextTrainFormat", nextTrainFormat);
    

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextTrainFormat: nextTrainFormat,
        minTillTrain: minTillTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
});



database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);
    
$("#tbody").append("<tr><td>" + childSnapshot.val().trainName +
    "<td>" + childSnapshot.val().destination + 
    "<td>" + childSnapshot.val().frequency + 
    "<td>" + childSnapshot.val().firstTrain + 
    "<td>" + childSnapshot.val().nextTrainFormat +
    // "<td>" + childSnapshot.val().e +
    "</td></tr>");
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code)
});
})