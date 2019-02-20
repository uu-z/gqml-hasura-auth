import { gql } from "gqml";
import { H } from "./";
import { UserBoolExp, UserInsertInput } from "./generated/type";
import { jsonToGraphQLQuery } from "json-to-graphql-query";

interface UserFindInput {
  where: UserBoolExp;
}

export const user = (data: UserFindInput) =>
  H.request(
    jsonToGraphQLQuery({
      query: {
        user: {
          __args: data,
          id: true,
          password: true
        }
      }
    })
  ).then((data: any) => data.user[0]);

interface UserCreateInput {
  objects: UserInsertInput[];
}

export const insertUser = (data: UserCreateInput) =>
  H.request(
    jsonToGraphQLQuery({
      mutation: {
        insert_user: {
          __args: data,
          returning: {
            id: true
          }
        }
      }
    })
  ).then((data: any) => data.insert_user.returning[0]);
