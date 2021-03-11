// Constants
var agoraAppId = "a6af85f840ef43108491705e2315a857";
var isLoggedIn = false;
$("#sendMsgBtn").prop("disabled", true);

// Auto Init MaterializeCSS
M.AutoInit();

// RtmClient
const client = AgoraRTM.createInstance(agoraAppId, { enableLogUpload: false });

// Form Click Event
$("#joinChannelBtn").click(function() {
    console.log("reched here");
    var accountName = $('#accountName').val();

    // Login
    client.login({ uid: accountName }).then(() => {
        console.log('AgoraRTM client login success. Username: ' + accountName);
        isLoggedIn = true;

        // Channel Join
        var channelName = $('#channelNameInput').val();
        channel = client.createChannel(channelName);
        document.getElementById("channelNameBox").innerHTML = channelName;
        channel.join().then(() => {
            console.log('AgoraRTM client channel join success.');
            $("#joinChannelBtn").prop("disabled", true);
            $("#sendMsgBtn").prop("disabled", false);

            // Close Channel Join Modal
            $("#enterDeets").modal('close');

            // Send Channel Message
            $("#sendMsgBtn").click(function() {
                console.log(pi, locc);
                singleMessage = $('#channelMsg').val();
                channel.sendMessage({ text: singleMessage }).then(() => {
                    console.log("Message sent successfully.");
                    console.log("Your message was: " + singleMessage + " by " + accountName);
                    $("#messageBox").append("<br> <b>Sender:</b> " + accountName + "<br> <b>Message:</b> " + singleMessage + "<br>");
                }).catch(error => {
                    console.log("Message wasn't sent due to an error: ", error);
                });

                // Receive Channel Message
                channel.on('ChannelMessage', ({ text }, senderId) => {
                    console.log("Message received successfully.");
                    console.log("The message is: " + text + " by " + senderId);
                    $("#messageBox").append("<br> <b>Sender:</b> " + senderId + "<br> <b>Message:</b> " + text + "<br>");
                });
            });

            $("#updatemove").click(function() {
                console.log(pi, locc);
                var to_send = String(pi) + "," + String(locc);
                channel.sendMessage({ text: to_send }).then(() => {
                    console.log("Message sent successfully.");
                }).catch(error => {
                    console.log("Message wasn't sent due to an error: ", error);
                });

                // Receive Channel Message
                channel.on('ChannelMessage', ({ text }, senderId) => {
                    console.log("Message received successfully.");
                    console.log(text);
                });
            });

        }).catch(error => {
            console.log('AgoraRTM client channel join failed: ', error);
        }).catch(err => {
            console.log('AgoraRTM client login failure: ', err);
        });
    });
});

// Show Form on Page Load
$(document).ready(function() {
    $('#joinChannelModal').modal();
    $("#joinChannelModal").modal('open');
});

// Logout
function leaveChannel() {
    channel.leave();
    client.logout();
    isLoggedIn = false;
    $("#joinChannelBtn").prop("disabled", false);
    $("#sendMsgBtn").prop("disabled", true);
    $("#joinChannelModal").modal('open');
    console.log("Channel left successfully and user has been logged out.");
}

function getdeets(x, y) {
    pi = x;
    locc = y
}
var pi, locc;

class linkBoth {
    constructor(pieces, piecePositions) {
        this.board = new Board(pieces, piecePositions);
    }
    makemoves(xid, location) {
        // const x = { "moves": [0], "promoted": false, "updateShape": false, "data": { "id": "G1", "player": "WHITE", "type": "PAWN" } };
        // const y = { row: "3", col: "F" };
        this.board.pieceMove(x, location);
    }
}

const xyz = new linkBoth(Utils.getInitialPieces(), initialPositions);