## Gqml-Hasura-auth

Simple Auth Server For Hasura

**Schema Definition**

```PLpgSQL
CREATE TABLE public."user" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
```

**development**

```bash
$ yarn start
```

**deploy**

```bash
$ now
```
