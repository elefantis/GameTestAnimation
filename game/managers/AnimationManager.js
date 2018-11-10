const AnimationManager = ( function() {
    var frameRate = 6;
    var frame  = 0;
    var time = 0;
    var frameLength = 15;
    
    var assets = [
        'player0000.png',
        'player0001.png',
        'player0002.png',
        'player0003.png',
        'player0004.png',
        'player0005.png',
        'player0006.png',
        'player0007.png',
        'player0008.png',
        'player0009.png',
        'player0010.png',
        'player0011.png',
        'player0012.png',
        'player0013.png',
        'player0014.png',
    ];

    var setup = function() {
        Loader.loadJSON( 'game/data/player.json').then( ( data ) => {
            AtlasManager.parseAtlasDefinition( data );
            AtlasManager.load( 'game/assets/playerShip.png' );
        }).catch( ( error ) => {
            console.log( error );
        });
    }

    var animate = function() {
        AtlasManager.drawSprite( assets[ frame ], 600, 192 )

        time = Math.floor( ( time + 1 ) % frameRate );
        if( time === 0 ) {
            frame = ( frame + 1 ) % frameLength;
        }
    }

    return {
        setup: setup,
        render: animate,
    }
} )( );