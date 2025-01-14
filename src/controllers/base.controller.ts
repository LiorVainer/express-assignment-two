import { Request, Response } from "express";
import { Model, SchemaType } from "mongoose";

class BaseController<T extends object & { sender: string }> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getAll(req: Request<{}, {}, {}, { sender: string }>, res: Response) {
    const { sender } = req.query;
    try {
      if (sender) {
        const item = await this.model.find({ sender });
        res.send(item);
      } else {
        const items = await this.model.find();
        res.send(items);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    try {
      const item = await this.model.findById(id);
      if (item != null) {
        res.send(item);
      } else {
        res.status(404).send("not found");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async create(req: Request<{}, {}, T>, res: Response) {
    const body = req.body;
    try {
      const item = await this.model.create(body);
      res.status(201).send(item);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async deleteItem(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;
    try {
      await this.model.findByIdAndDelete(id);
      res.status(200).send("deleted");
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default BaseController;
