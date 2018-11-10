function Menu( game ) {
    AnimationManager.setup();

    this.update = function() {
        if( PressedKeys[ 32 ] ) {
            console.log("ola kase")
            game.changeState( "level1" );
        }
    }

    this.render = function() {
        ctx.font="26px Georgia";
        ctx.fillText( "Menu", WIDTH / 2, HEIGHT / 2) ;
        AnimationManager.render();
    }
}