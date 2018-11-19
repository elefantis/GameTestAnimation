const MapManager = ( function( ) {
    var _currMapData = null;
    var _tilesets = [];
    var _numXTiles = 100;
    var _numYTiles = 100;
    var _tileSize = { "x": 32, "y": 32 };
    var _pixelSize = { "x": 32, "y": 32 };
    var _fullyLoaded = false;

    
    const parseMapJson = function( mapJSON ) {
        _currMapData = mapJSON;
        var map = _currMapData;
        var imgLoadCount = 0;
        _numXTiles = map.width;
        _numYTiles = map.height;
        _tileSize.x = map.tilewidth;
        _tileSize.y = map.tileheight;
        _pixelSize.x = _numXTiles * _tileSize.x;
        _pixelSize.y = _numYTiles * _tileSize.y;
        // Load our tileset if we are a client
        for( let i in map.tilesets ) {
            var img = new Image();
            img.onload = function() {
                imgLoadCount++;
                if( imgLoadCount === map.tilesets.length ) {
                    _fullyLoaded = true;
                }
            }
            console.log( map.tilesets[ i ].source )
            img.src = map.tilesets[ i ].source;
            var ts = {
                "firstgid": map.tilesets[ i ].firstgid,
                "image": img,
                "columns": map.tilesets[ i ].columns
            }
            _tilesets.push( ts );
        }
    }

    const getTilePacket = function( tileIndex ) {
        var i = 0;
        var pkt ={
            "img": null,
            "px": 0,
            "py": 0,
        }
        for( i = _tilesets.length - 1; i >= 0; i--) {
            if( _tilesets[ i ].firstgid <= tileIndex ) break;
        }
        pkt.img = _tilesets[ i ].image;
        var localIdx = tileIndex - _tilesets[ i ].firstgid;
        var lTileX = Math.floor( localIdx % _tilesets[ i ].columns ) * _tileSize.x;
        var lTileY = Math.floor( localIdx / _tilesets[ i ].columns ) * _tileSize.y;
       
        pkt.px = lTileX;
        pkt.py = lTileY;
        return pkt;
    }

    const draw = function() {
        // console.log( _fullyLoaded)
        if( !_fullyLoaded ) return;

        for( let layerIdx in _currMapData.layers ) {
            if( _currMapData.layers[ layerIdx ].type != "tilelayer" ) {
                continue;
            }
            var data = _currMapData.layers[ layerIdx ].data;
            for( let tileIndex in data ){
                var tID = data[ tileIndex ];
                if( data[ tileIndex ] === 0) continue;
                var tPKT = getTilePacket( tID ) ;
                // Get the x, y tile position
                var worldX = Math.floor( tileIndex % _numXTiles ) * _tileSize.x;
                var worldY = Math.floor( tileIndex / _numYTiles ) * _tileSize.y;
                // Draw the tile
                // console.log( tPKT.img, tPKT.px, tPKT.py, 
                //     _tileSize.x, _tileSize.y, worldX, worldY, _tileSize.x, _tileSize.y)
                ctx.drawImage( tPKT.img, tPKT.px, tPKT.py, 
                    _tileSize.x, _tileSize.y, worldX, worldY, 
                    _tileSize.x, _tileSize.y );
            }
        }
    }

    var setup = function() {
        Loader.loadJSON( 'game/data/map1.json').then( ( data ) => {
            
            parseMapJson( data );
        }).catch( ( error ) => {
            console.log( error );
        });
    }

    return {
       render: draw,
       setup: setup,
    };
} ) ( );