
import { Users } from "../models/users";
import { Cards } from "../models/cards";
import { Projects } from "../models/projects";
import { Users_Projects } from "../models/users_projects";
import { Sequelize } from "sequelize";
import { isAuthorized } from "./token";
import { Request, Response } from "express";

interface projectInfo extends Projects {
  numUser: number;
  numCard: number;
  numMindmap: number;
  keyword: string;
  username: string;
}

interface userNumber extends Users_Projects {
  numUser: number;
}

interface cardNumber extends Cards{
  numCard: number;
  numMindmap: number;
}

export const get = async (req: Request, res: Response) => {
  try {
    const verifyInfo = isAuthorized(req);
    if (verifyInfo === "not found") {
      return res.status(401).send({ message: "Not authorized" });
    } else if (verifyInfo === "expired") {
      return res.status(401).send({ message: "Expired token" });
    } else {
      const a = new Users_Projects
      a.isAccept
      const result = await Projects.findAll({
        include: [{
            association: Projects.associations.projectHasManyUsers_Projects,
            attributes: [],
            required: true
          }
        ],
        order: [["id", "DESC"]],
        attributes: [
          "id",
          "title",
          "desc",
          "isTeam",
          "admin",
          "createdAt",
          [Sequelize.col("projectHasManyUsers_Projects.isAccept"), "isAccept"], 
        ],
        where: {
          "$projectHasManyUsers_Projects.userId$": verifyInfo.id,
        },
      });
      const idResult = await Users_Projects.findAll({
        where: { userId: verifyInfo.id },
        attributes: ["projectId"],
        raw: true,
        order: [["projectId", "DESC"]],
      });
      const projectIdArray = idResult.map((el) => {
        return el.projectId;
      });
      const result1 = await Users_Projects.findAll({
        where: { projectId: projectIdArray },
        group: ["projectId"],
        attributes: [
          "projectId",
          [Sequelize.fn("COUNT", "projectId"), "numUser"],
        ],
        order: [["projectId", "DESC"]],
        raw: true,
      }) as userNumber[];
      const result2 = await Cards.findAll({
        where: { projectId: projectIdArray },
        group: ["projectId"],
        attributes: [[Sequelize.fn("COUNT", "projectId"), "numCard"]],
        order: [["projectId", "DESC"]],
        raw: true,
      }) as cardNumber[];
      const result3 = await Cards.findAll({
        where: { projectId: projectIdArray, storage: "mindmap" },
        group: ["projectId"],
        attributes: [[Sequelize.fn("COUNT", "projectId"), "numMindmap"]],
        order: [["projectId", "DESC"]],
        raw: true,
      }) as cardNumber[];
      const result4 = await Cards.findAll({
        where: { projectId: projectIdArray, parent: 0 },
        attributes: ["content"],
        order: [["projectId", "DESC"]],
        raw: true,
      });
      const result5 = await Users.findAll({
        include: [
          {
            association: Users.associations.userHasManyProjects,
            required: true,
            attributes: [],
          },
        ],
        order: [[Users.associations.userHasManyProjects, "id", "DESC"]],
        attributes: ["name", [Sequelize.col("userHasManyProjects.id"), "id"]],
        where: {
          "$userHasManyProjects.id$": projectIdArray,
        },
        raw: true,
      });
      const data: projectInfo[] = [];
      result.map((el, i) => {
        const obj: projectInfo = Object.assign(el.get({ plain:true }));
        obj.numUser = result1[i].numUser;
        obj.numCard = result2[i].numCard;
        obj.numMindmap = result3[i].numMindmap;
        obj.keyword = result4[i].content;
        obj.username = result5[i].name;
        data.push(obj);
      });

      res
        .status(200)
        .json({ data: data, message: "Get project list success" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const post = async (req: Request, res: Response) => {
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
    const result = await Projects.create({
      admin: userId,
      title,
      desc,
      isTeam,
    });
    await Cards.create({
      userId: userId,
      projectId: result.id,
      content: keyword,
      parent: 0,
      color: "(253, 251, 209)",
      storage: "mindmap",
    });
    await memberUserId.map(function (el: number) {
      if (el === Number(userId)) {
        Users_Projects.create({
          userId: el,
          projectId: result.id,
          isAccept: true,
        });
      } else {
        Users_Projects.create({
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
}

export const patch = async (req: Request, res: Response) => {
  const { projectId, title, desc } = req.body;
  if (!projectId || !title || !desc) {
    return res
      .status(422)
      .json({ message: "Insufficient parameters supplied" });
  }
  try {
    await Projects.update(
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
}

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Projects.destroy({
      where: { id: id }
    });
    await Users_Projects.destroy({
      where: { projectId: id }
    });
    res.status(200).json({ message: "Delete project success" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const member = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  if (!email) {
    return res
      .status(422)
      .json({ message: "Insufficient parameters supplied" });
  }
  try {
    const userInfo = await Users.findOne({
      where: {
        email: email,
      },
      raw: true
    });
    if (!userInfo) {
      res.status(200).json({ data: null, message: "Not found user" });
    } else {
      const result = {
        id: userInfo.id,
        email: userInfo.email,
      };
      res.status(201).json({ data: result, message: "Found user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const accept = async (req: Request, res: Response) => {
  const { userId, projectId, isAccept } = req.body;
  if (!userId || !projectId || isAccept === undefined) {
    return res
      .status(422)
      .json({ message: "Insufficient parameters supplied" });
  } else {
    try {
      if (isAccept) {
        await Users_Projects.update(
          {
            isAccept: true,
          },
          {
            where: {
              userId: userId,
              projectId: projectId,
            },
          }
        );
        return res.status(200).json({ message: "Accept" });
      } else {
        await Users_Projects.destroy({
          where: {
            userId: userId,
            projectId: projectId,
          },
        });
        return res.status(200).json({ message: "Refuse" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

