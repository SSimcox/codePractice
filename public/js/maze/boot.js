/**
 *  Maze Boot Loader...
 *  v.0.1 beta
 **/

var Maze = Maze || {};

Maze.Boot = function () {  };

//Set up game config and Assets
Maze.Boot.prototype = {
    preload: function () {
        //load assets for loading screen
        this.load.image('preloadbar', '/img/loader.gif');
    },
    create: function(){
        //set stage background color (Based on our loader bg)
        this.game.stage.setBackgroundColor = '#4b4b4b';

        //set scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //Position the game...
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //Physics system... (really)
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //Call Next Phase
        this.state.start('Preload');
    }
};