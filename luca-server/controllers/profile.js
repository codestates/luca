const { users, cards, projects, users_projects } = require("../models");
const { isAuthorized } = require("./token");
const bcrypt = require("bcrypt");

module.exports = {
  get: async (req, res) => {
    try {
      const verifyInfo = isAuthorized(req);
      if (verifyInfo === "not found") {
        return res.status(401).send({ message: "Not authorized" });
      } else if (verifyInfo === "expired") {
        return res.status(401).send({ message: "Expired token" });
      } else {
        const userInfo = await users.findOne({
          where: {
            email: verifyInfo.email,
          },
        });
        delete userInfo.dataValues.password;
        const countAdminProject = await projects.findAndCountAll({
          where: {
            admin: userInfo.dataValues.id,
          },
          raw: true,
        });
        const countJoinProject = await users_projects.findAndCountAll({
          where: {
            userId: userInfo.dataValues.id,
          },
          raw: true,
        });
        userInfo.dataValues.countAdminProject = countAdminProject.count;
        userInfo.dataValues.countJoinProject = countJoinProject.count;
        res
          .status(200)
          .json({ data: userInfo.dataValues, message: "Get profile success" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  delete: async (req, res) => {
    try {
      const verifyInfo = isAuthorized(req);
      if (verifyInfo === "not found") {
        return res.status(401).send({ message: "Not authorized" });
      } else if (verifyInfo === "expired") {
        return res.status(401).send({ message: "Expired token" });
      } else {
        const userInfo = await users.findOne({
          where: {
            email: verifyInfo.email,
          },
        });
        if (userInfo) {
          const result = await projects.findAll({
            where: { admin: userInfo.id },
          });
          await result.map((el) => {
            users_projects.destroy({
              where: { projectId: el.dataValues.id },
            });
            cards.destroy({
              where: { projectId: el.dataValues.id },
            });
            projects.destroy({
              where: { id: el.dataValues.id },
            });
          });
          await users.destroy({
            where: { id: userInfo.id },
          });

          res
            .clearCookie("jwt", {
              // domain: process.env.SERVER_DOMAIN,
              path: "/",
              maxAge: 24 * 6 * 60 * 10000,
              httpOnly: true,
              // sameSite: 'none',
              // secure: true,
            })
            .status(200)
            .json({ mssage: "Delete profile success" });
        }
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  patchName: async (req, res) => {
    const name = req.body.name;
    if (!name) {
      return res
        .status(422)
        .json({ message: "Insufficient parameters supplied" });
    }
    try {
      const verifyInfo = isAuthorized(req);
      if (verifyInfo === "not found") {
        return res.status(401).send({ message: "Not authorized" });
      } else if (verifyInfo === "expired") {
        return res.status(401).send({ message: "Expired token" });
      } else {
        await users.update(
          { name: name },
          {
            where: { id: verifyInfo.id },
          }
        );
        res.status(200).json({ message: "ok" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  patchPassword: async (req, res) => {
    const { curPassword, newPassword } = req.body;
    if (!curPassword || !newPassword) {
      return res
        .status(422)
        .json({ message: "Insufficient parameters supplied" });
    }
    try {
      const verifyInfo = isAuthorized(req);
      if (verifyInfo === "not found") {
        return res.status(401).send({ message: "Not authorized" });
      } else if (verifyInfo === "expired") {
        return res.status(401).send({ message: "Expired token" });
      } else {
        const userInfo = await users.findOne({
          where: { id: verifyInfo.id },
        });

        const check = await bcrypt.compare(
          curPassword,
          userInfo.dataValues.password
        );

        if (!check) {
          res.status(400).json({ message: "Wrong password" });
        } else {
          await users.update(
            { password: bcrypt.hashSync(newPassword, 10) },
            {
              where: { id: verifyInfo.id },
            }
          );
          res.status(200).json({ message: "Change password success" });
        }
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
