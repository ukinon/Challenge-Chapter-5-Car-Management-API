const router = require("express").Router();

const { Car } = require("../models");

const car = require("../controller/carController");

const upload = require("../middlewares/uploader");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkId = require("../middlewares/checkId");
const { or } = require("sequelize");

router.post(
  "/",
  autentikasi,
  checkRole("admin", "superadmin"),
  upload.single("image"),
  car.createCar
);
router.get("/", autentikasi, checkRole("admin", "superadmin"), car.findCars);
router.get(
  "/:id",
  checkId(Car),
  autentikasi,
  checkRole("admin", "superadmin"),
  car.findCarById
);
router.patch(
  "/:id",
  checkId(Car),
  autentikasi,
  checkRole("admin", "superadmin"),
  upload.single("image"),
  car.updateCar
);
router.delete(
  "/:id",
  checkId(Car),
  autentikasi,
  checkRole("admin", "superadmin"),
  car.deleteCar
);

module.exports = router;
