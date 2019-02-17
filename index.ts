require("dotenv").config();
import "./modules";
import { gqml } from "gqml";
const { PORT = 3000 } = process.env;

gqml.yoga({
  // typeDefs: __dirname + "/schema.graphql",
  options: {
    context: ctx => ctx
  },
  listen: {
    port: PORT
  }
});
