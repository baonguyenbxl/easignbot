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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const eos_1 = require("./eos");
const PORT = 8484;
const HOST = "localhost";
const endpoints = {
    main: "/",
    info: "/info",
    companies: "/companies"
};
class Endpoint {
    constructor(p = PORT, h = HOST) {
        this.app = (0, express_1.default)();
        this.port = p;
        this.host = h;
        this.server = http_1.default.createServer(this.app);
        this.app.get(endpoints.main, (req, res) => {
            const resp = Endpoint.handleGetRequest(endpoints.main, req);
            resp.then((value) => {
                res.status(200).send(value.data);
                res.end();
            }).catch((err) => {
                res.status(415).send(err);
                res.end();
            });
        });
        this.app.get(endpoints.companies, (req, res) => {
            const resp = Endpoint.handleGetRequest(endpoints.companies, req);
            resp.then((value) => {
                res.status(200).send(value.data);
                res.end();
            }).catch((err) => {
                res.status(415).send(err);
                res.end();
            });
        });
        this.app.get(endpoints.info, (req, res) => {
            const resp = Endpoint.handleGetRequest(endpoints.info, req);
            resp.then((value) => {
                res.status(200).send(value.data);
                res.end();
            }).catch((err) => {
                res.status(415).send(err);
                res.end();
            });
        });
        this.server.listen({ port: this.port, host: this.host }, () => console.log(`listening on ${this.host}:${this.port}`));
    }
    getServer() {
        return this.server;
    }
    static handleGetRequest(endpoint, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = {
                message: "OK",
                data: {}
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
                        body: req.body
                    };
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
                    };
                    break;
                case endpoints.companies:
                    resp.data = yield (0, eos_1.callShell)("cleos -u https://wax.greymass.com get info");
                    break;
                default:
                    break;
            }
            return resp;
        });
    }
}
exports.Endpoint = Endpoint;
