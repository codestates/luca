import { Request, Response } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

interface userInfo {
  id: number;
  name: string;
  email: string;
  password: string;
  isGuest: boolean;
  isSocial: string | null;
}

export const generateAccessToken = (userInfo: userInfo) => {
  delete userInfo.password;
  
  return sign(userInfo, process.env.ACCESS_SECRET, {
    expiresIn: "1d",
  });
}

export const sendAccessToken = (res: Response, accessToken: string, statusCode: number, data: object) => {
  return res
    .cookie("jwt", accessToken, {
      path: "/",
      maxAge: 24 * 6 * 60 * 10000,
      httpOnly: true,
      // sameSite: "none",
      // secure: true,
    })
    .status(statusCode)
    .json(data);
}

export const isAuthorized= (req: Request) => {
  if ("jwt" in req.cookies) {
    try {
      const userInfo: JwtPayload = verify(req.cookies.jwt, process.env.ACCESS_SECRET) as JwtPayload;
      delete userInfo.iat;
      delete userInfo.exp;
      return userInfo;
    } catch (err) {
      return "expired";
    }
  } else {
    return "not found";
  }
}
