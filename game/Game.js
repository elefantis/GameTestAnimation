function Game() {
    var states = {
        "menu": new Menu( this ),
        "level1": new Level1( this )
    };
    
    var state = states[ "menu" ]; 

    this.update = function() {
        state.update();
    } 
    this.render = function() {
        state.render();
    } 

    this.changeState = function( newState ) {
        if ( !states[ newState ] ) {
            state = states[ "menu" ];
        } else {
            state = states[ newState ];
        }
    }
}