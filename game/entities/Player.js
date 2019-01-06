function Player() {
    AnimationManager.setup();
    this.mPhysBody = PhysicsEngine.newBody();
    this.mPhysBody.setPosition( 600, 192 );
    this.walkSpeed = 8;

    this.update = function() {
        let moveDir = new Vec2( 0, 0 );
        // Move Inputs
        if( InputManager.state[ "move-up" ] ) moveDir.y = -this.walkSpeed;
        if( InputManager.state[ "move-down" ] ) moveDir.y = this.walkSpeed;
        if( InputManager.state[ "move-left" ] ) moveDir.x = -this.walkSpeed;
        if( InputManager.state[ "move-right" ] ) moveDir.x = this.walkSpeed;

        // Move vector direction
        this.mPhysBody.setLinearVelocity( moveDir.x, moveDir.y );
        // Fire Inputs

    }

    this.render = function() {
        let pos = this.mPhysBody.getPosition();
        AnimationManager.render( pos.x, pos.y );
    }
}