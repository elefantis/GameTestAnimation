const AtlasManager = ( function () { 
    const spriteSheets = {};
    const sprites = [ ];

    // Load an atlas
    const load = function( imgName ) {
        let img = new Image();
        img.src = imgName;
        this.img = img;
        this.url = imgName;
        spriteSheets[ imgName ] = this;
    }

    // Load atlas definition
    const parseAtlasDefinition = function( atlas ) {
        for( let key in atlas.frames ) {
            let sprite = atlas.frames[ key ];
            // Define the center
            let cx = -sprite.frame.w * 0.5; 
            let cy = -sprite.frame.h * 0.5;
            // Define the sprite for this sheet
            defSprite( key, sprite.frame.x, sprite.frame.y, sprite.frame.w, sprite.frame.h, cx, cy );
        }
    }

    const drawSprite = function( spriteName, posX, posY ) {
        for( let sheetName in spriteSheets ){
            let sheet = spriteSheets[ sheetName ];
            let sprite = getStats( spriteName );
            if( sprite == null ) continue;
            __drawSprite( sprite, sheet, posX, posY );
            return;
        }
    }

    const defSprite = function( name, x, y, w, h, cx, cy ) {
        var spt = {
            "id": name,
            "x": x,
            "y": y,
            "w": w,
            "h": h,
            "cx": cx == null ? 0 : cx,
            "cy": cy == null ? 0 : cy
        };
        sprites.push( spt );
    }

    const getStats = function( name ) {
        for( let i in sprites ) {
            if( sprites[ i ].id  == name ) return sprites[ i ];
        }
        return null;
    }

    const __drawSprite = function( spt, sheet, posX, posY ) {
        if( spt == null  || sheet == null ) return;

        let half = {
            x: spt.cx,
            y: spt.cy
        }

        ctx.drawImage( sheet.img, spt.x, spt.y, spt.w, spt.h, 
            posX + half.x, posY + half.y, spt.w, spt.h );
    }

    return {
        load: load,
        drawSprite: drawSprite,
        parseAtlasDefinition: parseAtlasDefinition,
    }
} )( );