"use strict";
/*
import { deserialize, ObjectSchema } from "atomicassets";


const endpoint = ' https://wax.greymass.com';
const separateur = ">";
const interval = 1500;

export function deserializer ( data = [], schema = [] )
{
    let resp = undefined;
    if ( ( schema && Object.prototype.toString.call( schema ) === '[object Array]' && schema.length > 0 ) && ( data && Object.prototype.toString.call( data ) === '[object Array]' && data.length > 0 ) )
    {
        try
        {
            resp = deserialize( data, ObjectSchema( schema ) );
        } catch ( error )
        {
            console.log( error );
        }
    }

    return resp;
}
export function filterJsons ( arr = [ {} ], condition1 = [], and = true, condition2 = [] )
{
    let field1 = ( condition1 && condition1.length === 3 ) ? condition1[ 0 ] : undefined,
        comparator1 = ( condition1 && condition1.length === 3 ) ? condition1[ 1 ] : undefined,
        value1 = ( condition1 && condition1.length === 3 ) ? condition1[ 2 ] : undefined,
        field2 = ( condition2 && condition2.length === 3 ) ? condition2[ 0 ] : undefined,
        comparator2 = ( condition2 && condition2.length === 3 ) ? condition2[ 1 ] : undefined,
        value2 = ( condition2 && condition2.length === 3 ) ? condition2[ 2 ] : undefined;

}
export async function getConfig ( contract = "", separator = separateur, url = endpoint, actions = [] )
{
    let config = [];
    let vals = {
        contract: contract, account: contract, table: "config", url: url
    },
        opts = {
            limit: 1
        };
    let cmd = getCommand( vals, opts );
    let { command, fields, result, lastValidData, next } = await execCommand( cmd, `rows${separator}0${separator}format`, separator, actions );
    config = ( result ) ? result : undefined;
    return config;
}
export async function getCollection ( contract = "", collection = "", config = [], separator = separateur, url = endpoint, actions = [] )
{
    let collections = [];
    let vals = {
        contract: contract, account: contract, table: "collections", url: url
    },
        opts = {
            limit: 1, lower: collection
        };
    let cmd = getCommand( vals, opts );
    let { command, fields, result, lastValidData, next } = await execCommand( cmd, `rows${separator}0${separator}serialized_data`, separator, actions );
    collections = ( result && config ) ? changeUrlNFTs( deserializer( result, config ) ) : result;
    return collections;
}
export async function getSerie ( contract = "", collection = "", serie = '', separator = separateur, url = endpoint, actions = [] )
{
    let vals = {
        contract: contract, account: collection, table: "schemas", url: url
    },
        opts = {
            limit: 1, lower: serie
        };
    let cmd = getCommand( vals, opts );
    let { command, fields, result, lastValidData, next } = await execCommand( cmd, `rows${separator}0${separator}format`, separator, actions );
    let schema = ( result ) ? result : undefined;
    return schema;
}
export function sortArray ( data = [], path = "", asc = true )
{
    let resp = [];
    if ( Object.prototype.toString.call( data ) === '[object Array]' && data.length > 0 )
    {
        let object = data[ 0 ];
        if ( Object.prototype.toString.call( object ) === '[object Object]' && path !== "" )
        {
            try
            {
                let varx = ( asc ) ? " let x=a." + path + ".toLowerCase(), y=b." + path + ".toLowerCase();" : " let x=b." + path + ".toLowerCase(), y=a." + path + ".toLowerCase();",
                    vary = ( asc ) ? " if(x < y) {return -1}; if( x > y ) {return 1} return 0" : " if(y < x) {return -1}; if( y > x ) {return 1} return 0",
                    fun = varx + vary;
                const myFunction = ( asc ) ? new Function( "a", "b", fun ) : new Function( "b", "a", fun );
                resp = data.sort( myFunction );
            } catch ( error )
            {
                let varx = "return a." + path + " - b." + path;
                const myFunction = ( asc ) ? new Function( "a", "b", varx ) : new Function( "b", "a", varx );
                resp = data.sort( myFunction );

            } finally { resp = data.sort( function ( a, b ) { return a - b } ) }
        } else { resp = data.sort( function ( a, b ) { return a - b } ) }
    }
    return resp;
}
export function changeUrlNFTs ( obj = {}, baseURL = "https://ipfs.io/ipfs/" )
{
    let ipfs = [ "img", "cardimg", "card_img", "img2", "image" ],
        ipfsb = [ "backimg", "back_img", "img_back", "img_back_2" ],
        ipfsv = [ "vid", "video", "backvideo" ];
    ipfs.map( ip =>
    {
        let v = obj[ ip ];
        if ( ( Object.keys( obj ) ).includes( ip ) && Object.prototype.toString.call( v ) === '[object String]' && !v.startsWith( "http" ) )
        {
            obj[ ip ] = baseURL + obj[ ip ];
            obj[ "ipfs" ] = obj[ ip ];
            delete obj[ ip ];
        };
    } )
    ipfsb.map( ip =>
    {
        let v = obj[ ip ];
        if ( ( Object.keys( obj ) ).includes( ip ) && Object.prototype.toString.call( v ) === '[object String]' && !v.startsWith( "http" ) )
        {
            obj[ ip ] = baseURL + obj[ ip ];
            obj[ "ipfsb" ] = obj[ ip ]
            delete obj[ ip ];
        };
    } )
    ipfsv.map( ip =>
    {
        let v = obj[ ip ];
        if ( ( Object.keys( obj ) ).includes( ip ) && Object.prototype.toString.call( v ) === '[object String]' && !v.startsWith( "http" ) )
        {
            obj[ ip ] = baseURL + obj[ ip ]
            obj[ "ipfsv" ] = obj[ ip ]
            delete obj[ ip ];
        };
    } )
    return obj;
}
export async function getNftsByAccount ( contract = "", account = "", limit = 50, separator = separateur, url = endpoint, actions = [] )
{
    let resp = {};
    let done = [];
    let vals = {
        contract: contract, account: account, table: "assets", url: url
    },
        opts = {
            limit: limit
        };
    let cmd = getCommand( vals, opts );
    let { command, fields, result, lastValidData, next } = await execCommand( cmd, `rows`, separator, actions );
    let assets = ( result ) ? sortArray( result, "collection_name", true ) : undefined;
    let templates = [];
    let thiscol = "";
    let config = await getConfig( contract, separator, endpoint, actions );
    let temps = {};
    let data = {};
    let collection = {}, serie = {};
    if ( assets )
    {
        let collectionConfig = {};
        let serieConfig = []

        while ( assets.length > 0 )
        {
            const asset = assets[ 0 ];
            let newObject = {
                asset_id: asset[ "asset_id" ],
                template_id: asset[ "template_id" ],
                collection_name: asset[ "collection_name" ],
                schema_name: asset[ "schema_name" ]
            };
            const col = asset[ "collection_name" ];
            let ser = asset[ "schema_name" ];
            if ( !data[ col ] || ( Object.values( data[ col ] ) ).length === 0 )
            {
                collection = {};
                collectionConfig = await getCollection( contract, col, config, separator, url, actions );
                collection[ "data" ] = collectionConfig;
                newObject[ "collection_data" ] = collection[ "data" ];
            } else
            {
                collection = data[ col ];
            }
            if ( collection[ ser ] && ( Object.values( collection[ ser ] ) ).length >= 0 )
            {
                serie = collection[ ser ];
                templates = ( serie[ "templates" ] ) ? serie[ "templates" ] : [];
            } else
            {
                serie = {};
                serieConfig = await getSerie( contract, col, ser, separator, url, actions );
                serie[ "format" ] = serieConfig;
                templates = [];
            }
            if ( asset[ "immutable_serialized_data" ] && ( asset[ "immutable_serialized_data" ] ).length > 0 )
            {
                newObject[ "immutable" ] = ( serie[ "format" ] && ( serie[ "format" ] ).length > 0 ) ? changeUrlNFTs( deserializer( asset[ "immutable_serialized_data" ], serie[ "format" ] ) ) : asset[ "immutable_serialized_data" ];
            }
            if ( asset[ "mutable_serialized_data" ] && ( asset[ "mutable_serialized_data" ] ).length > 0 )
            {
                newObject[ "mutable" ] = ( serie[ "format" ] && ( serie[ "format" ] ).length > 0 ) ? changeUrlNFTs( deserializer( asset[ "mutable_serialized_data" ], serie[ "format" ] ) ) : asset[ "mutable_serialized_data" ];
            }
            templates.push( asset[ "template_id" ] );
            serie[ "templates" ] = templates;
            collection[ ser ] = serie;
            data[ col ] = collection;
            resp[ newObject.asset_id ] = newObject;
            assets.shift();
        }
        for ( let c in data )
        {
            if ( c !== "collection_data" )
            {
                let thiscol = data[ c ];
                for ( let s in thiscol )
                {
                    let thisserie = thiscol[ s ];
                    let thistemplates = ( thisserie && thisserie[ "templates" ] ) ? thisserie[ "templates" ] : [];
                    if ( thistemplates.length > 0 ) thiscol[ s ] = await getListOfTemplates( thisserie, contract, c, s, thistemplates, thisserie[ "format" ], 0, undefined, separator, url, actions );
                }
                data[ c ] = thiscol;
            }
        }
        for ( let a in resp )
        {
            let nft = resp[ a ];
            nft[ "template_data" ] = data[ nft[ "collection_name" ] ][ nft[ "schema_name" ] ][ nft[ "template_id" ] ];
            resp[ a ] = nft;
        }
    }
    return resp;
}
export async function getNftsBySerie ( contract = "", collectionName = "", serieName = '', limit = 100, separator = separateur, url = endpoint, actions = [] )
{
    let resp = {};
    let config = await getConfig( contract, separator, url, actions );
    let collection = await getCollection( contract, collectionName, config, separator, url, actions );
    let serie = await getSerie( contract, collectionName, serieName, separator, url, actions );
    let templates = await getTemplates( contract, collectionName, serieName, limit, "", "rows", separator, url, actions );
    if ( templates )
    {
        templates.map( t =>
        {
            let data = t[ "immutable_serialized_data" ];
            if ( serie && data && data.length > 0 )
            {
                resp[ t[ "template_id" ] ] = changeUrlNFTs( deserializer( data, serie ) );
            }
        } );
    }
    return resp;
}
export async function getListOfTemplates ( thisobj = {}, contract = "", collection = "", serie = "", list = [], serieConfig = [], howMany = 0, way = "", separator = separateur, url = endpoint, actions = [] )
{
    let resp = thisobj,
        temp = [],
        recsult = [],
        schema = serieConfig;
    if ( list && Object.prototype.toString.call( list ) === '[object Array]' && list.length > 0 )
    {
        list = list.sort();
        let nbToQuery = 0;
        for ( var i = 0, length = list.length; i < length; i++ )
        {
            const elem = list[ i ];
            if ( ( i + 1 ) < length )
            {
                const elem2 = list[ i + 1 ];
                nbToQuery = Number( elem2 ) - Number( elem ) + 1;
                if ( nbToQuery >= 0 )
                {
                    temp = await getTemplates( contract, collection, serie, nbToQuery, Number( elem ), "rows", separator, url, actions );
                    //console.log( 'temp', temp );
                    let rows = temp.filter( element => ( element[ "template_id" ] === elem ) ),
                        row = ( rows ) ? rows[ 0 ] : rows;
                    if ( row && Object.prototype.toString.call( row ) === '[object Object]' )
                    {
                        let key = row[ "template_id" ],
                            data = row[ "immutable_serialized_data" ];
                        if ( data && data.length > 0 && schema && key ) resp[ key ] = changeUrlNFTs( deserializer( data, schema ) );
                    }
                    rows = temp.filter( element => ( element[ "template_id" ] === elem2 ) );
                    row = ( rows ) ? rows[ 0 ] : rows;
                    if ( row && Object.prototype.toString.call( row ) === '[object Object]' )
                    {
                        let key = row[ "template_id" ],
                            data = row[ "immutable_serialized_data" ];
                        if ( data && data.length > 0 && schema && key ) resp[ key ] = changeUrlNFTs( deserializer( data, schema ) );
                    }
                    i += 1;
                } else if ( nbToQuery === 0 )
                {
                    temp = await getTemplates( contract, collection, serie, 1, Number( elem ), "rows", separator, url, actions );
                    //result = result.concat( temp );
                    let row = ( temp[ 0 ] ) ? temp[ 0 ] : {};
                    if ( row && Object.prototype.toString.call( row ) === '[object Object]' )
                    {

                        let data = row[ "immutable_serialized_data" ],
                            key = row[ "template_id" ];
                        if ( data && data.length > 0 && schema && key ) resp[ key ] = changeUrlNFTs( deserializer( data, schema ) );
                    }
                }

            } else
            {
                temp = await getTemplates( contract, collection, serie, 1, Number( elem ), `rows${separator}0`, separator, url, actions );
                let row = ( temp[ 0 ] ) ? temp[ 0 ] : {};
                if ( row && Object.prototype.toString.call( row ) === '[object Object]' )
                {

                    let data = row[ "immutable_serialized_data" ],
                        key = row[ "template_id" ];
                    if ( data && data.length > 0 && schema && key ) resp[ key ] = changeUrlNFTs( deserializer( data, schema ) );
                }
            }
        }
    } else if ( howMany && Object.prototype.toString.call( howMany ) === '[object Number]' && howMany > 0 )
    {
        temp = await getTemplates( contract, collection, serie, howMany, 0, "rows", separator, url, actions );
        let rows = temp;
        if ( rows && Object.prototype.toString.call( rows ) === '[object Array]' )
        {
            rows.map( r =>
            {
                let key = r[ "template_id" ],
                    data = r[ "immutable_serialized_data" ];
                if ( data && data.length > 0 && schema && key ) resp[ key ] = changeUrlNFTs( deserializer( data, schema ) );
            } )
        }
    }
    return resp;
}
export async function getTemplates ( contract = "", collection = "", serie = "", nbrows = 1000, lower = "", way = "", separator = separateur, url = endpoint, actions = [] )
{
    const maxnb = 100;
    let nb = nbrows;
    let limit = ( nb > maxnb || nb === 0 ) ? maxnb : nb;
    let resp = [];
    let temp = [];
    let vals = {
        contract: contract, account: collection, table: "templates", url: url
    },
        opts = {
            limit: limit, upper: serie, lower: lower, typeName: "schema_name", reverse: ""
        };
    let cmd = getCommand( vals, opts );
    let { command, fields, result, lastValidData, next } = await execCommand( cmd, `rows`, separator, actions );
    if ( result !== null && result !== undefined )
    {
        //console.log( 'result: ', result );
        let tmp = result.filter( element => ( element[ "immutable_serialized_data" ] ).length > 0 );
        resp = resp.concat( tmp );
        nb = nbrows - resp.length;
    }
    let nextID = ( next && !isNaN( Number( next ) ) && Number( next ) > 0 ) ? Number( next ) : 0;
    while ( nextID > 0 && nb > 0 )
    {
        limit = ( nb > maxnb ) ? maxnb : nb;
        opts[ "lower" ] = nextID;
        opts[ "limit" ] = limit;
        cmd = getCommand( vals, opts );
        let { command, fields, result, lastValidData, next } = await execCommand( cmd, way, separator, actions );
        if ( result )
        {
            temp = result.filter( element => ( element[ "immutable_serialized_data" ] ).length > 0 );
            resp = resp.concat( temp );
        }
        nextID = ( next && !isNaN( Number( next ) ) && Number( next ) > 0 ) ? Number( next ) : 0;
        nb = nbrows - resp.length;
    }
    return resp;
}
*/
