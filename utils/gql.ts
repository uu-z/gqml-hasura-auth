export const ME = `
  query me($id: uuid!) {
    user(where:{id: {_eq: $id}}) { id email }
  }
  `;

export const LOGIN = `
  query user($email: String) {
    user(where:{email: {_eq: $email}}) { id password }
  }
`;

export const SIGNUP = `
  mutation signup($email: String, $password: String) {
    insert_user(objects: [{ email: $email, password: $password }]) { returning { id } }
  }
`;
