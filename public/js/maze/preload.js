/**
 * Maze PreLoader
 * v.0.1 beta
 */

var Maze = Maze || {};

//Load's the initial assets.
Maze.Preload = function () {  };

Maze.Preload.prototype = {
    preload:function (){
        //Set Preload
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "preloadbar");
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        //Load our game assets
        this.load.tilemap("map", "../../games/maze/maze.json", null, Phaser.Tilemap.TILED_JSON);
        this.load.image("dungeon", "../../games/maze/img/dungeon.jpg");
        this.load.image("guy", "../../games/maze/img/guy.gif");
        this.load.image("guy_single", "../../games/maze/img/guy_single.png");
        this.load.image("stairs", "../../games/maze/img/stairs_single.png");
    },
    create: function () {
        this.state.start("Game");
    }
};