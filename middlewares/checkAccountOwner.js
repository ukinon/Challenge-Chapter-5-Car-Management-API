const ApiError = require("../utils/apiError");

const checkOwner = async (req, res, next) => {
  try {
    if (req.user.id == req.params.id || req.user.type == "superadmin") {
      return next();
    } else {
      return next(
        new ApiError(
          `cannot access because you're not this account's owner`,
          401
        )
      );
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = checkOwner;
