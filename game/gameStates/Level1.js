function Level1( game ) {
    
    this.update = function() {
        if( PressedKeys[ 27 ] ) {
            game.changeState( "menu" );
        }
    }

    this.render = function() {
        ctx.fillRect( 200, 200, 200, 200 );
    }
}