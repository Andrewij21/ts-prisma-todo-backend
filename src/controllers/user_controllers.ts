import prisma from "../config/prisma";
import { Request, Response, NextFunction } from "express";
import { UserRequestBody } from "../interface/user_interface";
import Exception, { HTTP_CODE } from "../utils/execptions";
import { CustomRequest } from "../interface/express_interface";
import { Prisma } from "@prisma/client";

class UserController {
  async getAllUsers(req: Request, res: Response) {
    const allUsers = await prisma.user.findMany({ include: { posts: true } });
    res.status(200).json({ ...HTTP_CODE.success, detail: allUsers });
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      const task = await prisma.task.findFirst({
        where: { id: parseInt(id) },
      });
      if (!task)
        throw new Exception({
          ...HTTP_CODE.not_found,
          detail: `User with id ${id} not found`,
        });
      res.status(200).json(task);
    } catch (error) {
      console.log({ error });
      next(error);
    }
  }

  async createUser(req: CustomRequest, res: Response, next: NextFunction) {
    const { email, name }: UserRequestBody = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
        },
        include: { posts: true },
      });
      res.status(201).json({ ...HTTP_CODE.created, detail: newUser });
    } catch (error) {
      req.error = `Email already been used`;
      next(error);
    }
  }

  async updateUserById(req: CustomRequest, res: Response, next: NextFunction) {
    const id = req.params.id;
    const data: UserRequestBody = req.body;

    try {
      const updatePost = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { ...data },
      });

      res.status(200).json({ ...HTTP_CODE.success, detail: updatePost });
    } catch (error) {
      let message = "";
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") message = `User with id ${id} not found`;
        else message = `Email ${data.email} is already been used`;
        req.error = message;
        next(error);
      }
    }
  }

  async deleteUserById(req: CustomRequest, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({
        ...HTTP_CODE.success,
        detail: `Successfully delete user with id${id}`,
      });
    } catch (error) {
      console.log(error);
      req.error = `User with id ${id} not found`;
      next(error);
    }
  }
}

export default new UserController();
