/**
 * Created by Steven on 10/7/2016.
 */

var allowTrigger = true;

function trimNewLines(input) {
    var reg = /[a-zA-Z ]*(\r\n|\n|\r)/gm;
    input = input.match(reg);
    for(var i = 0; i < input.length; ++i)
    {
        input[i] = input[i].substring(0,input[i].length-1);
    }
    return input;
}

function parse(input){
    parserRunning = true;
    input = trimNewLines(input);
    for(var i = 0; i < input.length; ++i)
    {
        var j;
        for (j = 0; j < commands.length; ++j) {
            var reg = new RegExp(commands[j].regex);
            var s = reg.exec(input[i]);
            if (s) {
                setTimeout(myTrigger,500*i,j);
            }
        }
    }
}

function myTrigger(index){
    $("#cmd").trigger(commands[index].event, commands[index].name);
}
