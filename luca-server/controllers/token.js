require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    console.log("=====> data for token: ", data);
    return sign(data, process.env.ACCESS_SECRET, {
      expiresIn: "15d",
    });
  },
  sendAccessToken: (res, accessToken, statusCode, data) => {
    return res
      .header("Set-Cookie")
      .cookie("jwt", accessToken, {
        domain: "localhost",
        path: "/",
        maxAge: 24 * 6 * 60 * 10000,
        sameSite: "None",
        httpOnly: true,
        // secure: true,
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
