/**
 * Main file for the Maze Game
 *
 * Will load and create the main maze object, and will initialize game on load.
 */

var Maze = Maze || {};
//initialize the game object
Maze.game = new Phaser.Game(200, 200, Phaser.AUTO, "maze-game");

//Add States
Maze.game.state.add('Boot', Maze.Boot);
Maze.game.state.add('Preload', Maze.Preload);
Maze.game.state.add('Game', Maze.Game);

//Start the game
Maze.game.state.start('Boot');

//Initialize Movement Obj

var Move = {
    up: false,
    down:false,
    right:false,
    left:false,
    count: 0,
    x: 0,
    y: 0
};

//Initialize restart Bool
var Restart = false;

function initGame(){
    //Reset
    $("#restart").click(function(e){
        Restart = true;
        $("#cmd").one("gameOver", function () {
            gameOver();
        });
    });
    //Win!
    $("#cmd").one("gameOver", function () {
        gameOver();
    });
    //compile
    $("#compile").click(function(){
        var packet = new packetWriter(7,editor.getValue());
        var data = sendToServer(packet, "maze");
        console.log(data);
        $("#console").css("display", "block");
        console.log(data);
        if(data.status === "success"){
            if(data.errors == ""){
                var output = "Compilation Successful \n";
                output += data.output;
                $("#consoleBody").html(output);
                parse(data.output);
            }else{
                var output = "Compilation Failed \n";
                output += data.errors;
                $("#consoleBody").html(output);
            }
        }else{
            var output = "Compilation Error \n";
            output += "Compilation server not found";
            $("#consoleBody").html(output);
        }
    });
    $("#cClose").click(function(){
        $("#console").css("display", "none");
    });
    //Compile
}

function gameOver() {
    $('#finModal').modal('show');
    $( "#finModal" ).on('shown.bs.modal', function(){
        $("#close").click(function(){
            Restart = true;
            $("#cmd").one("gameOver", function () {
                gameOver();
            });
        })
    });
    $("#consoleBody").html("");
}

$(document).ready(function(){
    initGame();
    //Set Editor height
    var h = window.innerHeight;
    if (h < 600){
        h = 650;
    }
    console.log(h);
    //Set Editor height
    $("#editorContainer").attr("style", "height:" + (h - 50) + "px;");
});

//Editor Functions
var editor = ace.edit("editor");
editor.setTheme("ace/theme/xcode");
editor.getSession().setMode("ace/mode/c_cpp");
editor.setOption({
    maxLines: Infinity
});
editor.resize();


function setEditorLang(langNumber){
    var str = "ace/mode/c_cpp";
    switch(langNumber){
        case 7: str = "ace/mode/c_cpp";
            break;
        case 8: str = "ace/mode/java";
            break;
        case 4: str = "ace/mode/javascript";
            break;
        case 0: str = "ace/mode/python";
            break;
        case 1: str = "ace/mode/ruby";
            break;
        case 10: str = "ace/mode/csharp";
            break;
        case 6: str = "ace/mode/golang";
            break;
        case 3: str = "ace/mode/php";
            break;
        case 5: str = "ace/mode/scala";
            break;
        default: str = "ace/mode/c_cpp";
            break;
    }
    editor.getSession().setMode(str);
}