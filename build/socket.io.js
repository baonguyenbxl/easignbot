"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocket = void 0;
const socket_io_1 = require("socket.io");
function getSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            credentials: false
        }
    });
    console.log('socket is on ');
    io.on('connection', (socket) => {
        console.log('welcome ', socket.id);
        /*socket.on( 'nfts', async ( what, target, limit, contract, by ) =>
        {
    
            if ( target !== "" )
            {
                let actions = [];
                let ok = {}, val = undefined;
                if ( what === "templates" && by !== "" )
                {
                    if ( !contract || contract === "" ) contract = "atomicassets"
                    ///console.log( 'templates', contract, ok, target, by, limit );
                    ok = await getNftsBySerie( contract, target, by, limit, separateur, endpoint, actions );
                    //console.log('templates',ok);
                }
                else
                {
                    if ( !limit || limit === 0 ) limit = 30
                    //console.log('assets',contract, ok, target, by, limit)
                    ok = await getNftsByAccount( contract, target, limit, separateur, endpoint, actions );
                    //console.log( 'assets', ok );
                }
                if ( ok )
                {
                    let resp = Object.values( ok );
                    if ( resp && Object.prototype.toString.call( resp ) === '[object Array]' && resp.length > 0 )
                    {
                        //console.log( resp );
                        socket.emit( "nfts", resp );
    
                    };
                    if ( actions && actions.length > 0 ) socket.emit( 'actions', actions );
                }
                //console.log('result',ok);
    
            }
    
        } );*/
        /*socket.on( "getdata", async ( what, contract, limit, target, lower ) =>
        {
            let actions = [];
            let resp = [];
            let vals = undefined,
                opts = {};
            let field = "", event = "listcols";
            if ( what !== null && what !== undefined && what !== "" )
            {
                switch ( what )
                {
                    case "collections":
                        vals = {
                            contract: contract, account: contract, table: what, url: endpoint
                        };
                        opts = {
                            limit: limit, lower: lower
                        };
                        field = "collection_name";
                        event = "listcols";
                        break;
                    case "schemas":
                        vals = {
                            contract: contract, account: target, table: what, url: endpoint
                        };
                        opts = {
                            limit: limit, lower: lower
                        };
                        field = "schema_name";
                        event = "listseries";
                        break;
                    default:
                        field = "";
                        event = "";
                        break;
                }
                let cmd = ( vals ) ? getCommand( vals, opts ) : "";
                let msgback = ( cmd !== "" ) ? await execCommand( cmd, `rows`, separateur, actions ) : undefined;
                let command = ( msgback && msgback.command ) ? msgback.command : "",
                    fields = ( msgback && msgback.fields ) ? msgback.fields : [],
                    result = ( msgback && msgback.result ) ? msgback.result : undefined,
                    lastValidData = ( msgback && msgback.lastValidData ) ? msgback.lastValidData : undefined,
                    next = ( msgback && msgback.next ) ? msgback.next : "";
                if ( field !== "" )
                {
                    if ( result )
                    {
                        result.map( r =>
                        {
                            resp.push( r[ field ] );
                        } );
                        if ( event !== "" )
                        {
                            socket.emit( event, resp )
                        };
                    }
    
                };
                if ( actions && actions.length > 0 ) socket.emit( 'actions', actions );
            }
        } );*/
    });
    return io;
}
exports.getSocket = getSocket;
