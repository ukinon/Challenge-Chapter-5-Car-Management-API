const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Auth, User } = require("../models");
const ApiError = require("../utils/apiError");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({
      where: {
        email,
      },
      include: ["User"],
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      //   token utk autentikasi
      const token = jwt.sign(
        {
          id: user.userId,
          username: user.User.name,
          type: user.User.type,
          email: user.email,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        status: "Success",
        message: "Berhasil login",
        jwt: token,
      });
    } else {
      return next(new ApiError("wrong password atau user gak ada", 400));
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, age, address } = req.body;
    let newUser;

    // validasi untuk check apakah email nya udah ada
    const user = await Auth.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return next(new ApiError("User email already taken", 400));
    }

    // minimum password length
    const passwordLength = password <= 8;
    if (passwordLength) {
      return next(new ApiError("Minimum password must be 8 character", 400));
    }

    // minimum password length
    if (password !== confirmPassword) {
      return next(new ApiError("password does not match", 400));
    }

    // hashing password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const hashedConfirmPassword = bcrypt.hashSync(confirmPassword, saltRounds);

    if (req.user) {
      if (req.user.type == "superadmin") {
        newUser = await User.create({
          name,
          address,
          age,
          type: "admin",
        });
      }
    } else {
      newUser = await User.create({
        name,
        address,
        age,
      });
    }
    await Auth.create({
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      userId: newUser.id,
    });

    res.status(201).json({
      status: "Success",
      data: {
        ...newUser,
        email,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const checkToken = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = {
  register,
  login,
  checkToken,
};
