import { buildSchema } from 'graphql';
export const graph = {
    schema: buildSchema( `
  type Query {
    hello: String
  }
`),
    root: {
        hello: () =>
        {
            return 'Hello world!';
        },
    }
}
