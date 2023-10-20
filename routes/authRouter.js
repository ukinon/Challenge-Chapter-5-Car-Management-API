const router = require("express").Router();

const Auth = require("../controller/authController");

const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.post("/admin/login", Auth.adminLogin);
router.post(
  "/admin/register",
  autentikasi,
  checkRole("superadmin"),
  Auth.adminReg
);

router.post("/member/login", Auth.memberLogin);
router.post("/member/register", autentikasi, Auth.memberRegister);

router.post("/superadmin/login", Auth.superadminLogin);
router.get("/", autentikasi, Auth.checkToken);

module.exports = router;
