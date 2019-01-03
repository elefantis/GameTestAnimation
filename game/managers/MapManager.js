const MapManager = ( function( ) {
    var _currMapData = null;
    var _tilesets = [];
    var _numXTiles = 100;
    var _numYTiles = 100;
    var _tileSize = { "x": 32, "y": 32 };
    var _pixelSize = { "x": 32, "y": 32 };
    var _fullyLoaded = false;
    var _viewRect = {};
    var _canvasTileArray = [ ];

    var setup = function() {
        _viewRect = {
            "x": 0,
            "y": 0,
            "w": WIDTH,
            "h": HEIGHT
        }

        Loader.loadJSON( 'game/data/map2.json').then( ( data ) => {
            parseMapJson( data );
        }).catch( ( error ) => {
            console.log( error );
        });

    }
    
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
        // console.log( _numXTiles, _numYTiles,  )
        // Load our tileset if we are a client
        for( let i in map.tilesets ) {
            var img = new Image();
            img.onload = function() {
                imgLoadCount++;
                if( imgLoadCount === map.tilesets.length ) {
                    preDrawCache();
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

        for( let r1 of _canvasTileArray ) {
            if( r1.isVisible( ) ) {
                ctx.drawImage( r1.cvsHdl, r1.x - _viewRect.x, r1.y - _viewRect.y );
            }
        }
    }

    const preDrawCache = function( ) {
        var xCanvasCount = 1 + Math.floor( _pixelSize.x / _tileSize.x );
        var yCanvasCount = 1 + Math.floor( _pixelSize.y / _tileSize.y );

        console.log( _pixelSize.x, _tileSize.x,  xCanvasCount ) 
        for( let yC = 0; yC < yCanvasCount; yC++ ) {
            for( let xC = 0; xC < xCanvasCount; xC++ ) {
                var k = new CanvasTile();
                k.create( _tileSize.x, _tileSize.y );
                k.x = xC * _tileSize.x;
                k.y = yC * _tileSize.y;
                _canvasTileArray.push( k );
                fillCanvasTile( k );
            }
        }
        _fullyLoaded = true;
    }

    const fillCanvasTile = function( ctile ) {
        var ctx = ctile.ctx;
        ctx.fillRect( 0, 0, ctile.w, ctile.h );
        var vRect = {
            top: ctile.y,
            right: ctile.x + ctile.w,
            bottom: ctile.y + ctile.h,
            left: ctile.x,
        }
        

        for( let layerIdx in _currMapData.layers ) {
            if( _currMapData.layers[ layerIdx ].type != "tilelayer" ) {
                continue;
            }
            var data = _currMapData.layers[ layerIdx ].data;
            for( let tileIndex in data ) {
                var tID = data[ tileIndex ];
                if( data[ tileIndex ] === 0) continue;
                
                var tPKT = getTilePacket( tID ) ;
                
                // Get the x, y tile position
                var worldX = Math.floor( tileIndex % _numXTiles ) * _tileSize.x;
                var worldY = Math.floor( tileIndex / _numXTiles ) * _tileSize.y;
                
                var visible = intersectRect( vRect, {
                    left: worldX,
                    top: worldY,
                    bottom: worldY + _tileSize.y,
                    right: worldX + _tileSize.x,
                });

                if( !visible ) continue;

                worldX -= vRect.left;
                worldY -= vRect.top;
                
                // Draw the tile
                ctx.drawImage( tPKT.img, tPKT.px, tPKT.py, 
                    _tileSize.x, _tileSize.y, worldX, worldY, 
                    _tileSize.x, _tileSize.y );
            }
        }
    }

    const intersectRect = function( r1, r2 ) {
        return !( r2.left > r1.right || r2.right < r1.left || 
                  r2.top > r1.bottom || r2.bottom < r2.right );
    }

    const centerAt = function( x, y ) {
        _viewRect.w = WIDTH;
        _viewRect.h = HEIGHT;
        _viewRect.x = x - WIDTH / 2;
        _viewRect.y = y - HEIGHT / 2;
    }

    return {
       render: draw,
       setup: setup,
       viewRect: _viewRect,
       centerAt: centerAt,
       intersectRect: intersectRect,
       preDrawCache: preDrawCache,
    };

} ) ( );