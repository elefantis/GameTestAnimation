function CanvasTile() {
    this.x = 0;
    this.y = 0;
    this.w = 100;
    this.h = 100;
    this.cvsHdl = null;
    this.ctx = null;

    this.create = function( width, height ) {
        this.x = -1;
        this.y = -1;
        this.w = width;
        this.h = height;
        var can2 = document.createElement( "canvas" );
        can2.width = width;
        can2.height = height;
        this.cvsHdl = can2;
        this.ctx = can2.getContext( "2d" );
    }

    this.isVisible = function () {
        var r2 = MapManager.getViewRect();
        return MapManager.intersectRect( {
            top: this.y,
            left: this.x,
            bottom: this.y + this.h,
            right: this.x + this.w
        }, {
            top: r2.y,
            left: r2.x,
            bottom: r2.y + r2.h,
            right: r2.x + r2.w
        } );
    }
}