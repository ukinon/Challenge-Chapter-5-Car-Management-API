const router = require("express").Router();

const user = require("../controller/userController");
const authenticate = require("../middlewares/authenticate");
const checkId = require("../middlewares/checkId");
const checkRole = require("../middlewares/checkRole");
const { User } = require("../models");

router.get("/", user.findUsers);
router.get("/:id", checkId(User), user.findUserById);
router.patch(
  "/:id",
  checkId(User),
  authenticate,
  checkRole("superadmin"),
  user.updateUser
);
router.delete(
  "/:id",
  checkId(User),
  authenticate,
  checkRole("superadmin"),
  user.deleteUser
);

module.exports = router;
