import { UsersRepository } from "../repositories/user.repository";

class Users {
  private usersRepository: UsersRepository;
  contructor() {
    this.usersRepository = new UsersRepository();
  }
  async create({ name, email, password }) {
    //const UserRepository = new UsersRepository();
    //Verificar se o usuario já existe, se existir, retorna um erro
    const findUser = await this.usersRepository.findUserByEmail({
      email,
    });

    if (findUser) {
      throw new Error("User exists.");
    }
    return findUser;
  }
}
export { Users };
