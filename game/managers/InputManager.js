const InputManager = ( function() {
    var keys = {};
    var bindings = {};
    var actions = [];

    const bind = function( key, action) {
        bindings[ key ] = action;
    }

    const onKeyDownEvent = function( keyCode, event ) {
        var action = bindings[ keyCode ];
        if( action ) {
            actions[ action ] = true;
        }
    } 

    const onKeyUpEvent = function( keyCode, event ) {
        var action = bindings[ keyCode ];
        if( action ) {
            actions[ action ] = false;
        }
    } 

    return {
        bind: bind,
        onKeyDownEvent: onKeyDownEvent,
        onKeyUpEvent: onKeyUpEvent,
        state: actions,
    }
} )( );

InputManager.bind( 37, "move-left" );
InputManager.bind( 38, "move-up" );
InputManager.bind( 39, "move-right" );
InputManager.bind( 40, "move-down" );

InputManager.bind( 65, "scroll-left" );
InputManager.bind( 87, "scroll-up" );
InputManager.bind( 68, "scroll-right" );
InputManager.bind( 83, "scroll-down" );