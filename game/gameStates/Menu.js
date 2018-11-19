function Menu( game ) {
    AnimationManager.setup();
    MapManager.setup();

    this.update = function() {
        if( PressedKeys[ 32 ] ) {
            game.changeState( "level1" );
        }
    }

    this.render = function() {
        ctx.font="26px Georgia";
        ctx.fillText( "Menu", WIDTH / 2, HEIGHT / 2 ) ;
        MapManager.render();
        AnimationManager.render();
    }
}