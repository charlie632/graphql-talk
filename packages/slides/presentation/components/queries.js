import {gql} from 'apollo-boost'

const query1 = `
  query {
    hello
  }

`

const query2 = `
  query {
    goodbye
  }

`
export const queries = [query1, query2]
