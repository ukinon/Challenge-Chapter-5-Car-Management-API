const router = require("express").Router();

const Auth = require("../controller/authController");

const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.post("/admin/login", Auth.login);
router.post(
  "/admin/register",
  autentikasi,
  checkRole("superadmin"),
  Auth.register
);

router.post("/member/login", Auth.login);
router.post("/member/register", Auth.register);

router.post("/superadmin/login", Auth.login);
router.get("/", autentikasi, Auth.checkToken);

module.exports = router;
