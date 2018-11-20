var CanvasTile = ( function() {
    var _x = 0;
    var _y = 0;
    var _w = 100;
    var _h = 100;
    var _cvsHdl = null;
    var _ctx = null;

    var create = function( width, height ) {
        _x = -1;
        _y = -1;
        _w = width;
        _h = height;
        var can2 = document.createElement( "canvas" );
        can2.width = width;
        can2.height = height;
        _cvsHdl = can2;
        _ctx = can2.getContext( "2d" );

    }

    return {

    }
} )();