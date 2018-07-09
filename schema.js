exports.typeDefs = `

type Recipe {
  id: ID!
  name: String!
  category: String!
  description: String!
  instructions: String!
  likes: Int!
  createdDate: String
  user: String!
}

type User {
  id: ID!
  username: String! @unique
  password: String!
  email: String!
  joinDate: String
  favourites: [Recipe]
}

type Query {
  getAllRecipes: [Recipe]
}

type Token {
  token: String!
}

type Mutation {
  addRecipe(name: String!, description: String!, category: String!, instructions: String!, user: String!): Recipe

  removeRecipe(id: ID!): Recipe

  signinUser(username: String!, password: String!): Token

  signupUser(username: String!, email: String!, password: String!): Token
}

`;
