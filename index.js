// karena menggunakan .env variable, jd lakuin import ini di awal aplikasi jalan
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const ApiError = require("./utils/apiError");
const errorHandler = require("./controller/errorController");
const router = require("./routes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use(cors());

app.use(morgan("dev"));
app.use(router);

app.all("*", (req, res, next) => {
  next(new ApiError(`Routes does not exist`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
