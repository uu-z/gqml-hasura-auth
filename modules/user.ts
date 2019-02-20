import { gqml, gql } from "gqml";
import { hashPwd, signToken, getTokenData, comparePwd, H } from "../utils";
import * as G from "../utils/gql";

gqml.yoga({
  typeDefs: gql`
    type Query {
      me: User!
    }
    type Mutation {
      signup(email: String!, password: String!): AuthPayload!
      login(email: String!, password: String!): AuthPayload!
    }
    enum Role {
      admin
      user
    }
    type User {
      id: String!
      email: String!
      name: String
      password: String
      avatar: String
      githubUserId: String
      role: Role
    }

    type AuthPayload {
      token: String
    }
  `,
  resolvers: {
    Query: {
      me: async (parent, args, ctx) => {
        const { userId } = getTokenData(ctx);
        const user = await G.user({
          where: {
            id: {
              _eq: userId
            }
          }
        });
        return user;
      }
    },
    Mutation: {
      signup: async (parent, { email, password }) => {
        const hashedPassword = await hashPwd(password);
        const user = await G.insertUser({
          objects: [{ email, password: hashedPassword }]
        });
        return {
          token: signToken(user)
        };
      },
      login: async (parent, { email, password }) => {
        const user = await G.user({
          where: {
            email: {
              _eq: email
            }
          }
        });
        if (!user) throw new Error("No such user found.");
        const validPwd = await comparePwd(password, user.password);
        if (!validPwd) throw new Error("Invalid password.");
        return {
          token: signToken(user)
        };
      }
    }
  }
});
