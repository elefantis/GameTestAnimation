const Loader = ( function() {
    var loadJSON = function( url ) {
        // Return a new promise.
      return new Promise( function( resolve, reject ) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest(  );
        req.open( 'GET', url );

        req.onload = function(  ) {
          // This is called even on 404 etc
          // so check the status
          if ( req.status == 200 ) {
            // Resolve the promise with the response text
            resolve( JSON.parse( req.response ) );
          }
          else {
              // Otherwise reject with the status text
              // which will hopefully be a meaningful error
              let message  = "";
              try {
                  message = JSON.parse( req.response ).message;
              } catch (error) {
                  message = req.response;
              }
              reject( { status: req.status, message: Error( message )} );
          }
        };
    
        // Handle network errors
        req.onerror = function(  ) {
          reject( Error( "No es posible conectarse con el servidor, verifique su conexión a internet" ) );
        };
        
        // Make the request
        req.send( );
      } );
    }
    
    return {
        loadJSON: loadJSON,
    };
} )( );