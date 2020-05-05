import { Router } from 'express';
import AuthenticationUserSession from '../services/AuthenticeteUserSession';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticationUser = new AuthenticationUserSession();

  const { user, token } = await authenticationUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
