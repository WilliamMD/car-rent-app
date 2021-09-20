const { literal, Op } = require("sequelize");
const { User, Car, CarsImage, Cart, Order, LineItem } = require("../models");

class LineItemController {
  static async createCart(req, res) {
    try {
      const CarId = req.params.CarId;
      const UserId = req.UserData.id;
      const salt = req.UserData.salt;
      const { nama, days, city, address, harga_sewa } = req.body;

      const convertOrderName = `INV-${salt}-${nama}`;

      // ambil id cart yang sudah ada di cart
      let getCartIds = await LineItem.findAll({
        where: {
          [Op.or]: [
            {
              CarId,
              status: "cart",
            },
            {
              CarId,
              status: "checkout",
            },
          ],
        },
      });

      // cek apakah user di cartnya sama dengan
      // user yang mau pesan dan status masih open
      let checkLineItemExist = false;

      if (getCartIds) {
        for (let i = 0; i < getCartIds.length; i++) {
          let orderCheck = await Cart.findOne({
            where: { id: getCartIds[i].CartId, UserId, status: "open" },
          });
          if (orderCheck) {
            checkLineItemExist = true;
          }
        }
      }
      // cek apakah terdapat pesanan yang sama
      if (checkLineItemExist) {
        let order = await Order.update(
          {
            total_days: literal(`total_days + ${days}`),
          },
          {
            where: { UserId, order_name: convertOrderName },
          }
        );

        let item = await LineItem.update(
          {
            days: literal(`days + ${days}`),
          },
          {
            where: { order_name: convertOrderName },
          }
        );

        res.status(201).json({ order, item });
      } else {
        let order = await Order.create({
          order_name: convertOrderName,
          total_due: harga_sewa,
          total_days: days,
          city,
          address,
          UserId,
        });

        let cart = await Cart.create({ UserId });
        let item = await LineItem.create({
          days,
          CarId,
          CartId: cart.id,
          order_name: convertOrderName,
        });
        res.status(201).json({ order, cart, item });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteCart(req, res) {
    try {
      const CartId = req.params.CartId;
      const LineItemId = req.params.LineItemId;
      const UserId = req.UserData.id;
      const salt = req.UserData.salt;
      const { nama } = req.body;

      const convertOrderName = `INV-${salt}-${nama}`;

      await Order.destroy({
        where: { order_name: convertOrderName, UserId },
      });
      await LineItem.destroy({
        where: { id: LineItemId },
      });

      await Cart.destroy({
        where: { id: CartId },
      });

      res.status(200).json(convertOrderName);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async addCheckout(req, res) {
    try {
      const salt = req.UserData.salt;
      const { nama } = req.body;

      const convertOrderName = `INV-${salt}-${nama}`;

      let item = await LineItem.update(
        {
          status: "checkout",
        },
        {
          where: {
            order_name: convertOrderName,
          },
        }
      );

      res.status(200).json({ item });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async checkoutAll(req, res) {
    try {
      const salt = req.UserData.salt;
      const { carts } = req.body;

      let tempOrderName = [];
      carts.forEach((cart) => {
        let convertOrderName = `INV-${salt}-${cart.LineItems[0].Car.nama}`;
        tempOrderName.push(convertOrderName);
      });

      // let item = await LineItem.update(
      //   {
      //     status: "checkout",
      //   },
      //   {
      //     where: {
      //       order_name: convertOrderName,
      //     },
      //   }
      // );

      res.status(200).json(tempOrderName);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async pay(req, res) {
    try {
      const salt = req.UserData.salt;
      const { nama } = req.body;
      const CartId = req.params.CartId;

      const convertOrderName = `INV-${salt}-${nama}`;

      let item = await LineItem.update(
        {
          status: "ordered",
        },
        {
          where: {
            order_name: convertOrderName,
          },
        }
      );

      let cart = await Cart.update(
        {
          status: "closed",
        },
        {
          where: {
            id: CartId,
          },
        }
      );

      let order = await Order.update(
        {
          status: "open",
        },
        {
          where: {
            order_name: convertOrderName,
          },
        }
      );

      res.status(200).json({ item, cart, order });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async changeStatus(req, res) {
    try {
      const { order_name, status } = req.body;

      let order = await Order.update(
        {
          status: status,
        },
        {
          where: { order_name: order_name },
        }
      );

      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async getCheckout(req, res) {
    try {
      const UserId = +req.UserData.id;

      let carts = await Cart.findAll({
        where: { UserId, status: "open" },
        order: [["id", "ASC"]],
        include: [
          {
            model: LineItem,
            include: [
              {
                model: Car,
                include: [
                  {
                    model: CarsImage,
                    where: { primary: true },
                  },
                ],
              },
              {
                model: Order,
              },
            ],
            where: { status: "checkout" },
          },
        ],
      });

      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async getCart(req, res) {
    try {
      const UserId = +req.UserData.id;

      let carts = await Cart.findAll({
        where: { UserId, status: "open" },
        order: [["id", "ASC"]],
        include: [
          {
            model: LineItem,
            include: [
              {
                model: Car,
                include: [
                  {
                    model: CarsImage,
                    where: { primary: true },
                  },
                ],
              },
              {
                model: Order,
              },
            ],
            where: { status: "cart" },
          },
        ],
      });

      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async getOrder(req, res) {
    try {
      const UserId = +req.UserData.id;
      let orders = await Order.findAll({
        where: {
          UserId,
          status: {
            [Op.not]: null,
          },
        },
        order: [["created_on", "ASC"]],
        include: [
          {
            model: LineItem,
            include: [
              {
                model: Car,
                include: [
                  {
                    model: CarsImage,
                    where: { primary: true },
                  },
                ],
              },
            ],
          },
        ],
      });

      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async getOrderAdmin(req, res) {
    try {
      const UserId = +req.UserData.id;

      const carList = await Car.findAll({
        where: { UserId },
      });

      let tempOrder = [];

      for (let i = 0; i < carList.length; i++) {
        let orders = await Order.findAll({
          where: {
            [Op.or]: [
              {
                status: {
                  [Op.iLike]: "open",
                },
              },
              {
                status: {
                  [Op.iLike]: "paid",
                },
              },
              {
                status: {
                  [Op.iLike]: "rent",
                },
              },
            ],
          },
          order: [["created_on", "ASC"]],
          include: [
            {
              model: LineItem,
              where: {
                CarId: carList[i].id,
              },
              include: [
                {
                  model: Car,
                },
              ],
            },
            {
              model: User,
            },
          ],
        });
        tempOrder.push(orders);
      }

      const flatOrder = tempOrder.flat();

      res.status(200).json(flatOrder);
      // res.status(200).json(carList);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async getOrderAdminDone(req, res) {
    try {
      const UserId = +req.UserData.id;

      const carList = await Car.findAll({
        where: { UserId },
      });

      let tempOrder = [];

      for (let i = 0; i < carList.length; i++) {
        let orders = await Order.findAll({
          where: {
            [Op.or]: [
              {
                status: {
                  [Op.iLike]: "closed",
                },
              },
            ],
          },
          order: [["created_on", "ASC"]],
          include: [
            {
              model: LineItem,
              where: {
                CarId: carList[i].id,
              },
              include: [
                {
                  model: Car,
                },
              ],
            },
            {
              model: User,
            },
          ],
        });
        tempOrder.push(orders);
      }

      const flatOrder = tempOrder.flat();

      res.status(200).json(flatOrder);
      // res.status(200).json(carList);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

module.exports = LineItemController;
