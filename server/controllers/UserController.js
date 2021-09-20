const { User } = require("../models/");

const { decrypter } = require("../helpers/bcrypt");
const { tokenGenerator } = require("../helpers/jwt");

class UserController {
  static async show(req, res) {
    try {
      let users = await User.findAll({
        order: [["id", "ASC"]],
      });

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getById(req, res) {
    try {
      const id = req.UserData.id;
      let user = await User.findByPk(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "User not found!",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async register(req, res) {
    try {
      const { name, email, password, birthdate, gender, type } = req.body;

      let emailExist = await User.findOne({
        where: { email },
      });

      if (emailExist) {
        res.status(403).json({
          message: "Email already exist!",
        });
      } else {
        let user = await User.create({
          name,
          email,
          password,
          birthdate,
          gender,
          type,
        });
        res.status(201).json({ user });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({
        where: { email },
      });
      if (user) {
        if (decrypter(password, user.password)) {
          let access_token = tokenGenerator(user);
          res.status(200).json({
            access_token,
          });
        } else {
          res.status(403).json({
            message: "Invalid Password",
          });
        }
      } else {
        res.status(404).json({
          message: " Not Found ! ",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({
        where: { email, type: "user" },
      });
      if (user) {
        if (decrypter(password, user.password)) {
          let access_token = tokenGenerator(user);
          res.status(200).json({
            access_token,
          });
        } else {
          res.status(403).json({
            message: "Invalid Password",
          });
        }
      } else {
        res.status(404).json({
          message: " Not Found ! ",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({
        where: { email, type: "admin" },
      });
      if (user) {
        if (decrypter(password, user.password)) {
          let access_token = tokenGenerator(user);
          res.status(200).json({
            access_token,
          });
        } else {
          res.status(403).json({
            message: "Invalid Password",
          });
        }
      } else {
        res.status(404).json({
          message: " Not Found ! ",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async update(req, res) {
    try {
      const id = req.UserData.id;
      const { name, birthdate, gender } = req.body;
      let users = await User.update(
        {
          name,
          birthdate,
          gender,
        },
        {
          where: { id },
        }
      );

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let result = await User.destroy({
        where: { id },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async uploadAvatar(req, res) {
    try {
      const avatar = req.file.filename;
      const id = req.UserData.id;

      let result = await User.update(
        {
          avatar: avatar,
        },
        {
          where: { id: id },
        }
      );

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;
