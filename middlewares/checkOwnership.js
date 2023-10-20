const { Shop } = require("../models");
const ApiError = require("../utils/apiError");

const checkShopOwner = async (req, res, next) => {
  try {
    const shop = await Shop.findByPk(req.params.id);
    if (req.params.id !== req.user.shopId) {
      return next(new ApiError(`you're not ${shop.name}'s owner`, 401));
    }
    next();
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

const checkShopOwnerByRequest = async (req, res, next) => {
  try {
    const { shopId } = req.body;

    const shop = await Shop.findByPk(req.params.id);
    if (shopId !== req.user.shopId) {
      next(new ApiError(`you're not ${shop.name}'s owner`, 401));
    }
    next();
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = { checkShopOwner, checkShopOwnerByRequest };
