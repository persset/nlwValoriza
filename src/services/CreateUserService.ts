import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  // Através do "=" é possível, no TypeScript, definir um valor padrão para um atributo caso ele não receba nenhum da requisição
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error("Incorrect email");
    }
    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash, //caso o valor do atributo seja diferente do da variavel utilizar dois pontos e a variavel que ele irá receber
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
