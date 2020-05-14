import AppError from '@shared/erros/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Eduardo',
      email: 'eduardo@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'eduardo@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'eduardo@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should genarate a forgot password token', async () => {
    const genarateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'Eduardo',
      email: 'eduardo@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'eduardo@gmail.com',
    });

    expect(genarateToken).toHaveBeenCalledWith(user.id);
  });
});
