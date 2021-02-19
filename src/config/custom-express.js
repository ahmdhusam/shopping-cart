const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const consign = require("consign");
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const csrf = require("csurf");
const validator = require("express-validator");

class AppController {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cookieParser());
    this.server.use(
      session({
        secret: "secretsecret",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 36000 * 1000 * 60 },
      })
    );
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(bodyParser.json());
    this.server.use(csrf({ cookie: true }));

    this.server.use(validator());

    this.server.use(
      express.static(path.resolve(__dirname, "..", "..", "public"))
    );
    this.server.engine(
      "hbs",
      hbs({
        extname: "hbs",
        defaultLayout: "layout",
        layoutsDir: "src/views/layouts/",
      })
    );
    this.server.set("views", "views");
    this.server.set("view engine", "hbs");
  }

  routes() {
    this.server.set("views", "./views");

    consign({ cwd: "src" })
      .include("routes")
      .then("services")
      .then("helpers")
      .into(this.server);
  }

  listen(port, cb) {
    this.server.listen(port, cb);
  }
}

module.exports = new AppController();
