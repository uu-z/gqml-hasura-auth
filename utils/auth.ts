import { sign, verify } from "jsonwebtoken";

interface TokenData {
  userId: string;
}

const { APP_SECRET = "appsecret1234" } = process.env;

export const signToken = (user: any): string =>
  sign(
    {
      userId: user.id,
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": user.id
      }
    },
    APP_SECRET
  );
export const verifyToken = (token: string): TokenData => verify(token, APP_SECRET);

export function getTokenData(ctx: any): TokenData {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const tokenData = verifyToken(token);
    return tokenData;
  } else {
    throw new Error("Authorization token required");
  }
}
