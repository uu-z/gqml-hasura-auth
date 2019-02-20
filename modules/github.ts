import axios from "axios";
import { gql, gqml } from "gqml";
import { signToken } from "../utils";
import * as G from "../utils/gql";

gqml.yoga({
  typeDefs: gql`
    type Mutation {
      authenticate_github(code: String!): AuthPayload!
    }
  `,
  resolvers: {
    Mutation: {
      authenticate_github: async (parent, { code }, ctx, info) => {
        const githubToken = await getGithubToken(code);
        const githubUser = await getGithubUser(githubToken);
        let user = await G.user({
          where: {
            githubUserId: {
              _eq: `${githubUser.id}`
            }
          }
        });
        if (!user) {
          user = await G.insertUser({
            objects: [
              {
                name: githubUser.name,
                email: githubUser.email,
                avatar: githubUser.avatar_url,
                githubUserId: `${githubUser.id}`
              }
            ]
          });
        }
        return {
          token: signToken(user)
        };
      }
    }
  }
});

export interface GithubUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

export async function getGithubToken(code: string): Promise<string> {
  try {
    const { data } = await axios({
      url: "https://github.com/login/oauth/access_token",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      data: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      }
    });
    return data.access_token;
  } catch (e) {
    throw new Error(e);
  }
}

export async function getGithubUser(access_token: string): Promise<GithubUser> {
  try {
    const { data } = await axios(`https://api.github.com/user?access_token=${access_token}`);
    return data;
  } catch (e) {
    throw new Error(e);
  }
}
