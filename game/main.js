const canvas = document.getElementById( "canvas" );
const ctx = canvas.getContext( "2d" );
const WIDTH = 800, HEIGHT = 600;
const PressedKeys = [ ];

( function setup() {
    // Config the canvas and context
    canvas.style.backgroundColor = "lightblue";
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx.fillStyle = "black";

    // Set the Key event listeners
    document.addEventListener( "keydown", function( e ) {
        e.preventDefault();
        PressedKeys[ e.keyCode ] = true;
    } );    
    
    document.addEventListener( "keyup", function( e ) {
        PressedKeys[ e.keyCode ] = false;
    } );    
    
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