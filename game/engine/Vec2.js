function Vec2( x, y ) {
    this.x = x;
    this.y = y;
    
    this.calculateLength = function() {
        return Math.pow( Math.pow( this.x, 2) + Math.pow( this.y, 2 ), 0.5 );
    }

    this.length = this.calculateLength();

    this.normalize = function() {
        this.x = this.x / this.length;
        this.y = this.y / this.length;
        this.length = 1; 
    }

    this.multiply = function( number ) {
        console.log( number )
        this.x *= number;
        this.y *= number;
        this.calculateLength();
        console.log( this.x, this.y, this.length )
    }
}