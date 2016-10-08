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


//For testing purposes only
console.log(commands);
setTimeout(function(){
    $("#cmd").trigger("down");
    setTimeout(function(){
        $("#cmd").trigger("left");
        setTimeout(function(){
            $("#cmd").trigger("down");
            setTimeout(function(){
                $("#cmd").trigger("right");
                setTimeout(function(){
                    $("#cmd").trigger("down");
                    setTimeout(function(){
                        $("#cmd").trigger("up");
                    }, 500);
                }, 500);
            }, 500);

        }, 500);
    }, 500);
}, 1000);

//Test Rest
$("#restart").click(function(e){
    console.log("I was clicked");
    Restart = true;
});