"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("./express");
const socket_io_1 = require("./socket.io");
const connection = new express_1.Endpoint();
const io = (0, socket_io_1.getSocket)(connection.getServer());
//console.log( callShell( "ps ux" ) );
//callShell("ps ux").then((value)=>{console.log(value)}).catch((err)=>{console.log(err)})
