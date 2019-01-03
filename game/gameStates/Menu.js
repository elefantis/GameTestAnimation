function Menu( game ) {
    var  x = WIDTH / 2, y = HEIGHT / 2;
    var scrollingSpeed = 20;

    AnimationManager.setup();
    MapManager.setup();
    

    this.update = function() {
        if( PressedKeys[ 32 ] ) {
            game.changeState( "level1" );
        }

        // Move the canvas 
        if( PressedKeys[ 37 ] ) x -= scrollingSpeed;
        if( PressedKeys[ 38 ] ) y -= scrollingSpeed;
        if( PressedKeys[ 39 ] ) x += scrollingSpeed;
        if( PressedKeys[ 40 ] ) y += scrollingSpeed;
        MapManager.centerAt( x,  y );
    }

    this.render = function() {
        ctx.font="26px Georgia";
        ctx.fillText( "Menu", WIDTH / 2, HEIGHT / 2 ) ;
        MapManager.render();
        AnimationManager.render();
    }
}