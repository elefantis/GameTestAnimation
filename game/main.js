const canvas = document.getElementById( "canvas" );
const ctx = canvas.getContext( "2d" );
const WIDTH = 800, HEIGHT = 600;
const keyState = [ ];

( function setup() {
    // Config the canvas and context
    canvas.style.backgroundColor = "lightblue";
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.fillStyle = "black";
    ctx.strokeStyle = "red";

    // Set the Key event listeners
    document.addEventListener( "keydown", onKeyDown );
    document.addEventListener( "keyup", onKeyUp );
    document.addEventListener( "mousemove", onMouseMove );    
    
    // Init the game
    const game = new Game();
    
    ( function() {
        function gameLoop( frame ) {
            window.requestAnimationFrame( gameLoop );
            update( frame );
            render();
        }
        gameLoop();
    } )( );
    
    function update( frame ) {
        game.update();
    }
    
    function render() {
        ctx.clearRect( 0, 0, canvas.width, canvas.height );
        game.render();
    }
} ) ( );

function onKeyDown( event ) {
    InputManager.onKeyDownEvent( event.keyCode, event );
}

function onKeyUp( event ) {
    InputManager.onKeyUpEvent( event.keyCode, event );
}

function onMouseMove( event ) {
    var posX = event.clientX;
    var posY = event.clientY;
}