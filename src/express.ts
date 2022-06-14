import express, {Express} from 'express';
import http, { ClientRequest, ServerResponse, RequestListener } from 'http';
import { callShell } from "./eos";
import { graphqlHTTP } from 'express-graphql';
//import { buildSchema } from 'graphql';
import {graph} from './graphql'
const PORT = process.env.PORT || 8484;
const HOST= process.env.HOST || "localhost"


// routes or endpoint
const endpoints = {
    main: "/",
    info: "/info",
    companies: "/companies",
    graphql:"/graphql"
}
/*
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};
*/
// server Express
export class Endpoint
{
    app: Express; port: string | Number; server: http.Server; host: String;
    constructor ( p: string | Number = PORT,h:String=HOST )
    {
        this.app = express();
        this.port = p;
        this.host = h;
        this.server = http.createServer( this.app );
        // server GraphQL
        this.app.use( endpoints.graphql, graphqlHTTP( {
            schema: graph.schema,
            rootValue: graph.root,
            graphiql: true,
        } ) );

        // express routes
        this.app.get( endpoints.main, ( req: express.Request, res: express.Response ): void =>
        {
            const resp = Endpoint.handleGetRequest( endpoints.main, req );
            resp.then( ( value ) =>
            {
                res.status( 200 ).send( value.data );
                res.end();
            } ).catch( ( err ) =>
            {
                res.status( 415 ).send( err );
                res.end();

            } )
        } );
        this.app.get( endpoints.companies, ( req: express.Request, res: express.Response ): void =>
        {
            const resp = Endpoint.handleGetRequest( endpoints.companies, req );
            resp.then( ( value ) =>
            {
                res.status( 200 ).send( value.data );
                res.end();
            } ).catch( ( err ) =>
            {
                res.status( 415 ).send( err );
                res.end();

            } )
        } );
        this.app.get( endpoints.info, ( req: express.Request, res: express.Response ): void =>
        {
            const resp = Endpoint.handleGetRequest( endpoints.info, req );
            resp.then( ( value ) =>
            {
                res.status( 200 ).send( value.data );
                res.end();
            } ).catch( ( err ) =>
            {
                res.status( 415 ).send( err );
                res.end();

            })

        } );
        this.server.listen( { port: this.port, host: this.host }, () => console.log( `listening on ${this.host}:${this.port}` ) );
    }
    getServer (): http.Server
    {
        return this.server;
    }
    // routes handlers
    static async handleGetRequest ( endpoint:String,req:express.Request)
    {
        let resp = {
            message: "OK",
            data:{}
        };
    
        switch (endpoint) {
            case endpoints.main:
                
                resp.data = {
                    nombre: 200,
                    ip: req.ip,
                    hostname: req.hostname,
                    url: req.url,
                    baseUrl: req.baseUrl,
                    query: req.query,
                    params: req.params,
                    body:req.body
                }
                break;
            case endpoints.info:
                resp.data = {
                    companies: 423,
                    recruiters: 5312,
                    employees: 150234,
                    users: 136571321,
                    ip: req.ip,
                    hostname: req.hostname,
                    url: req.url,
                    baseUrl: req.baseUrl,
                    query: req.query,
                    params: req.params,
                    body: req.body
                }
                break;
            case endpoints.companies:
                resp.data = await callShell( "cleos -u https://wax.greymass.com get info" );
                break;
            default:
                break;
        }
        return resp;
    }    
}

