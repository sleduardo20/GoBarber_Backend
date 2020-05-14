import AppError from '@shared/erros/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUsersAvatarServices from './UpdateUsersAvatarSevices';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let UpdateUserAvatar: UpdateUsersAvatarServices;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    UpdateUserAvatar = new UpdateUsersAvatarServices(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Eduardo',
      email: 'eduardo@gmail.com',
      password: '123456',
    });

    await UpdateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jgp',
    });

    expect(user.avatar).toHaveProperty('avatar.jpg');
  });

  it('should be able to update avatar from none existing user', async () => {
    await UpdateUserAvatar.execute({
      user_id: 'not existing',
      avatarFilename: 'avatar.jgp',
    });

    await expect(
      UpdateUserAvatar.execute({
        user_id: 'not existing',
        avatarFilename: 'avatar.jgp',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Eduardo',
      email: 'eduardo@gmail.com',
      password: '123456',
    });

    await UpdateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jgp',
    });

    await UpdateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jgp',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
