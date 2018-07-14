exports.typeDefs = `

type Recipe {
  id: ID!
  imageUrl: String!
  name: String!
  category: String!
  description: String!
  instructions: String!
  likes: Int!
  createdDate: String
  username: String!
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

  getRecipe(id: ID!): Recipe

  getUserRecipes(username: String!): [Recipe]

  searchRecipes(searchTerm: String!): [Recipe]

  getCurrentUser: User
}

type Token {
  token: String!
}

type Mutation {
  addRecipe(name: String!, imageUrl: String!, description: String!, category: String!, instructions: String!, username: String!): Recipe

  likeRecipe(id: ID!, username: String!): Recipe

  unlikeRecipe(id: ID!, username: String!): Recipe

  deleteUserRecipe(id: ID!): Recipe

  signinUser(username: String!, password: String!): Token

  signupUser(username: String!, email: String!, password: String!): Token
}

`;
