import { UsersModel } from "../infra/database/models/user.model";

class UsersRepository {
  async create({ name, email, password }) {
    const result = await UsersModel.create({ name, email, password });
    return result;
  }
  async findUserByEmail({ email }) {
    const result = await UsersModel.find({ email });
    return result;
  }
  /**
   *async findByEmail(email: string) {
		const result = await User.findOne({ email })
		return result
	}
   */
}
export { UsersRepository };
