import { Request, Response } from "express";
import { Users } from "../models/users";
import { generateAccessToken, sendAccessToken } from "./token";
import { Op } from "sequelize";
import * as nodemailer from "nodemailer";
import * as bcrypt from "bcrypt";
import * as path from "path";
import * as ejs from "ejs";
import * as dotenv from "dotenv";
const appDir = path.dirname(require.main.filename);
dotenv.config();

export const guest = async (req :Request, res: Response) => {
  try {
    const { count } = await Users.findAndCountAll({
      where: {
        email: {
          [Op.like]: "Guest%",
        },
      },
    });
    await Users.create({
      name: `Guest${count + 1}`,
      email: `Guest${count + 1}@guest.com`,
      password: bcrypt.hashSync(process.env.BCRYPT_PASSWORD, parseInt(process.env.BCRYPT_SALT)),
      isGuest: true,
    });
    const userInfo = await Users.findOne({
      where: { email: `Guest${count + 1}@guest.com` },
    });

    const accessToken = generateAccessToken(userInfo.get({ plain: true}));    
    sendAccessToken(res, accessToken, 200, {
      data: { isGuest: true },
      message: "Login success",
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const logout = (req: Request, res: Response) => {
  const accessToken = req.cookies.jwt;

  try {
    if (!accessToken) {
      return res.status(401).send({ message: "Not authorized" });
    } else {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res.status(200).send({ message: "Signout succeed" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(422)
      .json({ message: "Insufficient parameters supplied" });
  }
  Users
    .findOrCreate({
      where: {
        name: name,
        email: email,
        password: bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT)),
        isGuest: false,
      },
    })
    .then(([userInfo, created]) => {
      if (created) {
        const accessToken = generateAccessToken(userInfo.get({ plain: true}));
        sendAccessToken(res, accessToken, 201, {
          data: userInfo,
          message: "Singup success",
        });
      } else {
        return res.status(409).send("User exists");
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
}

export const checkAndMail = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(422)
      .json({ message: "Insufficient parameters supplied" });
  }
  try {
    const userInfo = await Users.findOne({
      where: {
        email,
      },
    });
    if (!userInfo) {
      let authNum = Math.random().toString().substr(2, 6);
      let emailTemplete;
      ejs.renderFile(
        appDir + "template/authMail.ejs",
        { authCode: authNum },
        function (err, data) {
          if (err) {
            console.log(err);
          }
          emailTemplete = data;
        }
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
      });

      const mailOptions = ({
        from: `Luca`,
        to: req.body.email,
        subject: "[Luca]인증 확인 이메일입니다",
        html: emailTemplete,
      });
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        }
        res.json({ certCode: authNum });
        transporter.close();
      });
      return res
        .status(201)
        .json({ data: { code: authNum }, message: "Check success" });
    }
    res.status(200).json({ data: null, message: "Check fail" });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json({ message: "Insufficient parameters supplied" });
  } else {
    try {
      const userInfo = await Users.findOne({
        where: {
          email: email,
        },
      });
      if (!userInfo) {
        return res.status(400).json({ message: "Wrong email" });
      } else {
        let passwordCheck = await bcrypt.compare(password, userInfo.password);
        if (passwordCheck) {
          const accessToken = generateAccessToken(userInfo.get({ plain: true}));
          sendAccessToken(res, accessToken, 200, { data: userInfo, message: "Login success" });
        } else {
          return res.status(400).json({ message: "Wrong password" });
        }
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
