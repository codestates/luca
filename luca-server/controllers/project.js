const { users, cards, projects, users_projects } = require("../models");
const Sequelize = require("sequelize");
const { isAuthorized } = require("./token");

module.exports = {
  get: async (req, res) => {
    try {
      const verifyInfo = isAuthorized(req);
      if (verifyInfo === "not found") {
        return res.status(401).send({ message: "Not authorized" });
      } else if (verifyInfo === "expired") {
        return res.status(401).send({ message: "Expired token" });
      } else {
        const result = await projects.findAll({
          include: [
            {
              model: users_projects,
              required: true,
              attributes: [],
            },
          ],
          order: [["id", "DESC"]],
          attributes: [
            "id",
            "title",
            "desc",
            "isTeam",
            "admin",
            "createdAt",
            "updatedAt",
            [Sequelize.col("users_projects.isAccept"), "isAccept"],
          ],
          where: {
            "$users_projects.userId$": verifyInfo.id,
          },
        });
        const idResult = await users_projects.findAll({
          where: { userId: verifyInfo.id },
          attributes: ["projectId"],
          raw: true,
          order: [["projectId", "DESC"]],
        });
        const projectIdArray = idResult.map((el) => {
          return el.projectId;
        });
        const result1 = await users_projects.findAll({
          where: { projectId: projectIdArray },
          group: ["projectId"],
          attributes: [
            "projectId",
            [Sequelize.fn("COUNT", "projectId"), "numUser"],
          ],
          order: [["projectId", "DESC"]],
          raw: true,
        });
        const result2 = await cards.findAll({
          where: { projectId: projectIdArray },
          group: ["projectId"],
          attributes: [[Sequelize.fn("COUNT", "projectId"), "numCard"]],
          order: [["projectId", "DESC"]],
          raw: true,
        });
        const result3 = await cards.findAll({
          where: { projectId: projectIdArray, storage: "mindmap" },
          group: ["projectId"],
          attributes: [[Sequelize.fn("COUNT", "projectId"), "numMindmap"]],
          order: [["projectId", "DESC"]],
          raw: true,
        });
        const result4 = await cards.findAll({
          where: { projectId: projectIdArray, parent: 0 },
          attributes: ["content"],
          order: [["projectId", "DESC"]],
          raw: true,
        });
        const result5 = await projects.findAll({
          include: [
            {
              model: users,
              required: true,
              attributes: [],
            },
          ],
          order: [["id", "DESC"]],
          attributes: ["id", [Sequelize.col("user.name"), "name"]],
          where: {
            id: projectIdArray,
          },
          raw: true,
        });
        result.map((el, i) => {
          el.dataValues.numUser = result1[i].numUser;
          el.dataValues.numCard = result2[i].numCard;
          el.dataValues.numMindmap = result3[i].numMindmap;
          el.dataValues.keyword = result4[i].content;
          el.dataValues.username = result5[i].name;
        });
        res
          .status(200)
          .json({ data: result, message: "Get project list success" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  post: async (req, res) => {
    const { userId, title, desc, isTeam, memberUserId, keyword } = req.body;
    if (
      !userId ||
      !title ||
      !desc ||
      isTeam === undefined ||
      !memberUserId ||
      memberUserId.length === 0
    ) {
      return res
        .status(422)
        .json({ message: "Insufficient parameters supplied" });
    }
    try {
      const result = await projects.create({
        admin: userId,
        title,
        desc,
        isTeam,
      });
      await cards.create({
        userId: userId,
        projectId: result.id,
        content: keyword,
        parent: 0,
        color: "(253, 251, 209)",
        storage: "mindmap",
      });
      await memberUserId.map(function (el) {
        if (el === Number(userId)) {
          users_projects.create({
            userId: el,
            projectId: result.id,
            isAccept: true,
          });
        } else {
          users_projects.create({
            userId: el,
            projectId: result.id,
            isAccept: false,
          });
        }
      });
      res.status(201).json({ message: "Create project success" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  patch: async (req, res) => {
    const { projectId, title, desc } = req.body;
    if (!projectId || !title || !desc) {
      return res
        .status(422)
        .json({ message: "Insufficient parameters supplied" });
    }
    try {
      await projects.update(
        {
          title: title,
          desc: desc,
        },
        {
          where: { id: projectId },
        }
      );
      res.status(200).json({ message: "Change project success" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      await projects.destroy({
        where: { id: id },
      });
      await users_projects.destroy({
        where: { projectId: id },
      });
      res.status(200).json({ message: "Delete project success" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  member: async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res
        .status(422)
        .json({ message: "Insufficient parameters supplied" });
    }
    try {
      const userInfo = await users.findOne({
        where: {
          email: email,
        },
      });
      if (!userInfo) {
        res.status(200).json({ data: null, message: "Not found user" });
      } else {
        const result = {
          id: userInfo.dataValues.id,
          email: userInfo.dataValues.email,
        };
        res.status(201).json({ data: result, message: "Found user" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  accept: async (req, res) => {
    const { userId, projectId, isAccept } = req.body;
    if (!userId || !projectId || isAccept === undefined) {
      return res
        .status(422)
        .json({ message: "Insufficient parameters supplied" });
    } else {
      try {
        if (isAccept) {
          await users_projects.update(
            {
              isAccept: true,
            },
            {
              where: {
                userid: userId,
                projectId: projectId,
              },
            }
          );
          return res.status(200).json({ message: "Accept" });
        } else {
          await users_projects.destroy({
            where: {
              userid: userId,
              projectId: projectId,
            },
          });
          return res.status(200).json({ message: "Refuse" });
        }
      } catch (err) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },
};
