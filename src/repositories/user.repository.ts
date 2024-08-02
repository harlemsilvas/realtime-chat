import { UsersModel } from '../infra/models/user.model';
import {
  ICreate,
  IEmailUser,
  IPagination,
} from '../interfaces/users.interface';

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
  async findAllUsers({ pageNumber, pageSize }: IPagination) {
    const result = await UsersModel.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    return result;
  }
}

export { UsersRepository };
