import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { Request, Response, NextFunction } from "express";
import Exception, { HTTP_CODE } from "../utils/execptions";
import { TaskRequestBody } from "../interface/task_interface";
import { CustomRequest } from "../interface/express_interface";

class TaskController {
  async getAllTasks(req: Request, res: Response) {
    const allTasks = await prisma.task.findMany();
    res.status(200).json({ ...HTTP_CODE.success, detail: allTasks });
  }

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      const task = await prisma.task.findFirst({
        where: { id: parseInt(id) },
      });
      if (!task)
        throw new Exception({
          ...HTTP_CODE.not_found,
          detail: `Task with id ${id} not found`,
        });
      res.status(200).json({ ...HTTP_CODE.success, detail: task });
    } catch (error) {
      next(error);
    }
  }

  async createTask(req: CustomRequest, res: Response, next: NextFunction) {
    const { title, content, userId }: TaskRequestBody = req.body;
    try {
      const newTask = await prisma.task.create({
        data: { title, content, userId },
      });
      res.status(201).json({ ...HTTP_CODE.created, detail: newTask });
    } catch (error) {
      req.error = `userId ${userId} not found`;
      next(error);
    }
  }

  async updateTaskById(req: CustomRequest, res: Response, next: NextFunction) {
    const id = req.params.id;
    const data: TaskRequestBody = req.body;

    try {
      const updateTask = await prisma.task.update({
        where: { id: parseInt(id) },
        data: { ...data },
      });
      res.status(200).json({ ...HTTP_CODE.success, detail: updateTask });
    } catch (error) {
      console.log({ error });
      let message = "";
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") message = `Task with id ${id} not found`;
        else message = `User with id ${data.userId} not found`;
        req.error = message;
        next(error);
      }
    }
  }

  async deleteTaskById(req: CustomRequest, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
      await prisma.task.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({
        ...HTTP_CODE.success,
        detail: `Successfully delete task with id${id}`,
      });
    } catch (error) {
      console.log(error);
      req.error = `task ${id} not found`;
      next(error);
    }
  }
}

export default new TaskController();
