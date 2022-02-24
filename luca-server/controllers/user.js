const { users } = require("../models");
const { generateAccessToken, sendAccessToken } = require("./token");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const path = require("path");
const ejs = require("ejs");
const appDir = path.dirname(require.main.filename);

module.exports = {
  guest: async (req, res) => {
    try {
      const { count } = await users.findAndCountAll({
        where: {
          email: {
            [Op.like]: "Guest%",
          },
        },
      });
      await users.create({
        name: `Guest${count + 1}`,
        email: `Guest${count + 1}@guest.com`,
        password: bcrypt.hashSync("password", 10),
        isGuest: true,
      });
      const userInfo = await users.findOne({
        where: { email: `Guest${count + 1}@guest.com` },
      });

      const accessToken = generateAccessToken(userInfo);
      sendAccessToken(res, accessToken, 200, {
        data: { isGuest: true },
        message: "Login success",
      });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  logout: (req, res) => {
    const accessToken = req.cookies.jwt;

    try {
      if (!accessToken) {
        return res.status(401).send({ message: "Not authorized" });
      } else {
        // 쿠키 삭제를 통해 로그아웃을 구현한다.
        res.clearCookie("jwt", {
          // domain: process.env.SERVER_DOMAIN,
          path: '/',
          maxAge: 24 * 6 * 60 * 10000,
          httpOnly: true,
          sameSite: 'none',
          secure: false,
        });
        return res.status(200).send({ message: "Signout succeed" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  signup: (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(422)
        .json({ message: "Insufficient parameters supplied" });
    }
    users
      .findOrCreate({
        where: {
          name: name,
          email: email,
          password: bcrypt.hashSync(password, 10),
          isGuest: false,
        },
      })
      .then(([userInfo, created]) => {
        if (created) {
          // 회원가입에 성공하면 토큰이 발행되므로 별로의 로그인 과정이 생략된다.
          const accessToken = generateAccessToken(userInfo);
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
  },

  checkAndMail: async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res
        .status(422)
        .json({ message: "Insufficient parameters supplied" });
    }
    try {
      const userInfo = await users.findOne({
        where: {
          email,
        },
      });
      // 사용할 수 있는 email
      if (!userInfo) {
        let authNum = Math.random().toString().substr(2, 6);
        let emailTemplete;
        ejs.renderFile(
          appDir + "/template/authMail.ejs",
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

        const mailOptions = await transporter.sendMail({
          from: `Luca`,
          to: req.body.email,
          subject: "[Luca]인증 확인 이메일입니다",
          html: emailTemplete,
        });
        // return res.send(mailOptions)
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
      // 사용할 수 없는 email
      res.status(200).json({ data: null, message: "Check fail" });
    } catch {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      // !email || !password 는 클라이언트에서 state 로 필터하고 있습니다.
      return res
        .status(422)
        .json({ message: "Insufficient parameters supplied" });
    } else {
      try {
        const userInfo = await users.findOne({
          where: {
            email: email,
          },
        });
        // 로그인 실패
        if (!userInfo) {
          return res.status(400).json({ message: "Wrong email" });
        } else {
          let passwordCheck = await bcrypt.compare(password, userInfo.password);
          // 로그인이 성공하면 토큰이 생성되고 쿠키로 전송된다.
          delete userInfo.dataValues.password;
          if (passwordCheck) {
            const accessToken = generateAccessToken(userInfo);
            sendAccessToken(res, accessToken, 200, { data: userInfo, message: "Login success" });
          } else {
            return res.status(400).json({ message: "Wrong password" });
          }
        }
      } catch (err) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },
};
