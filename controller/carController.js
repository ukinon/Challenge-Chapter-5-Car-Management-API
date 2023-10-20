const { Car } = require("../models");
const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const createCar = async (req, res, next) => {
  try {
    const { name, price, type, category, available } = req.body;
    // validasi untuk check apakah nama produk nya udah ada
    const car = await Car.findOne({
      where: {
        name,
      },
    });
    if (car) {
      return next(new ApiError("Car name has already been taken", 400));
    }
    const file = req.file;
    let img;
    if (file) {
      // dapatkan extension file nya
      const split = file.originalname.split(".");
      const extension = split[split.length - 1];

      // upload file ke imagekit
      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      img = uploadedImage.url;
    }

    const newCar = await Car.create({
      name,
      price,
      type,
      category,
      available,
      createdBy: req.user.id,
      updatedBy: req.user.id,
      imageUrl: img,
    });

    res.status(200).json({
      status: "Success",
      data: {
        newCar,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findCars = async (req, res, next) => {
  try {
    const { name, available, category } = req.query;
    const condition = {};

    if (name) {
      condition.name = { [Op.like]: "%" + name + "%" };
    }
    if (available) {
      condition.available = available;
    }
    if (category) {
      condition.category = category;
    }

    const cars = await Car.findAll({
      where: condition,
      include: ["creator", "updater", "deleter"],
    });

    res.status(200).json({
      status: "Success",
      data: {
        cars,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findCarById = async (req, res, next) => {
  try {
    const car = await Car.findOne({
      where: {
        id: req.params.id,
      },
      include: ["User"],
    });

    if (car === null) {
      res.status(400).json({
        status: "failed",
        message: "Car doesn't exist",
      });
    }

    res.status(200).json({
      status: "Success",
      data: {
        Car,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateCar = async (req, res, next) => {
  try {
    const { name, price, type, category, available } = req.body;
    console.log(name);
    const car = await Car.findOne({
      where: {
        name,
      },
    });

    if (car) {
      return next(new ApiError("Car name has already been taken", 400));
    }

    const file = req.file;
    let img;
    if (file) {
      // dapatkan extension file nya
      const split = file.originalname.split(".");
      const extension = split[split.length - 1];

      // upload file ke imagekit
      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      img = uploadedImage.url;
    }

    await Car.update(
      {
        name,
        price,
        type,
        category,
        available,
        updatedBy: req.user.id,
        imageUrl: img,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteCar = async (req, res, next) => {
  const { name, price, stock } = req.body;
  try {
    const car = await Car.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!car) {
      next(new ApiError("Car id tersebut gak ada", 404));
    }

    await Car.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete produk",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createCar,
  findCars,
  findCarById,
  updateCar,
  deleteCar,
};
