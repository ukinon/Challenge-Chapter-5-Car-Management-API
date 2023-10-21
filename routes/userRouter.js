const router = require("express").Router();

const user = require("../controller/userController");
const authenticate = require("../middlewares/authenticate");
const checkOwner = require("../middlewares/checkAccountOwner");
const checkId = require("../middlewares/checkId");
const checkRole = require("../middlewares/checkRole");
const { User } = require("../models");

router.get("/", user.findUsers);
router.get("/:id", checkId(User), user.findUserById);
router.patch(
  "/member/:id",
  checkId(User),
  authenticate,
  checkOwner(["superadmin", "admin"]),
  user.updateUser
);
router.patch(
  "/admin/:id",
  checkId(User),
  authenticate,
  checkRole("superadmin"),
  checkOwner(["superadmin"]),
  user.updateUser
);
router.delete(
  "/admin/:id",
  checkId(User),
  authenticate,
  checkOwner(["superadmin"]),
  user.deleteUser
);
router.delete(
  "/member/:id",
  checkId(User),
  authenticate,
  checkOwner(["superadmin", "admin"]),
  user.deleteUser
);

module.exports = router;
