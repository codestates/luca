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
        // domain: process.env.SERVER_DOMAIN,
        path: '/',
        maxAge: 24 * 6 * 60 * 10000,
        httpOnly: true,
        sameSite: 'none',
        secure: false,
      })
      .status(statusCode)
      .json(data);
  },
  isAuthorized: (req) => {
    if ("jwt" in req.cookies) {
      try {
        const userInfo = verify(req.cookies.jwt, process.env.ACCESS_SECRET);
        delete userInfo.iat;
        delete userInfo.exp;
        return userInfo;
      } catch (err) {
        return "expired";
      }
    } else {
      return "not found";
    }
  },
};
