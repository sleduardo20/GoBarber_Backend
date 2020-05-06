import { Response, Request } from 'express';

import { container } from 'tsyringe';

import AuthenticationUserSession from '@modules/users/services/AuthenticeteUserSession';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticationUser = container.resolve(AuthenticationUserSession);

    const { user, token } = await authenticationUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
