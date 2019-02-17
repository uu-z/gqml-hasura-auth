import { hash, compare } from "bcryptjs";
import { GraphQLClient } from "gqml";
const { HASURA_ENDPOINT, HASURA_ACCESS_KEY } = process.env;

export * from "./auth";
export const hashPwd = password => hash(password, 10);
export const comparePwd = (passwrod, hashPassword) => compare(passwrod, hashPassword);

export const H = new GraphQLClient(HASURA_ENDPOINT, {
  headers: {
    "X-Hasura-Access-Key": HASURA_ACCESS_KEY
  }
});
