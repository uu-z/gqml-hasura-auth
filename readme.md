## Gqml-Hasura-auth

Simple Auth Server For Hasura

github oauth: https://github-test.now.sh/

hasura console: https://awsll.herokuapp.com/console/

gqml auth server: https://gqml-hasura-auth.now.sh

**Schema Definition**

```PLpgSQL
CREATE TABLE public."user" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    email text NOT NULL,
    name text,
    password text,
    avatar text,
    githubUserId text,
    role text
);

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
```

**development**

```bash
$ yarn install
$ yarn gen
$ yarn start
```

**deploy**

```bash
$ npm install now -g
$ now
```
