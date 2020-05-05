import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserServices from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAutheticated';
import UpdateUsersAvatarServices from '../services/UpdateUsersAvatarSevices';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserServices();
  const user = await createUser.execute({
    name,
    email,
    password,
  });
  delete user.password;
  return response.json(user);
});

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUsersAvatarServices();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default userRouter;
