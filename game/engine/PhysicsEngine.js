const PhysicsEngine = ( function( ) {
    const bodies = [];

    const newBody = function() {
        var newBodyObject = new PhysicsEngine.Body()
        bodies.push( newBodyObject );
        return newBodyObject;
    }

    const update = function( ) {
        for( let i = bodies.length - 1; i >= 0; i-- ){ 
            let bodyVel = bodies[ i ].getVelocity( );
            let bodyPos = bodies[ i ].getPosition( );
            let newX = bodyPos.x + bodyVel.x;
            let newY = bodyPos.y + bodyVel.y;
            bodies[ i ].setPosition( newX, newY );
        }
    }

    return {
        newBody: newBody,
        update: update,
    }
} )( );

PhysicsEngine.Body = function() {
    var physDat = {
        pos: { x: 0, y: 0 },
        mass: 1,
        size: { x: 32, y: 32 },
        velocity: { x: 0, y: 0 },
        setPosition: function( x, y ) {
            this.pos.x = x;
            this.pos.y = y;
        },
        setVelocity: function( x, y ) {
            this.velocity.x = x;
            this.velocity.y = y;
        },
    }

    this.setLinearVelocity = function( x, y ) {
        physDat.setVelocity( x, y );
    }

    this.setPosition = function( x, y ) {
        physDat.setPosition( x, y );
    }

    this.getPosition = function( ) {
        return physDat.pos;
    }

    this.getVelocity = function( ) {
        return physDat.velocity;
    }
}