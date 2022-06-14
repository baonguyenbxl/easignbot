"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callShell = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const executer = (0, util_1.promisify)(child_process_1.exec);
const status = {
    ok: 1,
    error: 2
};
function callShell(text) {
    return __awaiter(this, void 0, void 0, function* () {
        let resp = {
            cmd: text,
            status: status.error,
            data: {}
        };
        const cmd = yield executer(text);
        if (cmd.stdout) {
            resp.data = JSON.parse(cmd.stdout);
            resp.status = status.ok;
        }
        else {
            resp.data = JSON.parse(cmd.stderr);
        }
        return resp;
    });
}
exports.callShell = callShell;
/*
export function getCommand ( values = {}, options = {} )
{
    const { contract, account, table, url } = values;
    const { limit, upper, lower, reverse, typeName } = options;
    let option = '';
    let commandtxt = "";
    if ( Object.prototype.toString.call( contract ) === '[object String]' && Object.prototype.toString.call( account ) === '[object String]' )
    {
        if ( !!Object.prototype.toString.call( table ) === '[object String]' || table === "" )
        {
            table = "assets";
        }
        let up = "", low = "";
        if ( upper && Object.prototype.toString.call( upper ) === '[object String]' && upper !== "" )
        {
            up = ` --upper=${upper}`
        }
        if ( lower && ( ( Object.prototype.toString.call( lower ) === '[object String]' && lower !== "" ) || ( Object.prototype.toString.call( lower ) === '[object Number]' && lower !== 0 ) ) )
        {
            low = ` --lower=${lower}`
        }
        if ( ( up !== "" || low !== "" ) )
        {
            let type = ( Object.prototype.toString.call( typeName ) === '[object String]' && typeName !== "" ) ? ` --encode-type=${typeName}` : "";
            let rev = ( reverse && Object.prototype.toString.call( reverse ) === '[object String]' ) ? " --reverse" : "";
            option = ( type !== "" || rev !== "" ) ? `${up}${low} --index=1 --key-type=i64${type}${rev}` : `${up}${low}`;
        }
        commandtxt = `cleos -u ${url} get table --limit=${limit} ${contract} ${account} ${table}${option}`;
    }
    return commandtxt;
}
export async function execCommand ( cmd = "", way = "", separator = separateur, actions = [] )
{
    let resp = {
        command: cmd,
        fields: way.split( separator ),
        result: undefined,
        lastValidData: undefined,
        next: 0
    }
    if ( cmd === "" ) return resp;
    let ways = way.split( separator ),
        data = undefined, response = undefined;
    try
    {
        data = await executer( cmd );
    } catch ( error )
    {
        data = undefined;
        console.log( error )
    }
    if ( data && data.stdout && Object.prototype.toString.call( data.stdout ) === '[object String]' )
    {
        let ok = undefined;
        try
        {
            ok = JSON.parse( data.stdout );
            response = ok;
            if ( ok )
            {
                if ( ok[ "next_key" ] && ok[ "next_key" ] !== "" )
                {
                    resp[ "next" ] = Number( ok[ "next_key" ] );
                } else
                {
                    resp[ "next" ] = -1;
                }
            };
        } catch ( error )
        {
            ok = undefined
            console.log( error );
        }

        let obj = ok;
        for ( var i = 0, length = ways.length; i < length; i++ )
        {
            const field = ways[ i ];
            if ( ( ( Object.prototype.toString.call( obj ) === '[object Array]' ) || ( Object.prototype.toString.call( obj ) === '[object Object]' ) ) && obj[ field ] )
            {
                resp.lastValidData = obj;
                obj = obj[ field ];
                resp.result = obj;
            } else
            {
                resp.result = undefined;
            }
        }

    }
    if ( actions && Object.prototype.toString.call( actions ) === '[object Array]' && cmd && cmd !== "" )
    {
        if ( response === null || response === undefined ) response = {};
        actions.push( [ cmd, response ] )
    }
    return resp;
}
*/
