import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/Users';

class UsersRepository implements IUsersRepository {
  private ormrRepository: Repository<User>;

  constructor() {
    this.ormrRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormrRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormrRepository.findOne({ where: { email } });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormrRepository.create(userData);

    await this.ormrRepository.save(user);

    return user;
  }

  public async salve(user: User): Promise<User> {
    return this.ormrRepository.save(user);
  }
}

export default UsersRepository;
