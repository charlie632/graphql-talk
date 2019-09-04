import {gql} from 'apollo-boost'

const baseQuery = `
query GetUser {
  getUser(id: "123abc"){
    name
    id
  }
}

`

const userFavMeal = `
query GetUser {
  getUser(id: "123abc"){
    name
    id
    favouriteMeal
  }
}

`

const failingQuery = `
 query GetUser {
  getUser(id: "123abc"){
    name
    id
    address
  }
}

`

const ordersQuery = `
  query GetUserOrders {
    getUserOrders(userId: "123abc") {
      meal
      selection
    } 
  }

`

const userWithOrder = `
  query GetUserWithOrders {
    getUser(id: "123abc") {
      name
      id
      orders {
        meal
        selection
      }
    } 
  }

`

const addOrder = `
  mutation AddOrder {
    addUserOrder(userId: "123abc", selection: 3, 
      meal: "Fish") {
        selection
        meal
    }
  }
`

const updateFavMeal = `
  mutation UpdateFavMeal {
    setFavouriteMeal(userId: "123abc", 
      meal: "Pizza") {
        name
        id
        favouriteMeal
    }
  }
`

const updateFavMealContext = `
  mutation UpdateFavMeal {
    setFavouriteMeal(meal: "Pasta") {
        name
        id
        favouriteMeal
    }
  }
`

export const queries = {
         baseQuery,
         failingQuery,
         ordersQuery,
         userWithOrder,
         userFavMeal,
       }

export const mutations = {
  addOrder, updateFavMeal, updateFavMealContext
}
