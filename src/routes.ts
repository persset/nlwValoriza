import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

router.post("/users", createUserController.handle);

/**
 * Utilizando o router.use todas as rotas após a declaração do mesmo estarão utilizando o middleware declarado
 * Declarando o middleware na declaração da rota, entre o path e entre a função da rota, os middlewares serão usados apenas naquela rota
 * */
//router.use(ensureAdmin)
router.post("/tags", ensureAdmin, createTagController.handle);

export { router };
