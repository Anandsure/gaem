// Constants
var agoraAppId = "5738f1f540d34b95a121d0cbad9bf5fe";
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
                const jsonMsg = {
                    piece: pi,
                    location: locc
                };
                // build the Agora RTM Message
                const msg = {
                    description: undefined,
                    messageType: 'TEXT',
                    rawMessage: undefined,
                    text: JSON.stringify(jsonMsg)
                };
                channel.sendMessage(msg).then(() => {
                    console.log("Message sent successfully.");
                }).catch(error => {
                    console.log("Message wasn't sent due to an error: ", error);
                });

                // Receive Channel Message
                channel.on('ChannelMessage', (msg, senderId) => {
                    console.log("Message received suc.");
                    var xyz = JSON.parse(msg['text']);
                    // console.log(xyz);
                    var pie = xyz["piece"];
                    var loca = xyz["location"];
                    console.log(pie, loca);
                    console.log('now trying to move');
                    xyz1.makemoves(pie, loca);
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
    makemoves(xid, loccc) {
        // const x = { "moves": [0], "promoted": false, "updateShape": false, "data": { "id": "G1", "player": "WHITE", "type": "PAWN" } };
        // const y = { row: "3", col: "F" };
        console.log("tried to move");
        //done till here :)


        // if (mi % 2 == 0) {
        //     game.turn = "WHITE";
        // } else {
        //     game.turn = "BLACK";
        // }
        // mi += 1;
        console.log(xid);
        this.board.pieceMove(xid, loccc);
        this.board.piecesUpdate(mi);
        game.move(xid['data']['id'], loccc, false);
        view.drawPiecePositions();

    }
}

const xyz1 = new linkBoth(Utils.getInitialPieces(), initialPositions);
var mi = 0;