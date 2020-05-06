import { Response, Request } from 'express';
import { container } from 'tsyringe';

import UpdateUsersAvatarServices from '@modules/users/services/UpdateUsersAvatarSevices';

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUsersAvatarServices);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
