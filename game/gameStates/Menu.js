function Menu( game ) {
    var  x = WIDTH / 2, y = HEIGHT / 2;
    var scrollingSpeed = 20;
    var player = new Player();

    MapManager.setup();
    
    this.update = function() {
        if( keyState[ 32 ] ) {
            game.changeState( "level1" );
        }
        // Move the canvas 
        if( InputManager.state[ "scroll-left" ] ) MapManager.moveCenter( -scrollingSpeed, 0 );
        if( InputManager.state[ "scroll-up" ] ) MapManager.moveCenter( 0, -scrollingSpeed );
        if( InputManager.state[ "scroll-right" ] ) MapManager.moveCenter( scrollingSpeed, 0 );
        if( InputManager.state[ "scroll-down" ] ) MapManager.moveCenter( 0, scrollingSpeed );


        player.update();
        PhysicsEngine.update();
    }

    this.render = function() {
        ctx.font="26px Georgia";
        ctx.fillText( "Menu", WIDTH / 2, HEIGHT / 2 ) ;
        MapManager.render();
        player.render();
    }
}