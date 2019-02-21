import { H } from "./";
import { InsertUserMutationRootArgs, UserQueryRootArgs, User, UserMutationResponse } from "./generated/type";
import { jsonToGraphQLQuery } from "json-to-graphql-query";

export const user = (data: UserQueryRootArgs): Promise<User[]> =>
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
  ).then((data: any) => data.user);

export const insertUser = (data: InsertUserMutationRootArgs): Promise<User[]> =>
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
  ).then((data: any) => data.insert_user.returning);
