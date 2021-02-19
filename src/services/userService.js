const bcrypt = require("bcrypt-nodejs");

class UserModel {
  constructor(connection) {
    this.connection = connection;
  }

  saveUser(email, password) {
    return new Promise((res, rej) => {
      this.connection.query(
        "SELECT email FROM `users` WHERE email = ?",
        email,
        (err, result) => {
          const emailNotExist = Object.entries(result).length === 0;

          if (emailNotExist) {
            const cryptedPassword = bcrypt.hashSync(password);
            this.connection.query(
              "INSERT INTO `users` (email, password) VALUES (?, ?)",
              [email, cryptedPassword],
              (insertErr, _insertResulte) => {
                if (insertErr) return rej(insertErr);
                return res("User was created");
              }
            );
          } else if (err) return rej(err);
          else return rej("Email Already Exist!");
        }
      );
    });
  }

  login(email, password) {
    return new Promise((res, rej) => {
      this.connection.query(
        "SELECT * FROM `users` WHERE email = ?",
        email,
        (err, result) => {
          if (Object.entries(result).length > 0) {
            const isPasswordCorrect = bcrypt.compareSync(
              password,
              result[0].password
            );
            if (isPasswordCorrect) return res("Welcome to Shopping Cart!");
            else return rej("Password is incorrect");
          } else if (err) return rej(err);
          else return rej("Email is not in system, please Sign Up.");
        }
      );
    });
  }
}

module.exports = () => UserModel;
