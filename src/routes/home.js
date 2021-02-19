module.exports = (app) => {
  app.get("/", (req, res) => {
    let success,
      warning = app.helpers.msg(req);

    let productsIdInCart = req.cookies["productsid-in-cart"];
    if (productsIdInCart == undefined) productsIdInCart = [];

    const connection = app.services.connectionFactory();
    const productsService = new app.services.productsService(connection);
    productsService
      .list()
      .then((products) =>
        res.status(200).render("shop/index", {
          title: "Shopping Cart",
          products,
          numOfitemsInCart: productsIdInCart.length,
          success,
          warning,
          login: req.session["user"],
        })
      )
      .catch((err) => res.status(400).send(err));
  });
};
