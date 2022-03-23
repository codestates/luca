import { Users } from "../models/users";
import { Cards } from "../models/cards";
import { Projects } from "../models/projects";
import { Users_Projects } from "../models/users_projects";
import { isAuthorized } from "./token";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";

interface verifyInfo {
  id: number;
  name: string;
  email: string;
  isGuest: boolean;
  isSocial: string | null;
}

interface profileData extends verifyInfo {
  countAdminProject: number;
  countJoinProject: number;
}

interface PasswordInfo {
  curPassword: string;
  newPassword: string;
}

export const get = async (req: Request, res: Response) => {
  try {
    const verifyInfo = isAuthorized(req);
    if (verifyInfo === "not found") {
      return res.status(401).send({ message: "Not authorized" });
    } else if (verifyInfo === "expired") {
      return res.status(401).send({ message: "Expired token" });
    } else {
      const result: Users = await Users.findOne({
        where: {
          email: verifyInfo.email
        },
      });
      const userInfo = result.get({ plain: true })
      delete userInfo.password;
      const countAdminProject = await Projects.findAndCountAll({
        where: {
          admin: userInfo.id,
        },
        raw: true,
      });
      const countJoinProject = await Users_Projects.findAndCountAll({
        where: {
          userId: userInfo.id,
        },
        raw: true,
      });
      const profileData: profileData = Object.assign( userInfo )
      profileData.countAdminProject = countAdminProject.count;
      profileData.countJoinProject = countJoinProject.count;
      res
        .status(200)
        .json({ data: profileData, message: "Get profile success" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const verifyInfo = isAuthorized(req);
    if (verifyInfo === "not found") {
      return res.status(401).send({ message: "Not authorized" });
    } else if (verifyInfo === "expired") {
      return res.status(401).send({ message: "Expired token" });
    } else {
      const userInfo = await Users.findOne({
        where: {
          email: verifyInfo.email
        },
      });
      if (userInfo) {
        const result = await Projects.findAll({
          where: { admin: userInfo.id },
        });
        result.map(async (el) => {
          await Users_Projects.destroy({
            where: { projectId: el.get({plain: true}).id },
          });
          await Cards.destroy({
            where: { projectId: el.get({plain: true}).id },
          });
          await Projects.destroy({
            where: { id: el.get({plain: true}).id },
          });
        });
        await Users.destroy({
          where: { id: userInfo.id },
        });

        res
        .clearCookie("jwt", {
          path: "/",
          maxAge: 24 * 6 * 60 * 10000,
          httpOnly: true,
          //sameSite: "none",
          //secure: true,
        })
        .status(200)
        .json({ mssage: "Delete profile success" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const patchName = async (req: Request, res: Response) => {
  const name: string = req.body.name;
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
      await Users.update(
        { name: name },
        {
          where: { id: verifyInfo.id }
        }
      );
      res.status(200).json({ message: "ok" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const patchPassword = async (req: Request, res: Response) => {
  const { curPassword, newPassword }: PasswordInfo  = req.body;
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
      const userInfo = await Users.findOne({
        where: { id: verifyInfo.id }
      });

      const check = await bcrypt.compare(
        curPassword,
        userInfo.get({plain: true}).password
      );

      if (!check) {
        res.status(400).json({ message: "Wrong password" });
      } else {
        await Users.update(
          { password: bcrypt.hashSync(newPassword, parseInt(process.env.BCRYPT_SALT)) },
          {
            where: { id: verifyInfo.id }
          }
        );
        res.status(200).json({ message: "Change password success" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}
