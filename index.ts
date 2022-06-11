import {Endpoint} from './express';
import { getSocket } from './socket.io';
import { callShell } from './eos';
const connection = new Endpoint();

const io = getSocket( connection.getServer() );

//console.log( callShell( "ps ux" ) );
//callShell("ps ux").then((value)=>{console.log(value)}).catch((err)=>{console.log(err)})
