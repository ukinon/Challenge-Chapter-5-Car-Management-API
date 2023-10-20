const ApiError = require("../utils/apiError");

const checkRole = (role, role2) => {
  return async (req, res, next) => {
    try {
      if (req.user.type == role || req.user.type == role2) {
        next();
      } else {
        next(new ApiError(`cannot access because you're not an admin`, 401));
      }
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkRole;
