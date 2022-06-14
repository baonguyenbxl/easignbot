"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graph = void 0;
const graphql_1 = require("graphql");
exports.graph = {
    schema: (0, graphql_1.buildSchema)(`
  type Query {
    hello: String
  }
`),
    root: {
        hello: () => {
            return 'Hello world!';
        },
    }
};
