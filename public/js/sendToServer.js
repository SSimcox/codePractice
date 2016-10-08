/**
 * Created by Steven on 10/7/2016.
 */

// Take object
// Send to server
// Receive object
// Emit event

function packetWriter (lang, c){
    this.language = lang;
    this.code =  c;
};

function sendToServer(packet){
    // Serialize to JSON object
    var preparedPacket = JSON.stringify(packet);

    // Force flow to stop while waiting for response
    $.ajaxSetup({async:false});

    // POST with callback
    var returnData = null;
    $.post( "/api/parrot/maze", preparedPacket, function( data ) {
        returnData = data;
        $('#compile').trigger( "serverResponse");
        console.log("Got a response!");
    }, "json");

    // Return flow to async AJAX
    $.ajaxSetup({async:true});

    return returnData;
}

var pyth = new packetWriter(0, "print'hello'");
console.log(pyth);
sendToServer(pyth);