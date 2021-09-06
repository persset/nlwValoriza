import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";

class CreateTagController {
  async handle(request: Request, response: Response) {
    //Desestruturação do request body para poder pegar diretamente o nome
    const { name } = request.body;

    const createTagService = new CreateTagService();

    const tag = await createTagService.execute(name);

    return response.json(tag);
  }
}

export { CreateTagController };
