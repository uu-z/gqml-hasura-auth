import { gqml, gql } from "gqml";
import { hashPwd, signToken, getTokenData, comparePwd, H } from "../utils";
import { ME, SIGNUP, LOGIN } from "../utils/gql";
gqml.yoga({
  typeDefs: gql`
    type Query {
      me: User!
    }
    type Mutation {
      signup(email: String!, password: String!): AuthPayload!
      login(email: String!, password: String!): AuthPayload!
    }

    type User {
      id: String!
      email: String!
    }

    type AuthPayload {
      token: String
    }
  `,
  resolvers: {
    Query: {
      me: async (parent, args, ctx) => {
        const { userId } = getTokenData(ctx);
        const user = await H.request(ME, { id: userId }).then((data: any) => data.user[0]);
        return user;
      }
    },
    Mutation: {
      signup: async (parent, { email, password }) => {
        const hashedPassword = await hashPwd(password);
        const user = await H.request(SIGNUP, { email, password: hashedPassword }).then((data: any) => data.insert_user.returning[0]);
        return {
          token: signToken(user)
        };
      },
      login: async (parent, { email, password }) => {
        const user = await H.request(LOGIN, { email }).then((data: any) => data.user[0]);
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
