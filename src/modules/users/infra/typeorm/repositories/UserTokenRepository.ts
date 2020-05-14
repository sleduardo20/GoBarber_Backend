import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUsersTokensRepository';

import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormrRepository: Repository<UserToken>;

  constructor() {
    this.ormrRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormrRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormrRepository.create({
      user_id,
    });

    await this.ormrRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
