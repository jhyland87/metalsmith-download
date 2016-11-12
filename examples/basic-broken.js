const Metalsmith        = require('metalsmith')
const download          = require('../lib')
const debug             = require('metalsmith-debug')
const summary           = require('metalsmith-summary')
const markdown          = require('metalsmith-markdown')
const layouts           = require('metalsmith-layouts')
const handlebars        = require('handlebars')
/*
const models            = require('metalsmith-models')
const assets            = require('metalsmith-assets')
const templates         = require('metalsmith-templates')
const inplace           = require('metalsmith-in-place')
const copy              = require('metalsmith-copy')
const jsonFiles         = require('metalsmith-json')
const jsonToFiles       = require('metalsmith-json-to-files')
const tojson            = require('metalsmith-to-json')
const metadata          = require('metalsmith-metadata')
const metafiles         = require('metalsmith-metafiles')
const static            = require('metalsmith-static')
const include           = require('metalsmith-include')
const partial           = require('metalsmith-partial')
const discoverPartials  = require('metalsmith-discover-partials')
const partials          = require('metalsmith-jstransformer-partials')
const jstransformer     = require('metalsmith-jstransformer')
*/
const _                 = require('flat-line')

const metalsmith = Metalsmith(__dirname)

metalsmith
    .use(summary.init())
    .use(debug())
    .source( './src' )
    .destination( './public' )
    .use(markdown())
    .use(layouts({
        engine: 'handlebars'
    }))
    .clean( true )
    .use(download( 'tester' ))
    .use(summary.print())
    .build(function(err, files) {
        console.log('metalsmith:',metalsmith)
        console.log('partials:',Object.keys(handlebars.partials))
        
        if (err) {
            return console.log('ERROR:', err)
        }

        console.log('Completed')
    })