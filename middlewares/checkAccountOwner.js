const ApiError = require("../utils/apiError");

const checkOwner = (role) => {
  return async (req, res, next) => {
    try {
      if (req.user.id == req.params.id || role.includes(req.user.type)) {
        next();
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
};

module.exports = checkOwner;
