const { fn, col, where, literal } = require("sequelize");
const { User, Car, CarsComment, Order } = require("../models");

class CarCommentController {
  static async showByCar(req, res) {
    try {
      const CarId = req.params.CarId;

      let car = await CarsComment.findAll({
        include: [User],
        order: [["id", "ASC"]],
        where: { CarId },
      });

      res.status(200).json(car);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async add(req, res) {
    try {
      const CarId = req.params.CarId;
      const UserId = +req.UserData.id;
      const salt = req.UserData.salt;

      const { comments, rating } = req.body;

      //ambil nama mobil
      let carName = await Car.findByPk(CarId);
      let order_name = `INV-${salt}-${carName.nama}`;

      //cek apakah mobilnya udah pernah di order sampai rent
      let checkAllowed = await Order.findOne({
        where: {
          UserId,
          order_name,
          status: "closed",
        },
      });

      // jika sudah pernah di rent
      if (checkAllowed) {
        let checkComment = await CarsComment.findOne({
          where: { UserId, CarId },
        });

        // jika belum pernah di review, bisa komen
        if (!checkComment) {
          const comment = await CarsComment.create({
            comments,
            rating,
            CarId,
            UserId,
          });

          res.status(201).json(comment);
        } else {
          res.status(402).json({
            message: "Anda sudah pernah mereview mobil ini",
          });
        }
      } else {
        res.status(403).json({
          message:
            "Anda hanya bisa melakukan review jika sudah pernah merental mobil ini",
        });
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async totalRating(req, res) {
    try {
      const CarId = +req.params.CarId;

      let carComments = await CarsComment.findAll({
        attributes: ["CarId", [fn("sum", col("rating")), "total"]],
        group: ["CarsComment.CarId"],
        where: { CarId },
        raw: true,
        order: literal("total DESC"),
      });
      res.status(200).json(carComments);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

module.exports = CarCommentController;
