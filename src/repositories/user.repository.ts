import { UsersModel } from '../infra/database/models/user.model';
import { ICreate, IEmailUser } from '../interfaces/users.interface';

class UsersRepository {
  async create({ name, email, password }: ICreate) {
    const result = await UsersModel.create({ name, email, password });
    return result;
    //console.log('UserRepository - UserModel - Create');
  }
  async findUserByEmail({ email }: IEmailUser) {
    const result = await UsersModel.findOne({ email });
    //console.log('findbyUseremail', result);
    return result;
  }
}

export { UsersRepository };
