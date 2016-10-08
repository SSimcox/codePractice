/**
 * Created by Steven on 10/7/2016.
 */

// Creates the JSON Object
function packetWriter (lang, c){
    this.language = lang;
    this.code =  c;
}

function sendToServer(packet, game){
    var preparedPacket = packet;
    // Force flow to stop while waiting for response
    $.ajaxSetup({async:false});

    // POST with callback
    var returnData = null;
    $.post( "/api/compile/" + game, preparedPacket, function( data ) {
        returnData = data;
        $('#compile').trigger( "serverResponse");
    }, "json");

    // Return flow to async AJAX
    $.ajaxSetup({async:true});

    return returnData;
}
