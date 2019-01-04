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
        if( PressedKeys[ 37 ] ) MapManager.moveCenter( -scrollingSpeed, 0 );
        if( PressedKeys[ 38 ] ) MapManager.moveCenter( 0, -scrollingSpeed );
        if( PressedKeys[ 39 ] ) MapManager.moveCenter( scrollingSpeed, 0 );
        if( PressedKeys[ 40 ] ) MapManager.moveCenter( 0, scrollingSpeed );

        
    }

    this.render = function() {
        ctx.font="26px Georgia";
        ctx.fillText( "Menu", WIDTH / 2, HEIGHT / 2 ) ;
        MapManager.render();
        AnimationManager.render();
    }
}