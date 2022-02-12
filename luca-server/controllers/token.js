require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data.dataValues, process.env.ACCESS_SECRET, {
      expiresIn: "15d",
    });
  },
  sendAccessToken: (res, accessToken, statusCode, data) => {
    return res
      .cookie("jwt", accessToken, {
        domain: "localhost",
        path: "/",
        maxAge: 24 * 6 * 60 * 10000,
        sameSite: "None",
        httpOnly: true,
        secure: true,
      })
      .status(statusCode)
      .json(data);
  },
  isAuthorized: (req) => {
    const userInfo = verify(req.cookies.jwt, process.env.ACCESS_SECRET);
    return userInfo;
  },
};