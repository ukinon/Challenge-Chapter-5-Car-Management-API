const ApiError = require("../utils/apiError");

const checkRole = (types) => {
  return async (req, res, next) => {
    try {
      if (types.include(req.user.type)) {
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
