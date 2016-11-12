const Fs    = require( 'fs' )
const Hoek  = require( 'hoek' )
const Wreck = require( 'wreck' )
const Async = require( 'async' )
const _     = require( 'flat-line' )

// Declare internals

const internals = {};


module.exports = options => {
    const optType = _.typeof( options )

    Hoek.assert( ( _.size( options ) > 0 && _.findIndex( [ 'array','object' ], optType ) === -1 ), 'Invalid data provided, expecting an object, or an array of objects - received type "'+ optType +'"' )

    const optionsType = options.constructor.name

    if( optionsType === 'Object' ){
        options = [ options ]
    }
    else if( optionsType !== 'Array' ){
        throw new Error( 'Invalid element type for optionsType ('+ optionsType +') - Value: ' + JSON.stringify( options ) )
    }

    Async.every( options, ( fileOpts, callback ) => {
        if ( ! fileOpts || ! fileOpts.url || ! fileOpts.file ){
            return callback( 'Requires options for url and file' )
        }

        callback( null, 'Worked for fileOpts.file:', fileOpts.file )         
    }, ( err, result ) => {
        Hoek.assert( ( err === null && result === true ), 'Missing data in download items specified' )
    })

    return ( files, metalsmith, next ) => {
        Async.map( options, ( fileOptions, cb ) => {

            let file = Fs.createWriteStream( fileOptions.file )
            let dlResult = [ null, null ]

            Wreck.request( 'get', fileOptions.url, { rejectUnauthorized: false }, ( err, res ) => {              
                /* // Trying to overwrite this with the Hoek assertion below
                if ( err ){ 
                    dlResult[0] = err
                    return
                }
                */

                Hoek.assert( ! err, 'Error encountered when downloading '+fileOptions.url+' and saving it to '+fileOptions.name+': ' + ( _.size( err ) ? err.toString() : err ) )
                
                res.pipe( file )

                dlResult[1] = res
            })

            cb( dlResult[0], dlResult[1] )

        }, ( err, results ) => {
            if( err ){
                throw new Error( err )
            }

            next( err )
        })
    }
}