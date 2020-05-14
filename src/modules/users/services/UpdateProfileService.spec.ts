// import AppError from '@shared/erros/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileServices from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileServices;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileServices(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Eduardo',
      email: 'eduardo@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Eduardo2',
      email: 'eduardo2@gmail.com',
    });

    expect(updatedUser.name).toBe('Eduardo2');
    expect(updatedUser.email).toBe('eduardo2@gmail.com');
  });
});
