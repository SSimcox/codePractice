/**
 *  Maze Game Logic
 *  v.0.1 beta
 */

Maze = Maze || {};

//Title screen
Maze.Game = function () {  };

Maze.Game.prototype = {
    create: function () {
        //Add the tileset
        this.map = this.game.add.tilemap("map");
        this.map.addTilesetImage("old_dungeon", "dungeon"); // first parameter is the tiled name, second loaded name
        this.map.addTilesetImage("player", "guy");

        //create layers
        this.backgroundlayer = this.map.createLayer("Background");
        this.blockedLayer = this.map.createLayer("Walls");
        this.finLayer = this.map.createLayer("Stairs");

        //Collision on blocked layer
        this.map.setCollisionBetween(1, 100, true, "Walls");
        this.map.setCollisionBetween(1, 50, true, "Stairs");

        //Resize for game
        this.backgroundlayer.resizeWorld();

        //Create the player
        var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');

        //we only created one player so we know there is only one result
        this.player = this.game.add.sprite(result[0].x, result[0].y, 'guyAnimated');
        this.game.physics.arcade.enable(this.player);

        //camera to follow player in world
        this.game.camera.follow(this.player);

        //Create our animations...
        this.player.animations.add("down",[0,1,2,3,4], 10, true, true);
        this.player.animations.add("left",[5,6,7,8,9], 10, true, true);
        this.player.animations.add("up",[10,11,12,13,14], 10, true, true);
        this.player.animations.add("right",[15,16,17,18,19], 10, true, true);

        //Create events
        $("#cmd").on("down", function(){
            Move.down = true;
        });
        $("#cmd").on("up", function(){
            Move.up = true;
        });
        $("#cmd").on("right", function(){
            Move.right = true;
        });
        $("#cmd").on("left", function(){
            Move.left = true;
        });

        //Player movement (needs to change...)
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    findObjectsByType: function (type, map, layer) {
        var result = new Array();
        map.objects[layer].forEach(function (element) {
            if(element.type === type){
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },
    createFromTiledObject: function (element, group) { // create a sprite from a an object
        var sprite = group.create(element.x, element.y, element.sprite);

        //copy properties over to sprite
        Object.keys(element).forEach(function(key){
            sprite[key] = element[key];
        });
    },
    update: function () {
        //Collisions
        this.game.physics.arcade.collide(this.player, this.blockedLayer);
        this.game.physics.arcade.collide(this.player, this.finLayer, this.gameOver, null, this);

        //Check if restart is needed
        if(Restart){
            this.state.start("Game");
            Restart = false;
        }

        //player movement (updated to work with js events... :) )
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;

        if(Move.down){
            this.player.animations.play("down");
            this.player.body.velocity.y += 50;
            if(Move.count == 0){
                Move.count += 1;
                setTimeout(function(){
                    Move.down = false;
                    Move.count = 0;
                }, 480);//best way i've found to do this... wish there was a more reliable method...
            }else{
                Move.count += 1;
            }
        }else if(Move.up){
            this.player.animations.play("up");
            this.player.body.velocity.y -= 50;
            if(Move.count == 0){
                Move.count += 1;
                setTimeout(function(){
                    Move.up = false;
                    Move.count = 0;
                }, 480);//best way i've found to do this... wish there was a more reliable method...
            }else{
                Move.count += 1;
            }
        }else if(Move.left){
            this.player.animations.play("left");
            this.player.body.velocity.x -= 50;
            if(Move.count == 0){
                Move.count += 1;
                setTimeout(function(){
                    Move.left = false;
                    Move.count = 0;
                }, 480);//best way i've found to do this... wish there was a more reliable method...
            }else{
                Move.count += 1;
            }
        }else if(Move.right){
            this.player.body.velocity.x += 50;
            this.player.animations.play("right");
            if(Move.count == 0){
                Move.count += 1;
                setTimeout(function(){
                    Move.right = false;
                    Move.count = 0;
                }, 480);//best way i've found to do this... wish there was a more reliable method...
            }else{
                Move.count += 1;
            }
        }else if(this.cursors.up.isDown) { //For testing only...
            this.player.animations.play("up");
            if(this.player.body.velocity.y == 0)
                this.player.body.velocity.y -= 50;
        }
        else if(this.cursors.down.isDown) {
            this.player.animations.play("down");
            if(this.player.body.velocity.y == 0)
                this.player.body.velocity.y += 50;
        }
        else if(this.cursors.left.isDown) {
            this.player.animations.play("left");
            this.player.body.velocity.x -= 50;
        }
        else if(this.cursors.right.isDown) {
            this.player.animations.play("right");
            this.player.body.velocity.x += 50;
        }else{
            this.player.animations.stop();
            this.player.frame = 0;
        }

    },
    gameOver: function () {
        $("#cmd").trigger("gameOver");
    }
};