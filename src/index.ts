import {Endpoint} from './express';
import { getSocket } from './socket.io';
import { callShell } from './eos';
const connection = new Endpoint();

const io = getSocket( connection.getServer() );
