class ProductModel {
  constructor(connection) {
    this.connection = connection;
  }

  list(limit) {
    return new Promise((res, rej) => {
      if (!limit) {
        this.connection.query("select * from products", (err, result) => {
          if (err) return rej(err);
          return res(result);
        });
      }
      this.connection.query(
        "select * from products limit ?",
        limit,
        (err, result) => {
          if (err) return rej(err);
          return res(result);
        }
      );
    });
  }

  getByIds(ids) {
    return new Promise((res, rej) => {
      this.connection.query(
        `SELECT * FROM products WHERE id in (?)`,
        ids,
        (err, result) => {
          if (err) return rej(err);
          return res(result);
        }
      );
    });
  }
}

module.exports = () => ProductModel;
