exports.typeDefs = `

type Recipe {
  name: String!
  category: String!
  description: String!
  instructions: String!
  likes: Int!
  createdDate: String
  user: String!
}

type User {
  username: String! @unique
  password: String!
  email: String!
  joinDate: String
  favourites: [Recipe]
}

`;
