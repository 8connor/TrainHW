var firebaseConfig = {
    apiKey: "AIzaSyCfrLVg5Jw8dVHXdL0fWQrWgyqcDJGHsLY",
    authDomain: "trainhomework-e6756.firebaseapp.com",
    databaseURL: "https://trainhomework-e6756.firebaseio.com",
    projectId: "trainhomework-e6756",
    storageBucket: "trainhomework-e6756.appspot.com",
    messagingSenderId: "70319410655",
    appId: "1:70319410655:web:340d2ebeadac4e0da4486a"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    var trainName = $("#trainName").val();
    var trainDest = $("#destination").val().trim();
    var trainStart = $("#first-input").val().trim();
    trainStart = moment(trainStart, "HH:mm"); 
   
    var trainStartUnixTime = trainStart.format("X");
    var trainRate = $("#rate-input").val().trim();
    var newTrain = {
        name: trainName,
        destination: trainDest,
        start: trainStartUnixTime,
        rate: trainRate
    };
    database.ref().push(newTrain);
    console.log(newTrain);
    alert("Train successfully added!");
    $("#trainName").val("");
    $("#destination").val("");
    $("#first-input").val("");
    $("#rate-input").val("");
});
database.ref().on("child_added", function (childSnapshot) {
    
    console.log(childSnapshot.val());

    var newTrain = childSnapshot.val();
    var trainName = newTrain.name;
    var trainDest = newTrain.destination;
    var trainStart = newTrain.start;
    var trainRate = newTrain.rate;
    
    var trainStartUnix = moment.unix(trainStart);
    var trainStartPretty = trainStartUnix.format("HH:mm");
   
    var now = moment();
    var nextArrival = now.diff(trainStartUnix, "minutes");
    var next = nextArrival
  
    var myTR = $("<tr>");
    var td1 = $("<td>");
    td1.html(trainName);
    var td2 = $("<td>");
    td2.html(trainDest);
    var td3 = $("<td>");
    td3.html(trainStartPretty);
    var td4 = $("<td>");
    td4.html(nextArrival);
    var td5 = $("<td>");
    td5.html(trainRate);
   
    myTR.append(td1);
    myTR.append(td2);
    myTR.append(td3);
    myTR.append(td4);
    myTR.append(td5);
   
    
    $("#train-table").append(myTR);
});
