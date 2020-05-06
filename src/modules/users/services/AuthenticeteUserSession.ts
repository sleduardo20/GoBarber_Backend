import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authoConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/erros/AppError';

import IAppointmentsRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/Users';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserSession {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IAppointmentsRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authoConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserSession;
