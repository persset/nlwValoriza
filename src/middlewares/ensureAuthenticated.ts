import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //Receber o token
  const authToken = request.headers.authorization;

  //Validar se o token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" "); // a "," faz com que o split ignore a primeira posição do array criado e adicione o valor da segunda posição na variavel token

  try {
    //Validar se o token é válido
    const { sub } = verify(
      token,
      "a929a29a4a124074e6cb6ffc0ceee105"
    ) as IPayLoad;

    //Recuperar informações do usuário
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
