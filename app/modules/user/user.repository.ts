import { Service as Repository } from "fastify-decorators";
import { UserModel } from "../../database/models/user.model";

@Repository()
export class UserRepository {
  public async getAll(): Promise<UserModel[]> {
    return await UserModel.findAll();
  }

  public async getById(id: number): Promise<UserModel | null> {
    return await UserModel.findOne({
      where: {
        id,
      },
    });
  }

  public async getByEmail(email: string): Promise<UserModel | null> {
    return await UserModel.findOne({
      where: {
        email,
      },
    });
  }

  public async create(data: any) {
    return await UserModel.create(data);
  }
}
