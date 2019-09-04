const express = require('express')
const {ApolloServer, gql} = require('apollo-server-express')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    name: String!
    id: ID!
    orders: [Order]
    favouriteMeal: String
  }

  type Order {
    selection: Int
    meal: String
  }

  input UserInput {
    name: String!
    id: ID!
  }

  type Query {
    getUser(id: ID!): User
    getUserOrders(userId: ID!): [Order]
  }

  type Mutation {
    addUser(user: UserInput): User
    addUserOrder(userId: ID!, selection: Int, meal: String): Order
    setFavouriteMeal(userId: ID, meal: String): User
  }
`

let users = {
  '123abc': {
    name: 'Charlie',
    id: '123abc',
  },
}
let orders = [{userId: '123abc', selection: 1, meal: 'Chips'}]

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    getUser: (_, {id}) => getUser(id),
    getUserOrders: (_, {userId}) => {
      const userOrders = getUserOrders(userId)
      return userOrders
    },
  },
  Mutation: {
    addUser: (_, {user}) => {
      users[user.id] = user
      return user
    },
    addUserOrder: (_, {userId, selection, meal}) => {
      orders.push({userId, selection, meal})
      return {selection, meal}
    },
    setFavouriteMeal: (_, {meal}, {userId}) => {
      const updatedUser = updateUser({favouriteMeal: meal, id: userId})
      return updatedUser
    },
  },
  User: {
    orders: root => {
      const userOrders = getUserOrders(root.id)
      return userOrders
    },
  },
}

function updateUser(userObj) {
  let user = users[userObj.id]
  modifiedUser = {...user, ...userObj}
  users[modifiedUser.id] = modifiedUser
  return modifiedUser
}

function getUserOrders(userId) {
  return orders.filter(o => o.userId === userId)
}

function getUser(id) {
  return users[id]
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    return {userId: req.userId}
  },
})

const app = express()
app.use(async (req, res, next) => {
  await new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, 200)
  )

  req.userId = '123abc'
  next()
})
server.applyMiddleware({app})

app.listen({port: 4000}, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
