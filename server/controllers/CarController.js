const {
  User,
  Car,
  CarComment,
  CarsImage,
  Cart,
  Order,
  Line_Item,
} = require("../models");

class CarController {
  static async show(req, res) {
    try {
      let car = await Car.findAll({
          order: [["id", "ASC"]],
          include: {
            model: CarsImage,
            where: {primary: true}
          }});

      res.status(200).json(car);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getById(req, res) {
    try {
      const id = +req.params.id;
      let car = await Car.findByPk(id,{ 
        include: CarsImage,
        order: [[CarsImage, "id", "ASC"]]
      });

      res.status(200).json(car);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getUserCar(req, res) {
    try {
      const UserId = +req.params.id;
      let car = await Car.findAll({ 
        include: [User, CarsImage],
        order: [[CarsImage, "id", "ASC"]]
      },{
        where: {UserId}
      });

      res.status(200).json(car);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async add(req, res) {
    try {
      const UserId = +req.UserData.id;
      const { nama, harga_sewa, penumpang, bagasi, pintu, ac, type, description } =
        req.body;

      let car = await Car.create({
        nama,
        harga_sewa,
        penumpang,
        bagasi,
        pintu,
        ac,
        type,
        description,
        UserId,
      });
      
      for (let i = 0; i < 4; i++) {
        let primary = false;
        if (i === 0) {
          primary = true;
        }
        await CarsImage.create({
          filename: "defaultCar.png",
          filesize: "3050",
          filetype: "image/png",
          primary: primary,
          CarId: car.id,
        });
      }

      res.status(201).json(car.id);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id;
      const {
        nama,
        harga_sewa,
        penumpang,
        bagasi,
        pintu,
        ac,
        type,
        description,
        IMAGE0,
        IMAGE1,
        IMAGE2,
        IMAGE3,
      } = req.body;
  
      const IMAGES = [];
      IMAGES.push(IMAGE0 === "true" ? true : false);
      IMAGES.push(IMAGE1 === "true" ? true : false);
      IMAGES.push(IMAGE2 === "true" ? true : false);
      IMAGES.push(IMAGE3 === "true" ? true : false);

      await Car.update(
        {
          nama,
          harga_sewa,
          penumpang,
          bagasi,
          pintu,
          ac,
          type,
          description,
        },
        { where: { id } }
      );

      const carsImages = await CarsImage.findAll({
        where: { CarId: id },
        order: [["id", "ASC"]],
      });

      const files = req.files;
      let count = 0;

      const tempCar = [];

      IMAGES.forEach(async (IMAGE, index) => {
        if (IMAGE) {
          const filename = files[count].filename;
          const filesize = files[count].size;
          const filetype = files[count].mimetype;
          const CarId = carsImages[index].id;

          tempCar.push({
            filename,
            filesize,
            filetype,
            CarId,
          });
          count++;
        }
      });

      tempCar.forEach(async (obj) => {
        await CarsImage.update(
          { filename: obj.filename,
            filesize: obj.filesize,
            filetype: obj.filetype
          },
          { where: { id: obj.CarId } }
        );
      });
      res.status(200).json({
        status: 200,
        tempCar,
        message: "Product updated successfully!",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let result = await Car.destroy({
        where: { id },
      });

      await CarsImage.destroy({
        where: { CarId: id },
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = CarController;
