const router = require("express").Router();

const { Product } = require("../models");

const car = require("../controller/carController");

const upload = require("../middlewares/uploader");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkOwnership");
const checkId = require("../middlewares/checkId");

router.post("/", autentikasi, upload.single("image"), car.createCar);
router.get("/", autentikasi, checkRole("Owner"), car.findCars);
router.get("/:id", checkId(Product), car.findCarById);
router.patch(
  "/:id",
  checkId(Product),
  autentikasi,
  checkRole("Owner"),
  car.updateCar
);
router.delete(
  "/:id",
  checkId(Product),
  autentikasi,
  checkRole("Owner"),
  car.deleteCar
);

module.exports = router;
